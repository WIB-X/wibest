/**
 * WIB Decision Engine
 * Interactive AI-powered quiz runner that asks users questions,
 * sends their answers to Gemini (via compareAI endpoint), and
 * displays a personalized recommendation with affiliate links.
 *
 * Usage:
 *   <div id="decide-root"></div>
 *   <script src="/decide-engine.js"></script>
 *   <script>
 *     WIBDecide.run({
 *       slug: 'phone',
 *       title: 'Find your perfect phone',
 *       accent: '#2563eb',
 *       questions: [
 *         { key:'budget', q:"What's your budget?", opts:[
 *           {emoji:'💸', label:'Under ₹15,000', val:'under-15k'}, ...
 *         ]},
 *         ...
 *       ],
 *       aiContext: "The user is shopping for a smartphone in India...",
 *       category: 'Electronics',
 *       affiliates: [
 *         { label:'Amazon', url:'https://amazon.in/s?k={{name}}&tag=wib04-21', style:'bg:#ff9900;color:#111' },
 *         { label:'Flipkart', url:'https://flipkart.com/search?q={{name}}', style:'bg:#2874f0;color:#fff' }
 *       ]
 *     });
 *   </script>
 */
(function () {
  'use strict';

  const ENDPOINT = 'https://us-central1-wibest-449fe.cloudfunctions.net/compareAI';
  const LS_KEY = 'wib-decide-history';

  function el(tag, attrs, kids) {
    const e = document.createElement(tag);
    if (attrs) Object.entries(attrs).forEach(([k, v]) => {
      if (k === 'style') e.setAttribute('style', v);
      else if (k.startsWith('on')) e.addEventListener(k.slice(2).toLowerCase(), v);
      else if (k === 'html') e.innerHTML = v;
      else e.setAttribute(k, v);
    });
    if (kids) (Array.isArray(kids) ? kids : [kids]).forEach(k => {
      if (typeof k === 'string') e.appendChild(document.createTextNode(k));
      else if (k) e.appendChild(k);
    });
    return e;
  }

  function saveHistory(slug, answers, recommendation) {
    try {
      const hist = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
      hist.unshift({ slug, answers, recommendation: recommendation.slice(0, 400), t: Date.now() });
      localStorage.setItem(LS_KEY, JSON.stringify(hist.slice(0, 20)));
    } catch (e) {}
  }

  async function askAI(config, answers) {
    const answerSummary = config.questions.map((q, i) => {
      const chosen = q.opts.find(o => o.val === answers[q.key]);
      return `${q.q} → ${chosen ? chosen.label : answers[q.key]}`;
    }).join('\n');

    const prompt = `${config.aiContext}

User's answers:
${answerSummary}

Based on these answers, recommend ONE specific product/service available in India right now. Keep it concrete (actual brand + model/plan name, real price in ₹). Format the response as clear markdown with these sections:

## [Product/Service Name]
**Price:** ₹XX,XXX (or price range)

**Why this matches your needs:** 2-3 sentences explaining the fit.

**Pros:**
- Bullet 1
- Bullet 2
- Bullet 3

**Things to consider:**
- Caveat 1 (optional)

**Also worth looking at:**
- **Alternative 1 Name** — one-line why
- **Alternative 2 Name** — one-line why

Keep it under 250 words. Be specific, India-focused, and direct.`;

    const r = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: prompt })
    });
    const d = await r.json();
    if (d.error) throw new Error(d.error);
    return d.answer || '';
  }

  function extractProductName(markdown) {
    // Parse "## Name" from the first heading
    const m = markdown.match(/^##\s+(.+?)$/m);
    if (m) return m[1].trim().replace(/^\*+|\*+$/g, '');
    return '';
  }

  function md(s) {
    return s
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/^###\s+(.*)$/gm, '<h3>$1</h3>')
      .replace(/^##\s+(.*)$/gm, '<h2>$1</h2>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/^\*\s+(.*)$/gm, '<li>$1</li>')
      .replace(/^-\s+(.*)$/gm, '<li>$1</li>')
      .replace(/(<li>.*?<\/li>\n?)+/gs, m => '<ul>' + m + '</ul>')
      .replace(/\n\n/g, '</p><p>')
      .replace(/^(?!<)/, '<p>').replace(/(?<!>)$/, '</p>')
      .replace(/<p><(h2|h3|ul)>/g, '<$1>')
      .replace(/<\/(h2|h3|ul)><\/p>/g, '</$1>');
  }

  function render(config, root) {
    const state = { step: 0, answers: {}, answer: '', loading: false };
    const accent = config.accent || '#2563eb';

    function paint() {
      root.innerHTML = '';

      // Progress bar
      const totalSteps = config.questions.length + 1; // +1 for result step
      const pct = state.loading || state.answer
        ? 100
        : (state.step / config.questions.length) * 100;
      root.appendChild(el('div', { class: 'de-progress', style: `--accent:${accent}` }, [
        el('div', { class: 'de-progress-fill', style: `width:${pct}%;background:${accent}` })
      ]));

      if (state.answer) return renderResult();
      if (state.loading) return renderLoading();
      renderQuestion();
    }

    function renderQuestion() {
      const q = config.questions[state.step];
      if (!q) return;
      const box = el('div', { class: 'de-step' });

      box.appendChild(el('div', { class: 'de-num' }, `Question ${state.step + 1} of ${config.questions.length}`));
      box.appendChild(el('h2', { class: 'de-q' }, q.q));
      if (q.sub) box.appendChild(el('p', { class: 'de-sub' }, q.sub));

      const opts = el('div', { class: 'de-opts' });
      q.opts.forEach(o => {
        const btn = el('button', {
          class: 'de-opt',
          type: 'button',
          onclick: () => {
            state.answers[q.key] = o.val;
            state.step++;
            if (state.step >= config.questions.length) {
              submit();
            } else {
              paint();
            }
          }
        }, [
          o.emoji ? el('span', { class: 'de-opt-emoji' }, o.emoji) : null,
          el('span', { class: 'de-opt-label' }, o.label)
        ]);
        opts.appendChild(btn);
      });
      box.appendChild(opts);

      if (state.step > 0) {
        box.appendChild(el('button', {
          class: 'de-back',
          type: 'button',
          onclick: () => { state.step--; paint(); }
        }, '← Back'));
      }
      root.appendChild(box);
    }

    function renderLoading() {
      const box = el('div', { class: 'de-step de-loading' });
      box.appendChild(el('div', { class: 'de-spinner', style: `border-top-color:${accent}` }));
      box.appendChild(el('h2', { class: 'de-q' }, 'Finding your perfect match…'));
      box.appendChild(el('p', { class: 'de-sub' }, `WIB AI is analysing your answers. This usually takes 2-4 seconds.`));
      root.appendChild(box);
    }

    function renderResult() {
      const box = el('div', { class: 'de-step de-result' });

      box.appendChild(el('div', { class: 'de-num', style: `color:${accent}` }, '✓ Your personalised recommendation'));

      const content = el('div', { class: 'de-answer', html: md(state.answer) });
      box.appendChild(content);

      // Buy buttons (if affiliates configured)
      if (config.affiliates && config.affiliates.length) {
        const name = extractProductName(state.answer);
        if (name) {
          const actions = el('div', { class: 'de-actions' });
          config.affiliates.forEach(a => {
            const url = a.url.replace(/\{\{name\}\}/g, encodeURIComponent(name));
            actions.appendChild(el('a', {
              href: url,
              target: '_blank',
              rel: 'noopener sponsored',
              class: 'de-cta',
              style: a.style || ''
            }, a.label + ' →'));
          });
          box.appendChild(actions);
        }
      }

      // Secondary actions
      const sec = el('div', { class: 'de-secondary' });
      sec.appendChild(el('button', {
        class: 'de-restart',
        type: 'button',
        onclick: () => { state.step = 0; state.answers = {}; state.answer = ''; paint(); }
      }, '↻ Take another quiz'));
      sec.appendChild(el('button', {
        class: 'de-restart',
        type: 'button',
        onclick: () => copyLink()
      }, '🔗 Share this recommendation'));
      box.appendChild(sec);

      // Disclaimer
      box.appendChild(el('p', { class: 'de-disc' },
        'AI answers are guidance, not financial/medical advice. Always cross-check critical decisions.'));

      root.appendChild(box);
    }

    async function submit() {
      state.loading = true;
      paint();
      try {
        const answer = await askAI(config, state.answers);
        state.answer = answer;
        state.loading = false;
        saveHistory(config.slug, state.answers, answer);
        if (typeof gtag === 'function') {
          gtag('event', 'decide_complete', { quiz: config.slug });
        }
        paint();
      } catch (e) {
        state.loading = false;
        state.answer = `## Couldn't reach the AI\n\n**Error:** ${e.message}\n\nPlease try again in a few seconds. If this keeps happening, use [Ask WIB AI](/compare/ai/) directly.`;
        paint();
      }
    }

    function copyLink() {
      const btn = event.target;
      navigator.clipboard.writeText(window.location.href).then(() => {
        const orig = btn.textContent;
        btn.textContent = '✓ Link copied';
        setTimeout(() => { btn.textContent = orig; }, 1800);
      });
    }

    paint();
  }

  window.WIBDecide = {
    run(config) {
      const root = document.getElementById('decide-root');
      if (!root) return console.error('[WIBDecide] #decide-root not found');
      render(config, root);
    }
  };
})();
