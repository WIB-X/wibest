/* WIB blog comments widget.
   Reads + submits comments for the current page (keyed by location.pathname).
   Firestore collection: blog_comments. Approved comments are public-read.
   Drop a <div id="wib-comments"></div> wherever you want comments to appear. */
(function(){
  'use strict';
  var SLOT_ID = 'wib-comments';
  var COLLECTION = 'blog_comments';
  var MAX = 200;

  var STYLES =
    '.wib-cm{max-width:720px;margin:48px auto 0;padding:0 24px}' +
    '.wib-cm-h{font-family:Outfit,sans-serif;font-size:22px;font-weight:800;letter-spacing:-0.01em;margin-bottom:6px;color:var(--text-primary)}' +
    '.wib-cm-sub{font-size:13px;color:var(--text-muted);margin-bottom:24px}' +
    '.wib-cm-form{background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:20px 22px;margin-bottom:24px}' +
    '.wib-cm-form .row{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:10px}' +
    '.wib-cm-form input,.wib-cm-form textarea{width:100%;padding:10px 14px;border:1px solid var(--border);border-radius:8px;background:var(--bg-secondary);color:var(--text-primary);font-family:inherit;font-size:14px;box-sizing:border-box}' +
    '.wib-cm-form .row input{flex:1;width:auto;min-width:160px}' +
    '.wib-cm-form input:focus,.wib-cm-form textarea:focus{outline:none;border-color:var(--accent);box-shadow:0 0 0 3px rgba(37,99,235,0.12)}' +
    '.wib-cm-form textarea{resize:vertical;min-height:80px;font-family:inherit}' +
    '.wib-cm-actions{display:flex;justify-content:space-between;align-items:center;margin-top:8px;flex-wrap:wrap;gap:8px}' +
    '.wib-cm-actions button{padding:10px 22px;border:none;border-radius:8px;background:var(--accent);color:#fff;font-family:inherit;font-weight:700;font-size:14px;cursor:pointer;transition:all .15s}' +
    '.wib-cm-actions button:hover{background:var(--accent-hover);transform:translateY(-1px)}' +
    '.wib-cm-actions button:disabled{opacity:0.6;cursor:wait;transform:none}' +
    '.wib-cm-msg{font-size:13px;font-weight:600;min-height:18px}' +
    '.wib-cm-msg.ok{color:#16a34a}.wib-cm-msg.err{color:#dc2626}' +
    '.wib-cm-fine{font-size:11px;color:var(--text-muted);margin-top:8px;line-height:1.5}' +
    '.wib-cm-list{display:flex;flex-direction:column;gap:14px}' +
    '.wib-cm-item{padding:18px 22px;background:var(--bg-card);border:1px solid var(--border);border-radius:12px}' +
    '.wib-cm-meta{display:flex;align-items:center;gap:10px;margin-bottom:8px}' +
    '.wib-cm-avatar{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#2563eb,#9333ea);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;font-size:13px;flex-shrink:0}' +
    '.wib-cm-name{font-family:Outfit,sans-serif;font-weight:700;font-size:14px;color:var(--text-primary)}' +
    '.wib-cm-when{font-size:12px;color:var(--text-muted);margin-left:auto}' +
    '.wib-cm-text{font-size:14.5px;line-height:1.6;color:var(--text-secondary);white-space:pre-wrap;word-wrap:break-word}' +
    '.wib-cm-empty{padding:32px;text-align:center;color:var(--text-muted);background:var(--bg-card);border:1px dashed var(--border);border-radius:12px;font-size:14px}' +
    '.wib-cm-loading{padding:32px;text-align:center;color:var(--text-muted);font-size:13px}';

  function injectStyles(){
    if (document.getElementById('wib-cm-styles')) return;
    var s = document.createElement('style'); s.id='wib-cm-styles'; s.textContent=STYLES;
    document.head.appendChild(s);
  }

  function escapeHtml(s){
    return String(s||'').replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  }

  function fmtTime(ts){
    if (!ts) return 'just now';
    var d = ts.toDate ? ts.toDate() : new Date(ts);
    var diff = (Date.now() - d.getTime()) / 1000;
    if (diff < 60) return 'just now';
    if (diff < 3600) return Math.floor(diff/60) + 'm ago';
    if (diff < 86400) return Math.floor(diff/3600) + 'h ago';
    if (diff < 604800) return Math.floor(diff/86400) + 'd ago';
    return d.toLocaleDateString('en-IN', {day:'numeric', month:'short', year:'numeric'});
  }

  function initials(name){
    return (name||'?').trim().split(/\s+/).slice(0,2).map(function(n){return n[0]}).join('').toUpperCase() || '?';
  }

  var pagePath = location.pathname.replace(/\/+$/, '') || '/';

  function render(comments){
    var slot = document.getElementById(SLOT_ID);
    if (!slot) return;
    injectStyles();
    var html =
      '<div class="wib-cm">' +
        '<div class="wib-cm-h">Comments</div>' +
        '<div class="wib-cm-sub">' + (comments.length ? comments.length + (comments.length === 1 ? ' comment' : ' comments') : 'Be the first to comment') + ' · Pending moderation before they appear.</div>' +
        '<form class="wib-cm-form" onsubmit="return WIBComments.submit(event)">' +
          '<div class="row">' +
            '<input type="text" name="name" placeholder="Your name" required minlength="2" maxlength="60" autocomplete="name">' +
            '<input type="email" name="email" placeholder="Email (not published)" required maxlength="200" autocomplete="email">' +
          '</div>' +
          '<textarea name="text" placeholder="Share your thoughts. Constructive only — be the kind of comment you would want to read." required minlength="10" maxlength="2000"></textarea>' +
          '<div class="wib-cm-actions">' +
            '<div class="wib-cm-msg" data-msg></div>' +
            '<button type="submit">Post comment</button>' +
          '</div>' +
          '<div class="wib-cm-fine">Comments are reviewed before being published. We never publish your email. Spam, hate speech, or off-topic content is rejected. By posting you agree to our <a href="/privacy/" style="color:var(--accent)">privacy policy</a>.</div>' +
        '</form>' +
        '<div class="wib-cm-list">' +
          (comments.length ? comments.map(function(c){
            return '<div class="wib-cm-item">' +
              '<div class="wib-cm-meta">' +
                '<div class="wib-cm-avatar">' + initials(c.name) + '</div>' +
                '<div class="wib-cm-name">' + escapeHtml(c.name) + '</div>' +
                '<div class="wib-cm-when">' + fmtTime(c.createdAt) + '</div>' +
              '</div>' +
              '<div class="wib-cm-text">' + escapeHtml(c.text) + '</div>' +
            '</div>';
          }).join('') :
          '<div class="wib-cm-empty">No comments yet. Start the conversation.</div>') +
        '</div>' +
      '</div>';
    slot.innerHTML = html;
  }

  async function load(){
    var slot = document.getElementById(SLOT_ID);
    if (!slot) return;
    injectStyles();
    slot.innerHTML = '<div class="wib-cm"><div class="wib-cm-loading">Loading comments...</div></div>';
    try {
      if (typeof initFirebase !== 'function' || typeof firebase === 'undefined') {
        render([]);
        return;
      }
      var db = initFirebase();
      var q = await db.collection(COLLECTION)
        .where('page', '==', pagePath)
        .where('status', '==', 'approved')
        .limit(MAX)
        .get();
      var rows = [];
      q.forEach(function(d){ rows.push(d.data()); });
      // Sort newest first client-side (avoids needing a composite index)
      rows.sort(function(a,b){
        var ta = a.createdAt && a.createdAt.toMillis ? a.createdAt.toMillis() : 0;
        var tb = b.createdAt && b.createdAt.toMillis ? b.createdAt.toMillis() : 0;
        return tb - ta;
      });
      render(rows);
    } catch(err) {
      console.warn('comments load failed:', err);
      render([]);
    }
  }

  function isValidEmail(e){ return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e); }

  async function submit(ev){
    ev.preventDefault();
    var form = ev.target;
    var msg = form.querySelector('[data-msg]');
    var btn = form.querySelector('button[type="submit"]');
    var data = {};
    new FormData(form).forEach(function(v,k){ data[k] = String(v).trim(); });

    if (data.name.length < 2) { msg.textContent = 'Name too short.'; msg.className = 'wib-cm-msg err'; return false; }
    if (!isValidEmail(data.email)) { msg.textContent = 'Enter a valid email.'; msg.className = 'wib-cm-msg err'; return false; }
    if (data.text.length < 10) { msg.textContent = 'Comment must be at least 10 characters.'; msg.className = 'wib-cm-msg err'; return false; }
    if (data.text.length > 2000) { msg.textContent = 'Comment too long.'; msg.className = 'wib-cm-msg err'; return false; }
    // Naive spam guard: too many URLs
    if ((data.text.match(/https?:\/\//g) || []).length > 2) { msg.textContent = 'Too many links. Please remove some.'; msg.className = 'wib-cm-msg err'; return false; }

    btn.disabled = true; btn.textContent = 'Posting...';
    msg.textContent = ''; msg.className = 'wib-cm-msg';

    try {
      if (typeof initFirebase !== 'function' || typeof firebase === 'undefined') {
        throw new Error('Firebase not loaded');
      }
      var db = initFirebase();
      await db.collection(COLLECTION).add({
        name: data.name,
        email: data.email.toLowerCase(),
        text: data.text,
        page: pagePath,
        pageTitle: document.title || pagePath,
        status: 'pending',
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        userAgent: (navigator.userAgent || '').slice(0, 200),
      });
      msg.textContent = 'Posted. Comment will appear once reviewed (usually within 24 hours).';
      msg.className = 'wib-cm-msg ok';
      form.reset();
      try { if (window.gtag) gtag('event', 'comment_submit', { page: pagePath }); } catch(e){}
    } catch(err) {
      console.error(err);
      msg.textContent = 'Could not post. Try again or email hello@wibest.in.';
      msg.className = 'wib-cm-msg err';
    } finally {
      btn.disabled = false; btn.textContent = 'Post comment';
    }
    return false;
  }

  window.WIBComments = { submit: submit, load: load };

  // Auto-load when slot appears
  function init(){
    if (document.getElementById(SLOT_ID)) load();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
