/**
 * WIB Firebase Cloud Functions
 *
 * Sends email notifications to the admin via Zoho Mail SMTP whenever:
 *   1. A new review is submitted (status: pending)
 *   2. A new contact/enquiry request arrives
 *   3. A new contact form message arrives
 *   4. A new newsletter subscriber signs up
 *
 * Environment variables (set in functions/.env — never commit this file):
 *   EMAIL_USER=hello@wibest.in
 *   EMAIL_PASS=your-zoho-app-password
 *   EMAIL_ADMIN=hello@wibest.in
 *
 * Deploy (automatic via GitHub Actions on push to main,
 *         or manually): firebase deploy --only functions
 */

const functions  = require('firebase-functions');
const admin      = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// ── Zoho SMTP transport ───────────────────────────────────────────────────────
function createTransport() {
  return nodemailer.createTransport({
    host: 'smtp.zoho.in',          // use smtp.zoho.com if your account is .com
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
}

function adminEmail()  { return process.env.EMAIL_ADMIN || process.env.EMAIL_USER; }
function senderEmail() { return process.env.EMAIL_USER; }

async function sendMail(subject, html) {
  try {
    const transport = createTransport();
    await transport.sendMail({
      from: `"WIB Notifications" <${senderEmail()}>`,
      to: adminEmail(),
      subject,
      html,
    });
    console.log('Email sent:', subject);
  } catch (err) {
    console.error('sendMail error:', err.message);
  }
}

function row(label, value) {
  return `<tr>
    <td style="padding:8px 14px;font-weight:600;color:#64748b;white-space:nowrap;vertical-align:top">${label}</td>
    <td style="padding:8px 14px;color:#1e293b">${value || '—'}</td>
  </tr>`;
}

function emailWrap(title, tableRows, actionUrl, actionLabel) {
  return `<!DOCTYPE html><html><body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,sans-serif">
  <div style="max-width:560px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0">
    <div style="background:#2563eb;padding:20px 28px">
      <span style="font-size:20px;font-weight:700;color:#fff;letter-spacing:-0.02em">WIB</span>
      <span style="font-size:14px;color:rgba(255,255,255,.75);margin-left:10px">${title}</span>
    </div>
    <div style="padding:24px 28px">
      <table style="border-collapse:collapse;width:100%;font-size:14px;background:#f8fafc;border-radius:8px;overflow:hidden">
        ${tableRows}
      </table>
      ${actionUrl ? `<p style="margin-top:20px"><a href="${actionUrl}" style="background:#2563eb;color:#fff;padding:11px 22px;border-radius:7px;text-decoration:none;font-size:14px;font-weight:600">${actionLabel}</a></p>` : ''}
    </div>
    <div style="padding:14px 28px;background:#f8fafc;border-top:1px solid #e2e8f0;font-size:12px;color:#94a3b8">
      Automated notification from WIB · wibest.in
    </div>
  </div>
  </body></html>`;
}

const DASHBOARD = 'https://wibest.in/admin-dashboard/';

// ── 1. New Review ─────────────────────────────────────────────────────────────
exports.onNewReview = functions.firestore
  .document('reviews/{reviewId}')
  .onCreate(async (snap) => {
    const r = snap.data();
    const entity = r.schoolName || r.collegeName || r.hospitalName || r.category || 'Unknown';
    await sendMail(
      `[WIB] New review pending — ${entity}`,
      emailWrap('New review pending',
        row('From', r.name) +
        row('Email', r.email) +
        row('For', entity) +
        row('Rating', `${r.rating || '—'} / 5`) +
        row('Type', r.type || 'user') +
        row('Review', r.text),
        DASHBOARD, 'Approve / Reject in Dashboard'
      )
    );
  });

// ── 2. New Contact / Enquiry Request ─────────────────────────────────────────
exports.onNewContactRequest = functions.firestore
  .document('contact_requests/{reqId}')
  .onCreate(async (snap) => {
    const r = snap.data();
    const entity = r.schoolName || r.collegeName || '—';
    await sendMail(
      `[WIB] New enquiry — ${entity}`,
      emailWrap('New enquiry received',
        row('Parent', r.parentName) +
        row('Email', r.parentEmail) +
        row('Phone', r.parentPhone) +
        row('For', entity) +
        row('Grade', r.childGrade) +
        row('Message', r.message),
        DASHBOARD, 'View in Dashboard'
      )
    );
  });

// ── 3. New Contact Form Message ───────────────────────────────────────────────
exports.onNewContactMessage = functions.firestore
  .document('contact_messages/{msgId}')
  .onCreate(async (snap) => {
    const m = snap.data();
    await sendMail(
      `[WIB] Contact — ${m.subject || 'No subject'}`,
      emailWrap('New contact message',
        row('Name', m.name) +
        row('Email', m.email) +
        row('Subject', m.subject) +
        row('Message', m.message),
        DASHBOARD, 'View in Dashboard'
      )
    );
  });

// ── 4. New Newsletter Subscriber ─────────────────────────────────────────────
exports.onNewSubscriber = functions.firestore
  .document('newsletter_subscribers/{subId}')
  .onCreate(async (snap) => {
    const s = snap.data();
    await sendMail(
      `[WIB] New subscriber — ${s.email}`,
      emailWrap('New newsletter subscriber',
        row('Email', s.email) +
        row('Source', s.source || 'homepage'),
        null, null
      )
    );
  });

// ── 5. New Lead (contact_request enhanced for lead-gen widget) ───────────────
// (Already covered by onNewContactRequest above — no duplicate trigger needed.)

// ── 6. New Price Alert ───────────────────────────────────────────────────────
exports.onNewPriceAlert = functions.firestore
  .document('price_alerts/{id}')
  .onCreate(async (snap) => {
    const a = snap.data();
    await sendMail(
      `[WIB] New price alert — ${a.product || a.asin}`,
      emailWrap('New price alert subscription',
        row('Product', a.product || a.asin) +
        row('ASIN', a.asin) +
        row('Target ₹', a.targetPrice) +
        row('Email', a.email),
        DASHBOARD, 'Manage in Dashboard'
      )
    );
  });

// ── 7. Daily price refresh (cron) ────────────────────────────────────────────
// NOTE: Without Amazon Product Advertising API credentials, this is a STUB.
// When user gets PA-API access (3 sales required), replace the fetch block.
const tracked = ['B0DGJ7TGLL', 'B0DGHRPYS4', 'B0CHX6LLXT', 'B0DGYJC2D5']; // sample ASINs
exports.refreshPrices = functions.pubsub
  .schedule('every 24 hours')
  .timeZone('Asia/Kolkata')
  .onRun(async () => {
    // Stub: for each ASIN, write a synthetic price entry until PA-API is wired.
    const now = new Date();
    for (const asin of tracked) {
      const ref = admin.firestore().collection('prices').doc(asin);
      const cur = await ref.get();
      const prev = cur.exists ? cur.data() : { history: [] };
      const synthetic = 10000 + Math.floor(Math.random() * 50000);
      const history = (prev.history || []).slice(-29);
      history.push({ d: now.toISOString().slice(0,10), p: synthetic });
      const low30 = Math.min(...history.map(h => h.p));
      await ref.set({ asin, current: synthetic, low30, history, updatedAt: now }, { merge: true });
    }
    console.log('Refreshed prices for', tracked.length, 'ASINs');
    return null;
  });

// ── 8. AI Compare proxy (Gemini) ─────────────────────────────────────────────
// Set GEMINI_API_KEY in functions/.env (or via Firebase secret manager)
exports.compareAI = functions.https.onRequest(async (req, res) => {
  // Permissive CORS — read-only API, no cookies, naturally rate-limited by Gemini cost.
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Max-Age', '3600');
  if (req.method === 'OPTIONS') return res.status(204).send('');
  if (req.method === 'GET') return res.json({ status: 'ok', usage: 'POST { query: "..." }' });
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'GEMINI_API_KEY not configured' });

  const { query, items } = req.body || {};
  if (!query || typeof query !== 'string' || query.length > 500) {
    return res.status(400).json({ error: 'query required (max 500 chars)' });
  }

  const system = 'You are WIBest AI — an expert comparison assistant for Indian shoppers. Be concise, India-specific (₹ prices, INR, Indian brands), and structured. Use markdown headings and bullets. Always end with a clear recommendation.';
  const user = items
    ? `Compare these for an Indian buyer: ${items.join(' vs ')}\n\nUser context: ${query}`
    : query;

  try {
    const apiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: system + '\n\n' + user }] }],
        generationConfig: { temperature: 0.4, maxOutputTokens: 1024 }
      })
    });
    const data = await apiRes.json();
    const text = (((data.candidates || [])[0] || {}).content || {}).parts?.[0]?.text || 'No response.';
    return res.json({ answer: text });
  } catch (e) {
    console.error('compareAI error:', e);
    return res.status(500).json({ error: e.message });
  }
});

// touch 2026-04-18T11:53:51Z — force redeploy after GEMINI_API_KEY secret added
