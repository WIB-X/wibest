/* WIB AdSense loader + in-article ad injector.
   Usage in <head>:  <script src="/ads.js" async></script>
   In body where you want a manual ad slot, add:
     <div class="wib-ad" data-slot="in-article"></div>
   For automatic placement inside an article, call:
     WIBAds.injectInArticle(document.querySelector('.article-body'));
*/
(function () {
  var PUB_ID = 'ca-pub-7107402273519770';

  // Load AdSense once per page
  if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + PUB_ID;
    s.crossOrigin = 'anonymous';
    document.head.appendChild(s);
  }

  function renderSlot(container, opts) {
    opts = opts || {};
    if (!container || container.dataset.wibRendered) return;
    container.dataset.wibRendered = '1';
    container.innerHTML = '';
    var ins = document.createElement('ins');
    ins.className = 'adsbygoogle';
    ins.style.cssText = 'display:block;text-align:center;margin:24px auto;min-height:100px';
    ins.setAttribute('data-ad-client', PUB_ID);
    ins.setAttribute('data-ad-slot', opts.slot || '');
    ins.setAttribute('data-ad-format', opts.format || 'auto');
    ins.setAttribute('data-full-width-responsive', 'true');
    container.appendChild(ins);
    // Optional small label
    var label = document.createElement('div');
    label.textContent = 'Advertisement';
    label.style.cssText = 'font-size:10px;letter-spacing:.1em;color:#94a3b8;text-transform:uppercase;text-align:center;margin-bottom:4px';
    container.insertBefore(label, ins);
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
  }

  // Auto-render any <div class="wib-ad"> placed manually
  function renderAllSlots() {
    document.querySelectorAll('.wib-ad').forEach(function (el) { renderSlot(el, { slot: el.dataset.slot }); });
  }

  // Inject one mid-article ad after the 3rd heading of an article body element
  function injectInArticle(articleBody) {
    if (!articleBody) return;
    var headings = articleBody.querySelectorAll('h2, h3');
    if (headings.length < 3) return;
    var target = headings[2];
    var slot = document.createElement('div');
    slot.className = 'wib-ad wib-ad-inarticle';
    target.parentNode.insertBefore(slot, target);
    renderSlot(slot, { slot: 'in-article', format: 'fluid' });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderAllSlots);
  } else {
    renderAllSlots();
  }

  // Observer — render ads that are added after page load (e.g. blog content rendered via Firestore)
  var mo = new MutationObserver(function (muts) {
    muts.forEach(function (m) {
      m.addedNodes.forEach(function (n) {
        if (n.nodeType === 1) {
          if (n.classList && n.classList.contains('wib-ad')) renderSlot(n, { slot: n.dataset.slot });
          n.querySelectorAll && n.querySelectorAll('.wib-ad').forEach(function (el) { renderSlot(el, { slot: el.dataset.slot }); });
        }
      });
    });
  });
  mo.observe(document.body || document.documentElement, { childList: true, subtree: true });

  window.WIBAds = {
    render: renderSlot,
    renderAll: renderAllSlots,
    injectInArticle: injectInArticle
  };
})();
