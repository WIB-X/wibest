/* ═══════════════════════════════════════════════════════
   WIB — Shared Configuration
   Update your Firebase API key below. All pages use this file.
   Guarded so accidental double-loading doesn't throw SyntaxError.
   ═══════════════════════════════════════════════════════ */

if (typeof window.FIREBASE_CONFIG === 'undefined') {
  window.FIREBASE_CONFIG = {
    apiKey: "AIzaSyA_IcdzywseRgXTY8MqiOY1LLfwnfps3Oo",
    authDomain: "wibest-449fe.firebaseapp.com",
    projectId: "wibest-449fe",
    storageBucket: "wibest-449fe.appspot.com"
  };
}
var FIREBASE_CONFIG = window.FIREBASE_CONFIG;

/* ─── Theme ─── */
function initTheme() {
  try {
    if (localStorage.getItem('wib-theme') === 'dark')
      document.documentElement.setAttribute('data-theme', 'dark');
  } catch(e) {}
  updateThemeIcon();
}
function toggleTheme() {
  const h = document.documentElement;
  const isDark = h.getAttribute('data-theme') === 'dark';
  h.setAttribute('data-theme', isDark ? 'light' : 'dark');
  try { localStorage.setItem('wib-theme', isDark ? 'light' : 'dark'); } catch(e) {}
  updateThemeIcon();
}
function updateThemeIcon() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const sun = document.querySelector('.sun-icon');
  const moon = document.querySelector('.moon-icon');
  if (sun) sun.style.display = isDark ? 'none' : 'block';
  if (moon) moon.style.display = isDark ? 'block' : 'none';
}
function toggleMobile() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

/* ─── Init Firebase ─── */
function initFirebase() {
  if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
  return firebase.firestore();
}

initTheme();
document.addEventListener('click', function(e) {
  document.querySelectorAll('.nav-more.open').forEach(function(el) {
    if (!el.contains(e.target)) el.classList.remove('open');
  });
});

// Apply lazy loading to all images that don't already have the attribute
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('img:not([loading])').forEach(function(img) {
    img.setAttribute('loading', 'lazy');
  });
});

// Register service worker for PWA / offline support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').catch(function(err) {
      console.warn('SW registration failed:', err);
    });
  });
}
