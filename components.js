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

  var MORE_LINKS = [
    { href: '/accessories',  label: 'Accessories' },
    { href: '/restaurants',  label: 'Restaurants' },
    { href: '/real-estate',  label: 'Real Estate' },
    { href: '/jobs',         label: 'Jobs' },
    { href: '/price-finder', label: 'Price Finder' },
    { href: '/compare',      label: 'Compare' },
    { href: '/about',        label: 'About' },
    { href: '/contact',      label: 'Contact' },
    { href: '/connect',      label: 'Connect' },
  ];

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
    var moreLinks = MORE_LINKS.map(function (l) {
      return '<a href="' + l.href + '">' + l.label + '</a>';
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
      '<nav class="nav"><div class="nav-inner">',
      '<a href="/" class="nav-logo">WIB</a>',
      '<div class="nav-links">' + links,
      '<div class="nav-more"><button class="nav-more-btn" onclick="this.parentElement.classList.toggle(\'open\')">More ▾</button>',
      '<div class="nav-dropdown">' + moreLinks + '</div></div>',
      '</div>',
      '<div class="nav-right">',
      '<button class="theme-toggle" onclick="toggleTheme()" title="Toggle dark mode">' + sunSvg + moonSvg + '</button>',
      '<button class="hamburger" onclick="toggleMobile()"><span></span><span></span><span></span></button>',
      '</div>',
      '</div></nav>',
      '<div class="cat-strip"><div class="cat-inner">' + catLinks + '</div></div>',
      '<div class="mobile-menu" id="mobileMenu">',
      '<button class="mobile-close" onclick="toggleMobile()">&#x2715;</button>',
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
      '<a href="/connect">Connect</a><a href="/blog">Blog</a>',
      '</div>',
      '<div class="footer-col"><h4>Legal</h4>',
      '<a href="/privacy">Privacy Policy</a><a href="/terms">Terms of Service</a>',
      '</div>',
      '</div>',
      '<div class="footer-bottom">WIB - Independent. Data-driven.</div>',
      '</footer>',
    ].join('');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var navEl = document.getElementById('wib-nav-placeholder');
    if (navEl) navEl.outerHTML = renderNav();

    var footerEl = document.getElementById('wib-footer-placeholder');
    if (footerEl) footerEl.outerHTML = renderFooter();
  });

  // Expose render functions so pages can call them manually if needed
  window.WIBComponents = { renderNav: renderNav, renderFooter: renderFooter };
})();
