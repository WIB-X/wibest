/* ═══════════════════════════════════════════════════════
   WIB — Shared Configuration
   Update your Firebase API key below. All pages use this file.
   ═══════════════════════════════════════════════════════ */

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyA_IcdzywseRgXTY8MqiOY1LLfwnfps3Oo",
  authDomain: "wibest-449fe.firebaseapp.com",
  projectId: "wibest-449fe",
  storageBucket: "wibest-449fe.appspot.com"
};

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
