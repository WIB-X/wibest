/* WIB lead-gen form widget for finance/insurance pages.
   Drop a <div data-wib-lead="credit_card" data-product="HDFC Millennia"></div>
   anywhere and the widget renders.
   Submits to Firestore 'finance_leads' collection + redirects to affiliate URL.
   Configure affiliate URLs per product in window.WIB_AFFILIATE_LINKS (overrideable). */
(function(){
  'use strict';

  // Default affiliate links — replace once Cuelinks/direct merchant URLs are live
  var DEFAULT_AFFILIATE = {
    'credit_card': 'https://www.bankbazaar.com/credit-card.html',
    'personal_loan': 'https://www.bankbazaar.com/personal-loan.html',
    'home_loan': 'https://www.bankbazaar.com/home-loan.html',
    'savings_account': 'https://www.bankbazaar.com/savings-account.html',
    'mutual_fund': 'https://groww.in/',
    'term_insurance': 'https://www.policybazaar.com/life-insurance/term-insurance/',
    'health_insurance': 'https://www.policybazaar.com/health-insurance/',
    'car_insurance': 'https://www.policybazaar.com/motor-insurance/car-insurance/',
    'bike_insurance': 'https://www.policybazaar.com/motor-insurance/two-wheeler-insurance/',
    'travel_insurance': 'https://www.policybazaar.com/travel-insurance/',
  };
  window.WIB_AFFILIATE_LINKS = Object.assign({}, DEFAULT_AFFILIATE, window.WIB_AFFILIATE_LINKS || {});

  var STYLES =
    '.wib-lead{max-width:560px;margin:24px auto;padding:24px 28px;background:linear-gradient(135deg,#f0fdf4,#ecfdf5);border:1px solid var(--border);border-left:4px solid #16a34a;border-radius:14px}' +
    '[data-theme="dark"] .wib-lead{background:linear-gradient(135deg,#064e3b,#065f46)}' +
    '.wib-lead-title{font-family:Outfit,sans-serif;font-size:18px;font-weight:800;color:var(--text-primary);margin-bottom:6px}' +
    '.wib-lead-sub{font-size:13px;color:var(--text-secondary);margin-bottom:16px;line-height:1.5}' +
    '.wib-lead-row{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px}' +
    '.wib-lead-row input,.wib-lead-row select{flex:1;min-width:140px;padding:10px 14px;border-radius:8px;border:1px solid var(--border);background:var(--bg-card);color:var(--text-primary);font-family:inherit;font-size:13.5px}' +
    '.wib-lead-row input:focus,.wib-lead-row select:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px rgba(37,99,235,0.12)}' +
    '.wib-lead-btn{display:block;width:100%;padding:12px;border-radius:8px;background:#16a34a;color:#fff;font-family:inherit;font-weight:700;font-size:14px;border:none;cursor:pointer;margin-top:6px;transition:all .15s}' +
    '.wib-lead-btn:hover{background:#15803d;transform:translateY(-1px)}' +
    '.wib-lead-btn:disabled{opacity:0.6;cursor:wait;transform:none}' +
    '.wib-lead-msg{margin-top:10px;font-size:13px;font-weight:600;min-height:18px}' +
    '.wib-lead-msg.ok{color:#16a34a}.wib-lead-msg.err{color:#dc2626}' +
    '.wib-lead-fine{margin-top:10px;font-size:11px;color:var(--text-muted);line-height:1.5}';

  function injectStyles(){
    if (document.getElementById('wib-lead-styles')) return;
    var s = document.createElement('style'); s.id = 'wib-lead-styles'; s.textContent = STYLES;
    document.head.appendChild(s);
  }

  var LABELS = {
    'credit_card': { title: 'Apply for this credit card', cta: 'Apply Now', sub: 'Get the application started in 60 seconds. Final approval depends on the bank — WIB does not approve cards.' },
    'personal_loan': { title: 'Get a personal loan quote', cta: 'Check Eligibility', sub: 'Get a personalised loan offer in seconds. No impact on your CIBIL score.' },
    'home_loan': { title: 'Get a home loan quote', cta: 'Get Quote', sub: 'Compare offers from multiple banks. No obligation.' },
    'savings_account': { title: 'Open this savings account', cta: 'Open Account', sub: 'Most accounts open digitally in 10 minutes via Aadhaar.' },
    'mutual_fund': { title: 'Start investing today', cta: 'Start SIP', sub: 'Direct mutual funds — zero commission. Start with as little as Rs 500/month.' },
    'term_insurance': { title: 'Get term insurance quote', cta: 'Get Free Quote', sub: 'Compare premiums from top insurers in 60 seconds.' },
    'health_insurance': { title: 'Get health insurance quote', cta: 'Get Free Quote', sub: 'Compare cover and premium from top insurers.' },
    'car_insurance': { title: 'Get car insurance quote', cta: 'Get Quote in 60s', sub: 'Compare premiums from 20+ insurers. Save up to 80%.' },
    'bike_insurance': { title: 'Get bike insurance quote', cta: 'Get Quote in 60s', sub: 'Compare premiums from top insurers. Renew in 2 minutes.' },
    'travel_insurance': { title: 'Get travel insurance quote', cta: 'Get Quote', sub: 'Compare cover from top insurers. Schengen-approved plans available.' },
  };

  function template(category, product){
    var L = LABELS[category] || LABELS['credit_card'];
    var p = product ? ' for ' + product : '';
    return '<div class="wib-lead-title">' + L.title + p + '</div>' +
      '<div class="wib-lead-sub">' + L.sub + '</div>' +
      '<form class="wib-lead-form" onsubmit="return WIBLead.submit(event, this)">' +
        '<div class="wib-lead-row">' +
          '<input type="text" name="name" placeholder="Your name" required minlength="2" maxlength="100" autocomplete="name">' +
        '</div>' +
        '<div class="wib-lead-row">' +
          '<input type="tel" name="phone" placeholder="Phone (10 digit)" required pattern="[0-9]{10}" maxlength="10" autocomplete="tel">' +
          '<input type="email" name="email" placeholder="Email" required autocomplete="email">' +
        '</div>' +
        '<div class="wib-lead-row">' +
          '<select name="city" required>' +
            '<option value="">City</option>' +
            '<option>Bangalore</option><option>Mumbai</option><option>Delhi NCR</option><option>Hyderabad</option><option>Chennai</option><option>Pune</option><option>Kolkata</option><option>Ahmedabad</option><option>Other</option>' +
          '</select>' +
          '<input type="number" name="income" placeholder="Monthly income (Rs)" min="10000" max="10000000" required>' +
        '</div>' +
        '<input type="hidden" name="category" value="' + category + '">' +
        '<input type="hidden" name="product" value="' + (product || '') + '">' +
        '<button type="submit" class="wib-lead-btn">' + L.cta + ' &rarr;</button>' +
        '<div class="wib-lead-msg" data-msg></div>' +
      '</form>' +
      '<div class="wib-lead-fine">By submitting you agree we may contact you about this product. WIB does not store your data beyond what the merchant needs. Read our <a href="/privacy/" style="color:var(--accent)">privacy policy</a>.</div>';
  }

  function render(){
    injectStyles();
    document.querySelectorAll('[data-wib-lead]').forEach(function(el){
      if (el.dataset.rendered) return;
      var category = el.getAttribute('data-wib-lead') || 'credit_card';
      var product = el.getAttribute('data-product') || '';
      el.classList.add('wib-lead');
      el.innerHTML = template(category, product);
      el.dataset.rendered = '1';
    });
  }

  async function submit(ev, form){
    ev.preventDefault();
    var msg = form.querySelector('[data-msg]');
    var btn = form.querySelector('button[type="submit"]');
    var data = {};
    new FormData(form).forEach(function(v,k){ data[k] = String(v).trim(); });

    // Light client-side validation
    if (!/^[0-9]{10}$/.test(data.phone)) { msg.textContent = 'Enter a valid 10-digit phone.'; msg.className = 'wib-lead-msg err'; return false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(data.email)) { msg.textContent = 'Enter a valid email.'; msg.className = 'wib-lead-msg err'; return false; }

    btn.disabled = true; btn.textContent = 'Submitting...'; msg.textContent = ''; msg.className = 'wib-lead-msg';

    try {
      if (typeof initFirebase === 'function' && typeof firebase !== 'undefined') {
        var db = initFirebase();
        await db.collection('finance_leads').add({
          name: data.name,
          phone: data.phone,
          email: data.email.toLowerCase(),
          city: data.city,
          income: parseInt(data.income, 10) || null,
          category: data.category,
          product: data.product,
          source: window.location.pathname,
          referrer: document.referrer || '',
          userAgent: (navigator.userAgent || '').slice(0, 200),
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          status: 'new',
        });
      }
      try { if (window.gtag) gtag('event', 'lead_submit', { category: data.category, product: data.product }); } catch(e){}

      msg.textContent = 'Redirecting you to the application page...'; msg.className = 'wib-lead-msg ok';
      setTimeout(function(){
        var target = window.WIB_AFFILIATE_LINKS[data.category] || window.WIB_AFFILIATE_LINKS['credit_card'];
        // Preserve UTMs
        var url = new URL(target);
        url.searchParams.set('utm_source', 'wibest');
        url.searchParams.set('utm_medium', 'lead_form');
        url.searchParams.set('utm_campaign', data.category);
        if (data.product) url.searchParams.set('utm_content', data.product.replace(/\s+/g, '_'));
        window.location.href = url.toString();
      }, 800);
    } catch(err) {
      console.error(err);
      msg.textContent = 'Submit failed. Try again, or email hello@wibest.in.'; msg.className = 'wib-lead-msg err';
      btn.disabled = false; btn.textContent = (LABELS[data.category] || LABELS['credit_card']).cta + ' →';
    }
    return false;
  }

  window.WIBLead = { submit: submit, render: render };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
  else render();
})();
