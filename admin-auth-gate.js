/**
 * WIB Admin Auth Gate
 * Include this script (BEFORE page content) in all admin/seed/migration pages.
 * It injects a login overlay, checks Firebase Auth, and blocks the page
 * until a valid admin user is authenticated.
 *
 * Usage: <script src="/admin-auth-gate.js"></script>
 * (Requires Firebase App + Auth compat SDKs to be loaded first, and /config.js)
 */
(function () {
  'use strict';

  var CSS = [
    '<style>',
    '#wib-auth-overlay{position:fixed;inset:0;z-index:99999;display:flex;',
    'align-items:center;justify-content:center;background:#0f172a;}',
    '#wib-auth-box{background:#1e293b;border:1px solid #334155;border-radius:16px;',
    'padding:40px;width:360px;text-align:center;font-family:system-ui,sans-serif;}',
    '#wib-auth-box h2{color:#f1f5f9;font-size:22px;font-weight:700;margin-bottom:4px;}',
    '#wib-auth-box p{color:#94a3b8;font-size:13px;margin-bottom:24px;}',
    '#wib-auth-box input{display:block;width:100%;padding:10px 14px;margin-bottom:12px;',
    'border:1.5px solid #334155;border-radius:8px;background:#0f172a;color:#f1f5f9;',
    'font-size:14px;font-family:inherit;box-sizing:border-box;}',
    '#wib-auth-box input:focus{outline:none;border-color:#3b82f6;}',
    '#wib-auth-btn{width:100%;padding:11px;background:#3b82f6;color:#fff;border:none;',
    'border-radius:8px;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;}',
    '#wib-auth-btn:hover{background:#2563eb;}',
    '#wib-auth-btn:disabled{opacity:.55;cursor:not-allowed;}',
    '#wib-auth-err{color:#f87171;font-size:12px;margin-top:10px;min-height:16px;}',
    '</style>'
  ].join('');

  var HTML = [
    '<div id="wib-auth-overlay">',
    '<div id="wib-auth-box">',
    '<h2>WIB Admin</h2>',
    '<p>Sign in to access this tool</p>',
    '<input type="email" id="wib-auth-email" placeholder="Admin email" autocomplete="email">',
    '<input type="password" id="wib-auth-pass" placeholder="Password" autocomplete="current-password">',
    '<button id="wib-auth-btn" onclick="wibAuthLogin()">Sign In</button>',
    '<div id="wib-auth-err"></div>',
    '</div></div>'
  ].join('');

  // Inject overlay immediately so the page is hidden until auth completes
  document.write(CSS + HTML);

  window.wibAuthLogin = function () {
    var email = document.getElementById('wib-auth-email').value.trim();
    var pass  = document.getElementById('wib-auth-pass').value;
    var btn   = document.getElementById('wib-auth-btn');
    var err   = document.getElementById('wib-auth-err');
    if (!email || !pass) { err.textContent = 'Enter email and password.'; return; }
    btn.disabled = true;
    btn.textContent = 'Signing in…';
    err.textContent = '';
    firebase.auth().signInWithEmailAndPassword(email, pass)
      .then(function () { /* onAuthStateChanged handles the rest */ })
      .catch(function (e) {
        err.textContent = e.code === 'auth/wrong-password' || e.code === 'auth/user-not-found'
          ? 'Incorrect email or password.'
          : (e.message || 'Sign-in failed.');
        btn.disabled = false;
        btn.textContent = 'Sign In';
      });
  };

  // Support pressing Enter in the password field
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      var overlay = document.getElementById('wib-auth-overlay');
      if (overlay && overlay.style.display !== 'none') wibAuthLogin();
    }
  });

  // Watch auth state — runs after Firebase is fully initialised via config.js
  document.addEventListener('DOMContentLoaded', function () {
    if (typeof firebase === 'undefined' || typeof initFirebase === 'undefined') {
      document.getElementById('wib-auth-err').textContent =
        'Firebase not loaded. Check script order.';
      return;
    }
    initFirebase(); // ensures firebase.apps is initialised
    firebase.auth().onAuthStateChanged(function (user) {
      var overlay = document.getElementById('wib-auth-overlay');
      if (user) {
        // Hide overlay — page content is revealed
        if (overlay) overlay.style.display = 'none';
      } else {
        // Show overlay — block page
        if (overlay) overlay.style.display = 'flex';
      }
    });
  });
})();
