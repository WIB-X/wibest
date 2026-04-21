/**
 * WIB Affiliate Auto-Converter
 * Intercepts clicks on outbound partner product links and converts them to
 * EarnKaro tracked URLs on the fly. Transparent to content authors — they
 * just write normal product URLs in blog posts / product cards.
 *
 * How it works:
 * 1. On first click of a partner link, prevent default
 * 2. Call /convertLink Cloud Function (which hits EarnKaro API + caches)
 * 3. Redirect to the converted URL (or original if conversion fails)
 *
 * Caches converted URLs in sessionStorage so same product clicked twice
 * doesn't re-hit the backend.
 */
(function () {
  'use strict';

  // Partners that EarnKaro tracks. Add more as you confirm they're supported.
  // Source: https://earnkaro.com/stores
  var PARTNER_DOMAINS = [
    'flipkart.com', 'fkrt.cc', 'fkrt.it',
    'myntra.com',
    'ajio.com',
    'nykaa.com', 'nykaafashion.com',
    'croma.com',
    'tatacliq.com',
    'snapdeal.com',
    '1mg.com', 'tata1mg.com',
    'pharmeasy.in',
    'netmeds.com',
    'apollo247.com',
    'mamaearth.in',
    'boat-lifestyle.com', 'boat.in',
    'noise.shop', 'gonoise.com',
    'beardo.in',
    'purplle.com',
    'firstcry.com',
    'hopscotch.in',
    'licious.in',
    'bigbasket.com',
    'grofers.com', 'blinkit.com',
    'zeptonow.com',
    'swiggy.com', // instamart only for Swiggy
    'pepperfry.com',
    'urbanladder.com',
    'wakefit.co',
    'sleepycat.in',
    'mcaffeine.com',
    'wowskinscience.com',
    'plum.co.in',
    'sugarcosmetics.com',
    'lakmeindia.com',
    'makemytrip.com',
    'goibibo.com',
    'yatra.com',
    'easemytrip.com',
    'cleartrip.com',
    'oyo.com', 'oyorooms.com'
    // Amazon handled separately via wib04-21 tag; NOT in this list
  ];

  var CONVERT_ENDPOINT = 'https://us-central1-wibest-449fe.cloudfunctions.net/convertLink';
  var SESSION_KEY = 'wib-aff-cache-v1';

  function isPartnerUrl(url) {
    try {
      var host = new URL(url).hostname.toLowerCase();
      return PARTNER_DOMAINS.some(function (d) {
        return host === d || host.endsWith('.' + d);
      });
    } catch (e) { return false; }
  }

  function getSessionCache() {
    try { return JSON.parse(sessionStorage.getItem(SESSION_KEY) || '{}'); }
    catch (e) { return {}; }
  }
  function setSessionCache(cache) {
    try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(cache)); } catch (e) {}
  }

  async function convertOne(originalUrl) {
    var cache = getSessionCache();
    if (cache[originalUrl]) return cache[originalUrl];

    try {
      var r = await fetch(CONVERT_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: originalUrl })
      });
      if (!r.ok) return originalUrl;
      var d = await r.json();
      var converted = d.affiliateUrl || originalUrl;
      cache[originalUrl] = converted;
      setSessionCache(cache);
      return converted;
    } catch (e) {
      return originalUrl; // Fail-open: user still reaches product
    }
  }

  // Click interceptor — uses capture phase so it runs before any other handler
  document.addEventListener('click', function (ev) {
    // Only primary-button clicks (ignore right-click, middle-click)
    if (ev.button !== 0 || ev.ctrlKey || ev.metaKey || ev.shiftKey || ev.altKey) return;

    var a = ev.target.closest && ev.target.closest('a[href]');
    if (!a) return;

    var href = a.getAttribute('href');
    if (!href || !/^https?:\/\//i.test(href)) return;
    if (a.dataset.wibAffConverted === '1') return; // already converted
    if (!isPartnerUrl(href)) return;

    // Prevent the default navigation; we'll do it after conversion
    ev.preventDefault();

    // Track the click for analytics before we navigate away
    try {
      if (typeof gtag === 'function') {
        var partner = new URL(href).hostname.replace('www.', '');
        gtag('event', 'affiliate_click', {
          partner: partner,
          page: window.location.pathname
        });
      }
    } catch (e) {}

    // Loading indicator — delayed reveal (150ms) so fast/cached conversions
    // don't flash an unnecessary spinner. Disables further clicks + adds
    // a brand-accent spinner next to the link text.
    a.classList.add('wib-aff-loading');
    var showSpinnerTimer = setTimeout(function () {
      a.classList.add('wib-aff-show');
    }, 150);

    function cleanup() {
      clearTimeout(showSpinnerTimer);
      a.classList.remove('wib-aff-loading', 'wib-aff-show');
    }

    convertOne(href).then(function (converted) {
      a.dataset.wibAffConverted = '1';
      cleanup();
      // If the user intended to open in a new tab (target=_blank), honor that
      if (a.target === '_blank') {
        window.open(converted, '_blank', 'noopener');
      } else {
        window.location.href = converted;
      }
    }).catch(function () {
      cleanup();
      window.location.href = href; // fallback
    });
  }, true);

  // Inject spinner styles once — uses the link's own currentColor so it
  // automatically matches whatever brand color the button already uses
  // (orange for Amazon, blue for Flipkart, purple for Myntra, etc.).
  var styleEl = document.createElement('style');
  styleEl.textContent = [
    '@keyframes wib-aff-spin { to { transform: rotate(360deg) } }',
    '.wib-aff-loading { pointer-events: none; position: relative }',
    '.wib-aff-loading::after {',
    '  content: ""; display: inline-block;',
    '  width: 12px; height: 12px;',
    '  margin-left: 8px;',
    '  border: 2px solid currentColor;',
    '  border-top-color: transparent;',
    '  border-radius: 50%;',
    '  vertical-align: -2px;',
    '  opacity: 0;',
    '  transition: opacity 0.15s ease;',
    '  animation: wib-aff-spin 0.7s linear infinite;',
    '}',
    '.wib-aff-loading.wib-aff-show::after { opacity: 0.85 }'
  ].join('');
  (document.head || document.documentElement).appendChild(styleEl);

  // Expose for manual calls + testing
  window.WIBAffiliate = window.WIBAffiliate || {};
  window.WIBAffiliate.convert = convertOne;
  window.WIBAffiliate.isPartner = isPartnerUrl;
  window.WIBAffiliate.partners = PARTNER_DOMAINS;
})();
