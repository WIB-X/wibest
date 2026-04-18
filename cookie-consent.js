/* WIB cookie consent — DPDP Act 2023 (India) compliant
 * + Google AdSense / consent management compliant.
 * Loaded site-wide via /polish.js or directly in pages. Idempotent. */
(function () {
  // Already accepted? Skip.
  if (localStorage.getItem('wib-consent') || document.querySelector('.wib-cookie')) return;

  // Inject CSS once
  if (!document.getElementById('wib-cookie-style')) {
    var s = document.createElement('style');
    s.id = 'wib-cookie-style';
    s.textContent = '\
.wib-cookie{position:fixed;bottom:16px;left:16px;right:16px;max-width:520px;margin:0 auto;background:#0f172a;color:#fff;border-radius:14px;padding:18px 22px;z-index:10001;box-shadow:0 12px 40px rgba(0,0,0,.25);font-family:inherit;font-size:13px;line-height:1.55;animation:wibCookieIn .35s ease}\
@keyframes wibCookieIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}\
.wib-cookie p{margin:0 0 12px;color:#cbd5e1}\
.wib-cookie strong{color:#fff;font-weight:600}\
.wib-cookie a{color:#60a5fa;text-decoration:underline}\
.wib-cookie-row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}\
.wib-cookie button{padding:9px 18px;border:0;border-radius:8px;font:inherit;font-size:13px;font-weight:600;cursor:pointer;transition:all .15s}\
.wib-cookie .ok{background:#2563eb;color:#fff;flex:1;min-width:120px}\
.wib-cookie .ok:hover{background:#1d4ed8}\
.wib-cookie .nok{background:transparent;color:#cbd5e1;border:1px solid #334155}\
.wib-cookie .nok:hover{background:#1e293b;color:#fff}\
@media(max-width:480px){.wib-cookie{bottom:8px;left:8px;right:8px;padding:14px 16px;font-size:12px}}\
';
    document.head.appendChild(s);
  }

  // Build banner
  var bar = document.createElement('div');
  bar.className = 'wib-cookie';
  bar.setAttribute('role', 'dialog');
  bar.setAttribute('aria-label', 'Cookie consent');
  bar.innerHTML =
    '<p><strong>We use cookies to improve your experience.</strong> WIB uses cookies for analytics (Google Analytics) and to show you relevant ads (Google AdSense). You can manage these in your browser. See our <a href="/privacy">Privacy Policy</a>.</p>'
    + '<div class="wib-cookie-row">'
    + '<button class="ok" id="wib-cookie-ok">Accept all</button>'
    + '<button class="nok" id="wib-cookie-nok">Essential only</button>'
    + '</div>';

  function mount() { (document.body || document.documentElement).appendChild(bar); }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);

  function setConsent(level) {
    localStorage.setItem('wib-consent', level);
    localStorage.setItem('wib-consent-ts', Date.now().toString());
    if (bar.parentNode) bar.parentNode.removeChild(bar);
    // Notify Google's Consent Mode v2 if present
    if (typeof gtag === 'function') {
      gtag('consent', 'update', {
        ad_storage: level === 'all' ? 'granted' : 'denied',
        ad_user_data: level === 'all' ? 'granted' : 'denied',
        ad_personalization: level === 'all' ? 'granted' : 'denied',
        analytics_storage: 'granted'
      });
    }
  }

  bar.addEventListener('click', function (e) {
    if (e.target.id === 'wib-cookie-ok') setConsent('all');
    else if (e.target.id === 'wib-cookie-nok') setConsent('essential');
  });

  // Default consent state for Google Consent Mode v2 — must run before gtag.config
  if (typeof gtag === 'function') {
    gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'granted',
      wait_for_update: 500
    });
  }
})();
