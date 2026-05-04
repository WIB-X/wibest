/* PWA install prompt - shows a small banner when the browser fires beforeinstallprompt.
   Respects user dismissal for 30 days; auto-hides on install. Android-Chrome path. */
(function(){
  'use strict';
  var DISMISS_KEY = 'wib_pwa_install_dismissed_at';
  var DISMISS_DAYS = 30;
  var deferredPrompt = null;

  function dismissedRecently(){
    var t = parseInt(localStorage.getItem(DISMISS_KEY) || '0', 10);
    if (!t) return false;
    return (Date.now() - t) < DISMISS_DAYS * 24 * 60 * 60 * 1000;
  }

  function isStandalone(){
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.navigator.standalone === true;
  }

  function showBanner(){
    if (document.getElementById('wib-pwa-banner')) return;
    var banner = document.createElement('div');
    banner.id = 'wib-pwa-banner';
    banner.innerHTML =
      '<div class="pwa-icon">' +
        '<img src="/icon-192.png" alt="WIB" width="40" height="40" style="border-radius:8px;display:block">' +
      '</div>' +
      '<div class="pwa-text">' +
        '<div class="pwa-title">Install WIB</div>' +
        '<div class="pwa-sub">One tap to keep wibest.in on your home screen — works offline, no app store needed.</div>' +
      '</div>' +
      '<button class="pwa-install" id="wib-pwa-install">Install</button>' +
      '<button class="pwa-dismiss" id="wib-pwa-dismiss" aria-label="Dismiss">&times;</button>';
    var styles = document.createElement('style');
    styles.textContent =
      '#wib-pwa-banner{position:fixed;bottom:80px;left:12px;right:12px;max-width:480px;margin:0 auto;background:var(--bg-card);border:1px solid var(--border);border-radius:14px;box-shadow:0 16px 40px rgba(15,23,42,0.18);padding:14px 16px;display:flex;align-items:center;gap:14px;z-index:997;animation:pwaSlideUp .25s ease-out}' +
      '@keyframes pwaSlideUp{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}' +
      '#wib-pwa-banner .pwa-icon{flex-shrink:0}' +
      '#wib-pwa-banner .pwa-text{flex:1;min-width:0}' +
      '#wib-pwa-banner .pwa-title{font-family:Outfit,sans-serif;font-weight:700;font-size:14px;color:var(--text-primary);margin-bottom:2px}' +
      '#wib-pwa-banner .pwa-sub{font-size:12px;color:var(--text-secondary);line-height:1.4}' +
      '#wib-pwa-banner .pwa-install{padding:10px 18px;background:var(--accent);color:#fff;border:none;border-radius:8px;font-weight:700;font-size:13px;cursor:pointer;flex-shrink:0;font-family:inherit}' +
      '#wib-pwa-banner .pwa-install:hover{background:var(--accent-hover)}' +
      '#wib-pwa-banner .pwa-dismiss{background:transparent;border:none;color:var(--text-muted);font-size:22px;cursor:pointer;padding:0 4px;line-height:1;flex-shrink:0}' +
      '#wib-pwa-banner .pwa-dismiss:hover{color:var(--text-primary)}' +
      '@media(max-width:480px){#wib-pwa-banner{bottom:90px;flex-wrap:wrap;padding:12px}#wib-pwa-banner .pwa-text{flex-basis:calc(100% - 60px)}#wib-pwa-banner .pwa-install{flex:1;margin-top:6px}}';
    document.head.appendChild(styles);
    document.body.appendChild(banner);

    document.getElementById('wib-pwa-install').onclick = async function(){
      if (!deferredPrompt) { dismiss(); return; }
      deferredPrompt.prompt();
      var choice = await deferredPrompt.userChoice;
      try { if (window.gtag) gtag('event', 'pwa_install_prompt', { outcome: choice.outcome }); } catch(e){}
      deferredPrompt = null;
      banner.remove();
    };
    document.getElementById('wib-pwa-dismiss').onclick = dismiss;
  }
  function dismiss(){
    localStorage.setItem(DISMISS_KEY, Date.now().toString());
    var b = document.getElementById('wib-pwa-banner'); if (b) b.remove();
  }

  if (isStandalone()) return;
  if (dismissedRecently()) return;

  window.addEventListener('beforeinstallprompt', function(ev){
    ev.preventDefault();
    deferredPrompt = ev;
    // Show after a short delay so users can see the page first
    setTimeout(showBanner, 4000);
  });
  window.addEventListener('appinstalled', function(){
    var b = document.getElementById('wib-pwa-banner'); if (b) b.remove();
    try { if (window.gtag) gtag('event', 'pwa_installed'); } catch(e){}
  });
})();
