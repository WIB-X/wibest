/**
 * WIB — Shared Components
 * Renders the site-wide navigation and footer into any page that includes
 * this script. Pages only need to contain placeholder elements:
 *
 *   <div id="wib-nav-placeholder"></div>   ← nav + cat-strip + mobile-menu
 *   <div id="wib-footer-placeholder"></div> ← full footer
 *
 * The active nav item is determined by matching the current pathname.
 */

// ── Microsoft Clarity (user behavior analytics — heatmaps + session recordings) ─
// Free, async, doesn't impact PageSpeed. Project ID stored client-side as
// expected by Clarity (it's not a secret — just an account identifier).
(function (c, l, a, r, i, t, y) {
  c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
  t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i;
  y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);
})(window, document, "clarity", "script", "wiaqwueuya");

(function () {
  'use strict';

  var NAV_LINKS = [
    { href: '/',            label: 'Home' },
    { href: '/schools',     label: 'Schools' },
    { href: '/colleges',    label: 'Colleges' },
    { href: '/electronics', label: 'Electronics' },
    { href: '/cars',        label: 'Cars & Bikes' },
    { href: '/hospitals',   label: 'Hospitals' },
    { href: '/travel',      label: 'Travel' },
    { href: '/blog',        label: 'Blog' },
  ];

  // Grouped More-menu — renders as a 2-column dropdown with section headings.
  // Avoids the unbounded scrolling list problem.
  var MORE_GROUPS = [
    { title: 'Tools', items: [
      { href: '/decide/',       label: 'Decide for me 🆕' },
      { href: '/admissions/',   label: 'Admissions Tracker 🆕' },
      { href: '/compare/ai/',   label: 'AI Compare' },
      { href: '/quiz/',         label: 'Phone Quiz' },
      { href: '/compare',       label: 'Compare side-by-side' },
      { href: '/price-finder',  label: 'Price Finder' }
    ]},
    { title: 'Money', items: [
      { href: '/insurance/',    label: 'Insurance' },
      { href: '/loans/',        label: 'Loans' }
    ]},
    { title: 'Lifestyle', items: [
      { href: '/ev/',           label: 'EV Hub' },
      { href: '/solar/',        label: 'Solar' },
      { href: '/health-checkups/', label: 'Health Checkups' },
      { href: '/senior-care/',  label: 'Senior Care' }
    ]},
    { title: 'More categories', items: [
      { href: '/accessories',  label: 'Accessories' },
      { href: '/restaurants',  label: 'Restaurants' },
      { href: '/real-estate',  label: 'Real Estate' },
      { href: '/jobs',         label: 'Jobs' }
    ]},
    { title: 'Languages', items: [
      { href: '/hi/',           label: '\u0939\u093F\u0902\u0926\u0940 (Hindi)' },
      { href: '/ta/',           label: '\u0BA4\u0BAE\u0BBF\u0BB4\u0BCD (Tamil)' },
      { href: '/te/',           label: '\u0C24\u0C46\u0C32\u0C41\u0C17\u0C41 (Telugu)' }
    ]},
    { title: 'About', items: [
      { href: '/about',              label: 'About WIB' },
      { href: '/editorial-process',  label: 'Editorial Process' },
      { href: '/reviews',            label: 'Reader Reviews' },
      { href: '/contact',            label: 'Contact' },
      { href: '/connect',            label: 'Connect' }
    ]}
  ];

  // Flattened version for legacy callers (mobile menu, search, etc.)
  var MORE_LINKS = MORE_GROUPS.reduce(function (acc, g) { return acc.concat(g.items); }, []);

  var CAT_STRIP_LINKS = [
    { href: '/schools',     label: 'Schools' },
    { href: '/colleges',    label: 'Colleges' },
    { href: '/electronics', label: 'Electronics' },
    { href: '/cars',        label: 'Cars & Bikes' },
    { href: '/hospitals',   label: 'Hospitals' },
    { href: '/travel',      label: 'Travel' },
  ];

  var MOBILE_LINKS = NAV_LINKS.concat(MORE_LINKS.slice(0, 6));

  function isActive(href) {
    var path = window.location.pathname;
    if (href === '/') return path === '/';
    return path.startsWith(href);
  }

  function navLink(href, label) {
    return '<a href="' + href + '"' + (isActive(href) ? ' class="active"' : '') + '>' + label + '</a>';
  }

  function renderNav() {
    var links = NAV_LINKS.map(function (l) { return navLink(l.href, l.label); }).join('');
    // Render More-menu as 2-column grouped panel
    var moreLinks = MORE_GROUPS.map(function (g) {
      return '<div class="nav-dropdown-group"><div class="nav-dropdown-group-title">' + g.title + '</div>'
        + g.items.map(function (l) { return '<a href="' + l.href + '">' + l.label + '</a>'; }).join('')
        + '</div>';
    }).join('');
    var catLinks = CAT_STRIP_LINKS.map(function (l) {
      return '<a href="' + l.href + '" class="cat-link' + (isActive(l.href) ? ' active' : '') + '">' + l.label + '</a>';
    }).join('');
    var mobileLinks = MOBILE_LINKS.map(function (l) {
      return '<a href="' + l.href + '">' + l.label + '</a>';
    }).join('');

    var sunSvg = '<svg class="sun-icon" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
    var moonSvg = '<svg class="moon-icon" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" style="display:none"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

    return [
      '<a href="#main-content" class="skip-link" style="position:absolute;top:-40px;left:0;background:var(--accent);color:#fff;padding:8px 16px;z-index:10000;font-size:14px;transition:top .2s" onfocus="this.style.top=\'0\'" onblur="this.style.top=\'-40px\'">Skip to content</a>',
      '<nav class="nav" role="navigation" aria-label="Main navigation"><div class="nav-inner">',
      '<a href="/" class="nav-logo" aria-label="WIB Home"><img src="/logo-256.png" alt="WIB" width="56" height="56" style="display:block"></a>',
      '<div class="nav-links">' + links,
      '<div class="nav-more"><button class="nav-more-btn" onclick="this.parentElement.classList.toggle(\'open\')">More <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" style="display:inline-block;vertical-align:middle;margin-left:4px"><path d="M1 3l4 4 4-4" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></button>',
      '<div class="nav-dropdown">' + moreLinks + '</div></div>',
      '</div>',
      '<div class="nav-right">',
      '<button class="nav-search-btn" onclick="if(window.WIBSearch)WIBSearch.open()" aria-label="Search wibest.in" title="Search (Ctrl/Cmd+K or /)" style="display:inline-flex;align-items:center;gap:6px;padding:6px 10px;border-radius:8px;border:1px solid var(--border);background:var(--bg-card);color:var(--text-muted);font-family:inherit;font-size:13px;cursor:pointer;margin-right:8px"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><span class="nav-search-label" style="display:inline">Search</span></button>',
      '<button class="theme-toggle" onclick="toggleTheme()" title="Toggle dark mode">' + sunSvg + moonSvg + '</button>',
      '<button class="hamburger" onclick="toggleMobile()" aria-label="Open menu"><span></span><span></span><span></span></button>',
      '</div>',
      '</div></nav>',
      '<div class="cat-strip"><div class="cat-inner">' + catLinks + '</div></div>',
      '<div class="mobile-menu" id="mobileMenu">',
      '<button class="mobile-close" onclick="toggleMobile()" aria-label="Close menu">&#x2715;</button>',
      mobileLinks,
      '</div>',
    ].join('');
  }

  function renderFooter() {
    return [
      '<footer class="footer"><div class="footer-inner">',
      '<div class="footer-brand">',
      '<div class="brand-name">WIB</div>',
      '<p>India\'s unified comparison platform. One destination for every "which is best?" question.</p>',
      '</div>',
      '<div class="footer-col"><h4>Categories</h4>',
      '<a href="/schools">Schools</a><a href="/colleges">Colleges</a>',
      '<a href="/electronics">Electronics</a><a href="/cars">Cars & Bikes</a>',
      '<a href="/hospitals">Hospitals</a><a href="/travel">Travel</a>',
      '<a href="/accessories">Accessories</a><a href="/restaurants">Restaurants</a>',
      '<a href="/real-estate">Real Estate</a><a href="/jobs">Jobs</a>',
      '</div>',
      '<div class="footer-col"><h4>Company</h4>',
      '<a href="/about">About</a><a href="/contact">Contact</a>',
      '<a href="/editorial-process">Editorial Process</a><a href="/reviews">Reader Reviews</a>',
      '<a href="/reports">Research Reports</a><a href="/cities">All Cities</a>',
      '<a href="/data">Open Data</a><a href="/glossary">Glossary</a>',
      '<a href="/press">Press Kit</a><a href="/press-coverage">Press Coverage</a>',
      '<a href="/connect">Connect</a><a href="/blog">Blog</a>',
      '</div>',
      '<div class="footer-col"><h4>Legal</h4>',
      '<a href="/privacy">Privacy Policy</a><a href="/terms">Terms of Service</a>',
      '<a href="/affiliate-disclosure">Affiliate Disclosure</a>',
      '</div>',
      '</div>',
      '<div class="footer-nl" style="grid-column:1/-1;margin-top:24px;padding:24px;background:var(--accent);border-radius:10px;text-align:center">',
      '<div style="font-family:Outfit,sans-serif;font-size:16px;font-weight:700;color:#fff;margin-bottom:4px">Get weekly comparison guides</div>',
      '<p style="font-size:13px;color:rgba(255,255,255,.85);margin-bottom:12px">Best phones, schools, hospitals &amp; travel picks — straight to your inbox.</p>',
      '<form onsubmit="return wibSubscribe(event)" style="display:flex;gap:8px;max-width:380px;margin:0 auto;flex-wrap:wrap;justify-content:center">',
      '<input type="email" id="wibNlEmail" placeholder="Your email address" aria-label="Email for newsletter" required style="flex:1;min-width:180px;padding:10px 14px;border:none;border-radius:8px;font-family:inherit;font-size:13px">',
      '<button type="submit" style="padding:10px 18px;border:none;border-radius:8px;background:#1e293b;color:#fff;font-family:inherit;font-size:13px;font-weight:600;cursor:pointer">Subscribe</button>',
      '</form>',
      '<div id="wibNlMsg" style="font-size:12px;color:#fff;margin-top:6px"></div>',
      '</div>',
      '</div>',
      '<div class="footer-bottom">© ' + new Date().getFullYear() + ' WIB — Independent. Data-driven. Updated daily.</div>',
      '</footer>',
    ].join('');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var navEl = document.getElementById('wib-nav-placeholder');
    if (navEl) navEl.outerHTML = renderNav();

    var footerEl = document.getElementById('wib-footer-placeholder');
    if (footerEl) footerEl.outerHTML = renderFooter();

    // Auto-load global search if not already present
    if (!window.WIB_SEARCH_INDEX) {
      var s1 = document.createElement('script'); s1.src = '/search-index.js?v=20260504'; s1.async = true; document.head.appendChild(s1);
    }
    if (!window.WIBSearch) {
      var s2 = document.createElement('script'); s2.src = '/search.js?v=20260504'; s2.defer = true; document.head.appendChild(s2);
    }
    // Auto-load compare cart
    if (!window.WIBCompare) {
      var s3 = document.createElement('script'); s3.src = '/compare-cart.js?v=20260504'; s3.defer = true; document.head.appendChild(s3);
    }
    // PWA install banner
    var s4 = document.createElement('script'); s4.src = '/pwa-install.js?v=20260504'; s4.defer = true; document.head.appendChild(s4);
    // Register service worker (cache shell + assets for offline)
    if ('serviceWorker' in navigator && location.protocol === 'https:') {
      navigator.serviceWorker.register('/sw.js').catch(function(err){ console.warn('SW register failed:', err); });
    }
  });

  // Newsletter subscribe function (used by footer)
  window.wibSubscribe = function(e) {
    e.preventDefault();
    var email = (document.getElementById('wibNlEmail').value || '').trim();
    var msg = document.getElementById('wibNlMsg');
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { msg.textContent = 'Please enter a valid email.'; return false; }
    if (window.initFirebase) {
      try {
        var db = initFirebase();
        db.collection('newsletter_subscribers').add({ email: email, source: 'footer', createdAt: new Date() }).then(function() {
          msg.textContent = "You're subscribed! Watch out for weekly guides.";
          document.getElementById('wibNlEmail').value = '';
        }).catch(function() { msg.textContent = 'Error. Please try again.'; });
      } catch(err) { msg.textContent = "Subscribed! We'll send you the best picks."; document.getElementById('wibNlEmail').value = ''; }
    } else { msg.textContent = "Subscribed! We'll send you the best picks."; document.getElementById('wibNlEmail').value = ''; }
    return false;
  };

  // Scroll reveal animation
  function initReveal() {
    var els = document.querySelectorAll('.card,.bc,.cat-card,.sidebar-card,.section,.review-card,.hero-card,.stat-item');
    if (!els.length) return;
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) {
          e.target.classList.add('reveal','visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function(el) {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }
  // Run after content loads (delayed to catch dynamically rendered cards)
  setTimeout(initReveal, 800);
  // Re-run after Firestore data loads
  window.wibInitReveal = initReveal;

  // Expose render functions so pages can call them manually if needed
  window.WIBComponents = { renderNav: renderNav, renderFooter: renderFooter };
})();
