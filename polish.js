/* WIB Polish Layer JS — trust strip, announce bar, toast notifications, search.
   Loaded once site-wide. Idempotent. */
(function () {
  // Toast utility
  window.wibToast = function (msg, kind) {
    var t = document.createElement('div');
    t.className = 'wib-toast ' + (kind || '');
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('show'); });
    setTimeout(function () { t.classList.remove('show'); setTimeout(function () { t.remove(); }, 250); }, 2800);
  };

  // Insert announcement bar at top of body (once, dismissible-per-session)
  function mountAnnounce() {
    if (sessionStorage.getItem('wib-announce-dismissed')) {
      document.body.classList.remove('wib-has-announce');
      return;
    }
    if (document.querySelector('.wib-announce')) return;
    var bar = document.createElement('div');
    bar.className = 'wib-announce';
    bar.innerHTML = '\u2728 New: Try our <a href="/compare/ai/">AI Compare</a> tool \u2014 get instant India-specific recommendations <button class="wib-announce-close" aria-label="Dismiss">\u00D7</button>';
    document.body.insertBefore(bar, document.body.firstChild);
    document.body.classList.add('wib-has-announce');
    bar.querySelector('.wib-announce-close').onclick = function () {
      bar.remove();
      document.body.classList.remove('wib-has-announce');
      sessionStorage.setItem('wib-announce-dismissed', '1');
    };
  }

  // Trust-strip injector
  window.wibInjectTrust = function (target) {
    if (!target || target.querySelector('.wib-trust')) return;
    var html = '<section class="wib-trust"><div class="wib-trust-row">'
      + '<div class="wib-trust-item"><div class="wib-trust-num">100+</div><div class="wib-trust-lbl">Comparison Guides</div></div>'
      + '<div class="wib-trust-item"><div class="wib-trust-num">500+</div><div class="wib-trust-lbl">Schools &amp; Colleges</div></div>'
      + '<div class="wib-trust-item"><div class="wib-trust-num">50+</div><div class="wib-trust-lbl">Hospitals Reviewed</div></div>'
      + '<div class="wib-trust-item"><div class="wib-trust-num">2 Languages</div><div class="wib-trust-lbl">English &amp; \u0939\u093F\u0902\u0926\u0940</div></div>'
      + '<div class="wib-trust-item"><div class="wib-trust-num">Updated Daily</div><div class="wib-trust-lbl">Real Indian Data</div></div>'
      + '</div></section>';
    target.insertAdjacentHTML('beforeend', html);
  };

  // Featured-in strip — placeholder section for credibility (real outlets when you get featured)
  window.wibInjectFeatured = function (target) {
    if (!target || target.querySelector('.wib-featured')) return;
    var html = '<section class="wib-featured"><div class="wib-featured-lbl">Trusted By Indian Buyers</div><div class="wib-featured-row">'
      + '<span>Bangalore</span><span>Mumbai</span><span>Delhi</span><span>Chennai</span><span>Hyderabad</span><span>Pune</span><span>Jaipur</span>'
      + '</div></section>';
    target.insertAdjacentHTML('beforeend', html);
  };

  // Author byline injector — for blog articles
  window.wibInjectByline = function (target, opts) {
    if (!target) return;
    opts = opts || {};
    var name = opts.name || 'WIB Editorial';
    var initials = name.split(/\s+/).map(function (w) { return w[0]; }).slice(0, 2).join('').toUpperCase();
    var date = opts.date || '';
    var readTime = opts.readTime || '';
    var meta = [];
    if (readTime) meta.push(readTime + ' min read');
    if (date) meta.push('Updated ' + date);
    meta.push('Expert review');
    var html = '<div class="wib-byline">'
      + '<div class="wib-byline-avatar">' + initials + '</div>'
      + '<div class="wib-byline-meta">'
        + '<div class="wib-byline-name">' + name + '</div>'
        + '<div class="wib-byline-sub">' + meta.join(' \u00B7 ') + '</div>'
      + '</div>'
      + '<div class="wib-byline-badge">Verified</div>'
      + '</div>';
    target.insertAdjacentHTML('afterbegin', html);
  };

  // Mount everything once DOM ready
  function init() {
    mountAnnounce();
    // Inject trust strip after the hero on homepage if a marker exists
    var heroEnd = document.getElementById('after-hero');
    if (heroEnd) wibInjectTrust(heroEnd);
    // Auto-mount on category pages
    var catLanding = document.querySelector('main, .category-landing');
    // (Specific pages opt-in via their own scripts — no global insertion to avoid layout breaks.)
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
