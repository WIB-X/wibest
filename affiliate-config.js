/* WIB Affiliate Configuration — single source of truth for all affiliate IDs.
 * Fill in IDs as approvals come in. Set any ID to '' to disable that network.
 * Consumers (ads.js, blog pages, buildAffiliateCards) should use WIBAffiliate.wrap(url).
 */
(function (global) {
  var CONFIG = {
    // Amazon India — already active
    amazon: {
      tag: 'wib04-21',
      enabled: true
    },

    // Flipkart via Cuelinks/EarnKaro/Admitad (any one is enough; first enabled wins)
    cuelinks: {
      channel: '',            // <-- paste your Cuelinks channelId here (e.g. '123456')
      enabled: false
    },
    earnkaro: {
      // EarnKaro does NOT expose a public URL-rewrite endpoint.
      // The /enkr2020/ path returns 403 for direct construction.
      // To use EarnKaro you must either:
      //   1. Call their Authenticated API (login + API key)
      //      to convert each Flipkart URL → short ekaro.in/XXXX
      //   2. Manually convert URLs in their Affiliaters dashboard
      //      and store the short URL as the link
      // See affiliate-config.js notes; we disable auto-wrap until one
      // of those two flows is built. The ref is kept for future use.
      ref: '5189767',
      enabled: false
    },
    admitad: {
      adminitad_uid: '',      // <-- paste your Admitad campaign/website id
      enabled: false
    },

    // Booking / Travel
    booking_com: { aid: '', enabled: false },
    agoda:       { cid: '', enabled: false },
    makemytrip:  { affid: '', enabled: false },

    // Direct-affiliate SaaS programs
    hostinger:  { ref: '', enabled: false },
    canva:      { ref: '', enabled: false },
    namecheap:  { ref: '', enabled: false },
    semrush:    { ref: '', enabled: false }
  };

  // Map domain → wrapping function
  var wrappers = [
    {
      match: /(^|\.)amazon\.(in|com)$/i,
      wrap: function (u) {
        if (!CONFIG.amazon.enabled || !CONFIG.amazon.tag) return u;
        u.searchParams.set('tag', CONFIG.amazon.tag);
        return u;
      }
    },
    {
      match: /(^|\.)flipkart\.com$/i,
      wrap: function (u) {
        // Prefer Cuelinks if configured
        if (CONFIG.cuelinks.enabled && CONFIG.cuelinks.channel) {
          return new URL('https://linksredirect.com/?cid=' + encodeURIComponent(CONFIG.cuelinks.channel) + '&source=linkkit&url=' + encodeURIComponent(u.href));
        }
        if (CONFIG.earnkaro.enabled && CONFIG.earnkaro.ref) {
          return new URL('https://ekaro.in/enkr2020/?url=' + encodeURIComponent(u.href) + '&ref=' + encodeURIComponent(CONFIG.earnkaro.ref));
        }
        if (CONFIG.admitad.enabled && CONFIG.admitad.adminitad_uid) {
          return new URL('https://ad.admitad.com/g/' + encodeURIComponent(CONFIG.admitad.adminitad_uid) + '/?ulp=' + encodeURIComponent(u.href));
        }
        return u;
      }
    },
    {
      match: /(^|\.)booking\.com$/i,
      wrap: function (u) {
        if (!CONFIG.booking_com.enabled || !CONFIG.booking_com.aid) return u;
        u.searchParams.set('aid', CONFIG.booking_com.aid);
        return u;
      }
    },
    {
      match: /(^|\.)agoda\.com$/i,
      wrap: function (u) {
        if (!CONFIG.agoda.enabled || !CONFIG.agoda.cid) return u;
        u.searchParams.set('cid', CONFIG.agoda.cid);
        return u;
      }
    }
  ];

  function wrap(href) {
    try {
      var u = new URL(href, location.origin);
      for (var i = 0; i < wrappers.length; i++) {
        if (wrappers[i].match.test(u.hostname)) {
          return String(wrappers[i].wrap(u));
        }
      }
      return href;
    } catch (e) { return href; }
  }

  // Auto-rewrite on page load: every <a href> pointing to a known affiliate domain
  function rewriteAll(root) {
    root = root || document;
    root.querySelectorAll && root.querySelectorAll('a[href]').forEach(function (a) {
      if (a.dataset.wibWrapped) return;
      var before = a.getAttribute('href');
      var after = wrap(before);
      if (after !== before) {
        a.setAttribute('href', after);
        a.dataset.wibWrapped = '1';
        // sponsored/nofollow is correct for affiliate links
        var rel = (a.getAttribute('rel') || '').split(/\s+/).filter(Boolean);
        ['nofollow','sponsored','noopener'].forEach(function (k) { if (rel.indexOf(k) < 0) rel.push(k); });
        a.setAttribute('rel', rel.join(' '));
        a.setAttribute('target', '_blank');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { rewriteAll(document); });
  } else { rewriteAll(document); }

  // Observer — rewrite links added after page load (blog content rendered from Firestore)
  new MutationObserver(function (muts) {
    muts.forEach(function (m) { m.addedNodes.forEach(function (n) { if (n.nodeType === 1) rewriteAll(n); }); });
  }).observe(document.body || document.documentElement, { childList: true, subtree: true });

  global.WIBAffiliate = { config: CONFIG, wrap: wrap, rewriteAll: rewriteAll };
})(window);
