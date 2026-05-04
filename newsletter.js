/* Newsletter capture component.
   Place an empty <div id="wib-newsletter"></div> wherever you want it to render.
   Handles email validation, Firestore write to 'subscribers' collection, success state. */
(function(){
  'use strict';

  var TEMPLATE =
    '<section class="wib-news">' +
      '<div class="wib-news-inner">' +
        '<div class="wib-news-text">' +
          '<div class="wib-news-title">Get the WIB weekly digest</div>' +
          '<div class="wib-news-sub">One short email every Sunday with the best new comparisons we published — schools, hospitals, restaurants, electronics, travel. No spam, unsubscribe anytime.</div>' +
        '</div>' +
        '<form class="wib-news-form" onsubmit="return WIBNews.submit(event)">' +
          '<input type="email" id="wib-news-email" required placeholder="you@example.com" autocomplete="email">' +
          '<button type="submit" id="wib-news-btn">Subscribe</button>' +
        '</form>' +
        '<div class="wib-news-msg" id="wib-news-msg"></div>' +
      '</div>' +
    '</section>';

  var STYLES =
    '.wib-news{max-width:840px;margin:32px auto;padding:0 24px}' +
    '.wib-news-inner{background:linear-gradient(135deg,#eff6ff,#faf5ff);border:1px solid var(--border);border-radius:14px;padding:28px 32px}' +
    '[data-theme="dark"] .wib-news-inner{background:linear-gradient(135deg,#1e293b,#27272a)}' +
    '.wib-news-title{font-family:Outfit,sans-serif;font-size:22px;font-weight:800;letter-spacing:-0.01em;color:var(--text-primary);margin-bottom:6px}' +
    '.wib-news-sub{font-size:14px;color:var(--text-secondary);line-height:1.55;margin-bottom:18px}' +
    '.wib-news-form{display:flex;gap:8px;flex-wrap:wrap}' +
    '.wib-news-form input{flex:1;min-width:200px;padding:12px 16px;border-radius:10px;border:1px solid var(--border);background:var(--bg-card);color:var(--text-primary);font-family:inherit;font-size:14px}' +
    '.wib-news-form input:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px rgba(37,99,235,0.12)}' +
    '.wib-news-form button{padding:12px 22px;border-radius:10px;border:none;background:var(--accent);color:#fff;font-family:inherit;font-weight:700;font-size:14px;cursor:pointer;transition:all .15s}' +
    '.wib-news-form button:hover{background:var(--accent-hover);transform:translateY(-1px)}' +
    '.wib-news-form button:disabled{opacity:0.6;cursor:wait;transform:none}' +
    '.wib-news-msg{margin-top:12px;font-size:13px;font-weight:600;min-height:18px}' +
    '.wib-news-msg.ok{color:#16a34a}' +
    '.wib-news-msg.err{color:#dc2626}';

  function injectStyles(){
    if (document.getElementById('wib-news-styles')) return;
    var s = document.createElement('style');
    s.id = 'wib-news-styles';
    s.textContent = STYLES;
    document.head.appendChild(s);
  }

  function render(){
    var slot = document.getElementById('wib-newsletter');
    if (!slot || slot.dataset.rendered) return;
    injectStyles();
    slot.innerHTML = TEMPLATE;
    slot.dataset.rendered = '1';
  }

  function isValidEmail(e){
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);
  }

  function setMsg(text, kind){
    var el = document.getElementById('wib-news-msg');
    if (!el) return;
    el.textContent = text;
    el.className = 'wib-news-msg ' + (kind || '');
  }

  async function submit(ev){
    ev.preventDefault();
    var emailEl = document.getElementById('wib-news-email');
    var btn = document.getElementById('wib-news-btn');
    var email = (emailEl.value || '').trim().toLowerCase();
    if (!isValidEmail(email)) { setMsg('Please enter a valid email address.', 'err'); return false; }
    btn.disabled = true; btn.textContent = 'Subscribing...';
    setMsg('', '');
    try {
      if (typeof initFirebase !== 'function' || typeof firebase === 'undefined') {
        // Fallback: open mailto so user can still subscribe
        window.location.href = 'mailto:hello@wibest.in?subject=Subscribe%20to%20WIB%20Weekly&body=' + encodeURIComponent('Subscribe me: ' + email);
        setMsg('Opening your email app...', 'ok');
        return false;
      }
      var db = initFirebase();
      // Use email as doc id to prevent duplicates
      var docId = email.replace(/[^a-z0-9@._-]/g, '_');
      await db.collection('subscribers').doc(docId).set({
        email: email,
        source: window.location.pathname,
        subscribedAt: firebase.firestore.FieldValue.serverTimestamp(),
        userAgent: (navigator.userAgent || '').slice(0, 200),
      }, { merge: true });
      btn.textContent = 'Subscribed';
      setMsg('You are in. Watch for the next Sunday digest.', 'ok');
      emailEl.value = '';
      try { if (window.gtag) gtag('event', 'newsletter_signup', { source: window.location.pathname }); } catch(e){}
    } catch (err) {
      console.error(err);
      btn.disabled = false; btn.textContent = 'Subscribe';
      setMsg('Something went wrong. Try again, or email hello@wibest.in directly.', 'err');
    }
    return false;
  }

  window.WIBNews = { submit: submit, render: render };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
  else render();
})();
