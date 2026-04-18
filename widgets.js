/* WIB shared widgets — reviews + lead-gen + price tracker UI.
   Usage: <script src="/widgets.js" defer></script>
   Then in HTML:
     <div data-wib-reviews="iphone-16"></div>
     <div data-wib-lead data-entity="DPS Bangalore" data-category="schools"></div>
     <div data-wib-price data-asin="B0DD9LSC5W" data-product="iPhone 16"></div>
*/
(function () {
  if (typeof firebase === 'undefined') {
    console.warn('WIB widgets require Firebase to be loaded first.');
    return;
  }
  if (!firebase.apps.length && typeof initFirebase === 'function') initFirebase();
  var db = firebase.firestore();

  // ───────────────────────────────────────────── Shared CSS ───────────────────
  var css = '\
.wib-w{margin:32px 0;padding:24px;background:var(--bg-card,#fff);border:1px solid var(--border,#e2e8f0);border-radius:12px;font-family:inherit}\
.wib-w h3{font-family:Outfit,sans-serif;font-size:18px;font-weight:700;margin-bottom:8px;color:var(--text-primary,#0f172a)}\
.wib-w .wib-sub{font-size:13px;color:var(--text-muted,#94a3b8);margin-bottom:16px}\
.wib-w label{display:block;font-size:12px;font-weight:600;color:var(--text-secondary,#475569);margin:10px 0 4px;text-transform:uppercase;letter-spacing:.05em}\
.wib-w input,.wib-w textarea,.wib-w select{width:100%;padding:10px 14px;border:1.5px solid var(--border,#e2e8f0);border-radius:8px;background:var(--bg-secondary,#f8fafc);color:var(--text-primary,#0f172a);font:inherit;font-size:14px;box-sizing:border-box}\
.wib-w input:focus,.wib-w textarea:focus{outline:none;border-color:var(--accent,#2563eb)}\
.wib-w textarea{min-height:80px;resize:vertical}\
.wib-w button{margin-top:14px;padding:11px 22px;background:var(--accent,#2563eb);color:#fff;border:0;border-radius:8px;font:inherit;font-size:14px;font-weight:600;cursor:pointer}\
.wib-w button:hover{background:var(--accent-hover,#1d4ed8)}\
.wib-w button:disabled{background:#94a3b8;cursor:not-allowed}\
.wib-w .wib-msg{margin-top:10px;font-size:13px;min-height:18px}\
.wib-w .wib-msg.ok{color:#16a34a}\
.wib-w .wib-msg.err{color:#dc2626}\
.wib-stars{display:inline-flex;gap:4px;align-items:center}\
.wib-star{font-size:22px;color:#cbd5e1;cursor:pointer;line-height:1}\
.wib-star.filled{color:#f59e0b}\
.wib-rating-box{display:flex;align-items:center;gap:14px;padding:16px;background:var(--bg-secondary,#f8fafc);border-radius:10px;margin-bottom:16px}\
.wib-rating-num{font-size:36px;font-weight:800;color:var(--text-primary,#0f172a);line-height:1}\
.wib-rating-meta{font-size:12px;color:var(--text-muted,#94a3b8)}\
.wib-rev{padding:14px;border-bottom:1px solid var(--border,#e2e8f0)}\
.wib-rev:last-child{border-bottom:0}\
.wib-rev-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}\
.wib-rev-name{font-weight:600;color:var(--text-primary,#0f172a);font-size:14px}\
.wib-rev-date{font-size:12px;color:var(--text-muted,#94a3b8)}\
.wib-rev-text{color:var(--text-secondary,#475569);font-size:14px;line-height:1.55}\
.wib-price-now{font-size:28px;font-weight:800;color:var(--accent,#2563eb)}\
.wib-price-low{font-size:13px;color:var(--text-muted,#94a3b8);margin-top:4px}\
.wib-price-row{display:flex;align-items:baseline;justify-content:space-between;flex-wrap:wrap;gap:12px}\
.wib-alert-form{margin-top:14px;display:flex;gap:8px;flex-wrap:wrap}\
.wib-alert-form input{flex:1;min-width:160px}\
';
  var styleEl = document.createElement('style'); styleEl.textContent = css; document.head.appendChild(styleEl);

  function el(tag, attrs, children) {
    var n = document.createElement(tag);
    if (attrs) for (var k in attrs) {
      if (k === 'class') n.className = attrs[k];
      else if (k === 'html') n.innerHTML = attrs[k];
      else n.setAttribute(k, attrs[k]);
    }
    (children || []).forEach(function (c) { if (typeof c === 'string') n.appendChild(document.createTextNode(c)); else if (c) n.appendChild(c); });
    return n;
  }

  function escapeHtml(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (m) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]; }); }

  // ─────────────────────────────────────── REVIEWS WIDGET ─────────────────────
  function mountReviews(container) {
    var entityId = container.dataset.wibReviews;
    if (!entityId) return;
    var entityName = container.dataset.entityName || entityId;
    container.classList.add('wib-w');
    container.innerHTML = '<h3>Reviews & Ratings</h3><div class="wib-sub">Real users rating ' + escapeHtml(entityName) + '</div><div class="wib-rating-summary"></div><div class="wib-rev-list">Loading reviews…</div><h4 style="margin-top:24px;font-size:15px;font-weight:600">Write a review</h4><form class="wib-rev-form"><label>Your rating</label><div class="wib-stars" data-rating-input>' + [1,2,3,4,5].map(function(i){return '<span class="wib-star" data-val="'+i+'">★</span>';}).join('') + '</div><label>Name</label><input name="name" required maxlength="100"><label>Email (kept private)</label><input name="email" type="email" required maxlength="200"><label>Your review</label><textarea name="text" required maxlength="2000" placeholder="What was your experience?"></textarea><button type="submit">Submit Review</button><div class="wib-msg"></div></form>';

    // Star input
    var stars = container.querySelectorAll('.wib-stars [data-val]');
    var rating = 0;
    stars.forEach(function (s) {
      s.onclick = function () {
        rating = parseInt(s.dataset.val, 10);
        stars.forEach(function (x) { x.classList.toggle('filled', parseInt(x.dataset.val, 10) <= rating); });
      };
    });

    // Load reviews
    db.collection('reviews').where('entityId', '==', entityId).where('status', '==', 'approved').limit(20).get().then(function (snap) {
      var list = container.querySelector('.wib-rev-list');
      if (snap.empty) {
        list.innerHTML = '<div class="wib-sub" style="margin:0">No reviews yet. Be the first to review!</div>';
        container.querySelector('.wib-rating-summary').innerHTML = '';
        return;
      }
      var docs = [];
      snap.forEach(function (d) { docs.push(d.data()); });
      var avg = docs.reduce(function (a, r) { return a + (Number(r.rating) || 0); }, 0) / docs.length;
      container.querySelector('.wib-rating-summary').innerHTML = '<div class="wib-rating-box"><div><div class="wib-rating-num">' + avg.toFixed(1) + '</div><div class="wib-rating-meta">' + docs.length + ' review' + (docs.length === 1 ? '' : 's') + '</div></div><div style="font-size:24px;color:#f59e0b">' + '★'.repeat(Math.round(avg)) + '<span style="color:#cbd5e1">' + '★'.repeat(5 - Math.round(avg)) + '</span></div></div>';
      list.innerHTML = docs.map(function (r) {
        var d = r.createdAt && r.createdAt.toDate ? r.createdAt.toDate().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }) : '';
        return '<div class="wib-rev"><div class="wib-rev-head"><span class="wib-rev-name">' + escapeHtml(r.name) + '</span><span class="wib-rev-date">' + escapeHtml(d) + ' · ' + (r.rating || 0) + '/5</span></div><div class="wib-rev-text">' + escapeHtml(r.text) + '</div></div>';
      }).join('');
      // Inject AggregateRating JSON-LD
      try {
        var ld = { '@context': 'https://schema.org', '@type': 'AggregateRating', itemReviewed: { '@type': 'Thing', name: entityName }, ratingValue: avg.toFixed(1), reviewCount: docs.length };
        var s = document.createElement('script'); s.type = 'application/ld+json'; s.text = JSON.stringify(ld); document.head.appendChild(s);
      } catch (e) {}
    }).catch(function (e) { container.querySelector('.wib-rev-list').textContent = 'Could not load reviews.'; });

    container.querySelector('.wib-rev-form').onsubmit = function (e) {
      e.preventDefault();
      var f = e.target;
      var msg = f.querySelector('.wib-msg');
      if (rating < 1) { msg.textContent = 'Please select a rating.'; msg.className = 'wib-msg err'; return; }
      var btn = f.querySelector('button'); btn.disabled = true; btn.textContent = 'Submitting…';
      db.collection('reviews').add({
        name: f.name.value.trim(),
        email: f.email.value.trim(),
        text: f.text.value.trim(),
        rating: rating,
        entityId: entityId,
        category: container.dataset.category || 'general',
        status: 'pending',
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      }).then(function () {
        msg.textContent = 'Thanks! Your review is pending moderation.'; msg.className = 'wib-msg ok';
        f.reset(); rating = 0; stars.forEach(function (x) { x.classList.remove('filled'); });
        btn.disabled = false; btn.textContent = 'Submit Review';
      }).catch(function (err) {
        msg.textContent = 'Error: ' + (err.message || 'try again'); msg.className = 'wib-msg err';
        btn.disabled = false; btn.textContent = 'Submit Review';
      });
    };
  }

  // ─────────────────────────────────────── LEAD FORM ──────────────────────────
  function mountLead(container) {
    var entity = container.dataset.entity || 'WIB';
    var category = container.dataset.category || 'general';
    container.classList.add('wib-w');
    container.innerHTML = '<h3>Get more info about ' + escapeHtml(entity) + '</h3><div class="wib-sub">Free • No spam • Reply within 24 hours</div><form class="wib-lead-form"><label>Your name</label><input name="parentName" required maxlength="100"><label>Email</label><input name="parentEmail" type="email" required maxlength="200"><label>Phone (WhatsApp)</label><input name="parentPhone" type="tel" pattern="[0-9+ ]{10,15}" maxlength="15" placeholder="+91 98XXX XXXXX"><label>Message (optional)</label><textarea name="message" maxlength="1000" placeholder="Anything specific you want to know?"></textarea><button type="submit">Get Free Information</button><div class="wib-msg"></div></form>';

    container.querySelector('.wib-lead-form').onsubmit = function (e) {
      e.preventDefault();
      var f = e.target;
      var msg = f.querySelector('.wib-msg');
      var btn = f.querySelector('button'); btn.disabled = true; btn.textContent = 'Sending…';
      var doc = {
        parentName: f.parentName.value.trim(),
        parentEmail: f.parentEmail.value.trim(),
        parentPhone: f.parentPhone.value.trim(),
        message: f.message.value.trim(),
        status: 'pending',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        category: category
      };
      // Match the per-category field name expected by the email Cloud Function
      doc[category === 'schools' ? 'schoolName' : category === 'colleges' ? 'collegeName' : category === 'hospitals' ? 'hospitalName' : 'entityName'] = entity;

      db.collection('contact_requests').add(doc).then(function () {
        msg.textContent = '✓ Sent! WIB will email you back within 24 hours.'; msg.className = 'wib-msg ok';
        f.reset(); btn.disabled = false; btn.textContent = 'Get Free Information';
        // GA event
        if (typeof gtag === 'function') gtag('event', 'generate_lead', { category: category, entity: entity });
      }).catch(function (err) {
        msg.textContent = 'Error: ' + (err.message || 'try again later'); msg.className = 'wib-msg err';
        btn.disabled = false; btn.textContent = 'Get Free Information';
      });
    };
  }

  // ─────────────────────────────────────── PRICE TRACKER ──────────────────────
  function mountPrice(container) {
    var asin = container.dataset.asin || container.dataset.wibPrice;
    var productName = container.dataset.product || asin;
    container.classList.add('wib-w');
    container.innerHTML = '<h3>Price Tracker · ' + escapeHtml(productName) + '</h3><div class="wib-sub">Get notified when the price drops</div><div class="wib-price-row"><div><div class="wib-price-now" data-current>—</div><div class="wib-price-low" data-low>30-day low: —</div></div><a href="https://www.amazon.in/dp/' + encodeURIComponent(asin) + '" target="_blank" rel="nofollow sponsored noopener" class="wib-buy" style="background:#ff9900;color:#fff;padding:11px 20px;border-radius:8px;text-decoration:none;font-weight:600;font-size:14px">Buy on Amazon →</a></div><form class="wib-alert-form"><input type="email" name="email" placeholder="your@email.com" required><input type="number" name="target" placeholder="Alert below ₹" min="100"><button type="submit">Set Alert</button></form><div class="wib-msg"></div>';

    db.collection('prices').doc(asin).get().then(function (d) {
      if (!d.exists) {
        container.querySelector('[data-current]').textContent = 'Price tracking starting soon';
        return;
      }
      var p = d.data();
      container.querySelector('[data-current]').textContent = '₹' + (p.current || 0).toLocaleString('en-IN');
      if (p.low30) container.querySelector('[data-low]').textContent = '30-day low: ₹' + p.low30.toLocaleString('en-IN');
    }).catch(function () {});

    container.querySelector('.wib-alert-form').onsubmit = function (e) {
      e.preventDefault();
      var f = e.target;
      var msg = container.querySelector('.wib-msg');
      var btn = f.querySelector('button'); btn.disabled = true;
      db.collection('price_alerts').add({
        asin: asin,
        product: productName,
        email: f.email.value.trim(),
        targetPrice: parseInt(f.target.value, 10) || 0,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        active: true
      }).then(function () {
        msg.textContent = '✓ Alert set. We\'ll email you when ' + productName + ' drops below ₹' + f.target.value;
        msg.className = 'wib-msg ok';
        f.reset(); btn.disabled = false;
        if (typeof gtag === 'function') gtag('event', 'price_alert_set', { asin: asin });
      }).catch(function (err) {
        msg.textContent = 'Error: ' + err.message; msg.className = 'wib-msg err';
        btn.disabled = false;
      });
    };
  }

  // ─────────────────────────────────────── BOOTSTRAP ──────────────────────────
  function mountAll(root) {
    root = root || document;
    root.querySelectorAll && root.querySelectorAll('[data-wib-reviews]:not(.wib-mounted)').forEach(function (n) { n.classList.add('wib-mounted'); mountReviews(n); });
    root.querySelectorAll && root.querySelectorAll('[data-wib-lead]:not(.wib-mounted)').forEach(function (n) { n.classList.add('wib-mounted'); mountLead(n); });
    root.querySelectorAll && root.querySelectorAll('[data-wib-price]:not(.wib-mounted)').forEach(function (n) { n.classList.add('wib-mounted'); mountPrice(n); });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { mountAll(); });
  else mountAll();
  new MutationObserver(function (muts) { muts.forEach(function (m) { m.addedNodes.forEach(function (n) { if (n.nodeType === 1) mountAll(n); }); }); }).observe(document.body || document.documentElement, { childList: true, subtree: true });

  window.WIBWidgets = { mountAll: mountAll };
})();
