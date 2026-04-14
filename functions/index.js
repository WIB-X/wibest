/**
 * WIB Firebase Cloud Functions
 *
 * Sends email notifications to the admin whenever:
 *   1. A new review is submitted (status: pending)
 *   2. A new contact/enquiry request arrives
 *   3. A new contact form message arrives
 *   4. A new newsletter subscriber signs up
 *
 * Setup (one-time):
 *   firebase functions:config:set email.user="your-gmail@gmail.com" \
 *                                   email.pass="your-app-password" \
 *                                   email.admin="admin@wibest.in"
 *
 * Deploy:
 *   firebase deploy --only functions
 */

const functions = require('firebase-functions');
const admin     = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// ── Mailer (configured via firebase functions:config:set) ─────────────────────
function createTransport() {
  const cfg = functions.config().email || {};
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: cfg.user || process.env.EMAIL_USER,
      pass: cfg.pass || process.env.EMAIL_PASS,
    },
  });
}

function adminEmail() {
  const cfg = functions.config().email || {};
  return cfg.admin || process.env.EMAIL_ADMIN || (functions.config().email || {}).user;
}

async function sendMail(subject, html) {
  try {
    const transport = createTransport();
    await transport.sendMail({
      from: `"WIB Notifications" <${(functions.config().email || {}).user}>`,
      to: adminEmail(),
      subject,
      html,
    });
  } catch (err) {
    console.error('sendMail error:', err.message);
  }
}

// ── 1. New Review ─────────────────────────────────────────────────────────────
exports.onNewReview = functions.firestore
  .document('reviews/{reviewId}')
  .onCreate(async (snap) => {
    const r = snap.data();
    const entity = r.schoolName || r.collegeName || r.hospitalName || r.category || 'Unknown';
    await sendMail(
      `[WIB] New review pending — ${entity}`,
      `<h2>New review submitted</h2>
       <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
         <tr><td style="padding:6px 12px;font-weight:600;color:#64748b">From</td><td style="padding:6px 12px">${r.name || '—'}</td></tr>
         <tr><td style="padding:6px 12px;font-weight:600;color:#64748b">Email</td><td style="padding:6px 12px">${r.email || '—'}</td></tr>
         <tr><td style="padding:6px 12px;font-weight:600;color:#64748b">For</td><td style="padding:6px 12px">${entity}</td></tr>
         <tr><td style="padding:6px 12px;font-weight:600;color:#64748b">Rating</td><td style="padding:6px 12px">${r.rating || '—'} / 5</td></tr>
         <tr><td style="padding:6px 12px;font-weight:600;color:#64748b">Review</td><td style="padding:6px 12px">${r.text || '—'}</td></tr>
         <tr><td style="padding:6px 12px;font-weight:600;color:#64748b">Type</td><td style="padding:6px 12px">${r.type || 'user'}</td></tr>
       </table>
       <p style="margin-top:16px"><a href="https://wibest.in/admin-dashboard/" style="background:#2563eb;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-family:sans-serif;font-size:14px;font-weight:600">Review in Admin Dashboard</a></p>`
    );
  });

// ── 2. New Contact / Enquiry Request ─────────────────────────────────────────
exports.onNewContactRequest = functions.firestore
  .document('contact_requests/{reqId}')
  .onCreate(async (snap) => {
    const r = snap.data();
    await sendMail(
      `[WIB] New enquiry — ${r.schoolName || r.collegeName || 'Unknown'}`,
      `<h2>New enquiry received</h2>
       <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
         <tr><td style="padding:6px 12px;font-weight:600;color:#64748b">Parent</td><td style="padding:6px 12px">${r.parentName || '—'}</td></tr>
         <tr><td style="padding:6px 12px;font-weight:600;color:#64748b">Email</td><td style="padding:6px 12px">${r.parentEmail || '—'}</td></tr>
         <tr><td style="padding:6px 12px;font-weight:600;color:#64748b">Phone</td><td style="padding:6px 12px">${r.parentPhone || '—'}</td></tr>
         <tr><td style="padding:6px 12px;font-weight:600;color:#64748b">For</td><td style="padding:6px 12px">${r.schoolName || r.collegeName || '—'}</td></tr>
         <tr><td style="padding:6px 12px;font-weight:600;color:#64748b">Grade</td><td style="padding:6px 12px">${r.childGrade || '—'}</td></tr>
         <tr><td style="padding:6px 12px;font-weight:600;color:#64748b">Message</td><td style="padding:6px 12px">${r.message || '—'}</td></tr>
       </table>
       <p style="margin-top:16px"><a href="https://wibest.in/admin-dashboard/" style="background:#2563eb;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-family:sans-serif;font-size:14px;font-weight:600">View in Admin Dashboard</a></p>`
    );
  });

// ── 3. New Contact Form Message ───────────────────────────────────────────────
exports.onNewContactMessage = functions.firestore
  .document('contact_messages/{msgId}')
  .onCreate(async (snap) => {
    const m = snap.data();
    await sendMail(
      `[WIB] Contact form — ${m.subject || 'No subject'}`,
      `<h2>New contact message</h2>
       <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
         <tr><td style="padding:6px 12px;font-weight:600;color:#64748b">Name</td><td style="padding:6px 12px">${m.name || '—'}</td></tr>
         <tr><td style="padding:6px 12px;font-weight:600;color:#64748b">Email</td><td style="padding:6px 12px">${m.email || '—'}</td></tr>
         <tr><td style="padding:6px 12px;font-weight:600;color:#64748b">Subject</td><td style="padding:6px 12px">${m.subject || '—'}</td></tr>
         <tr><td style="padding:6px 12px;font-weight:600;color:#64748b">Message</td><td style="padding:6px 12px">${m.message || '—'}</td></tr>
       </table>
       <p style="margin-top:16px"><a href="https://wibest.in/admin-dashboard/" style="background:#2563eb;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;font-family:sans-serif;font-size:14px;font-weight:600">View in Admin Dashboard</a></p>`
    );
  });

// ── 4. New Newsletter Subscriber ─────────────────────────────────────────────
exports.onNewSubscriber = functions.firestore
  .document('newsletter_subscribers/{subId}')
  .onCreate(async (snap) => {
    const s = snap.data();
    await sendMail(
      `[WIB] New newsletter subscriber — ${s.email}`,
      `<h2>New subscriber</h2>
       <p style="font-family:sans-serif;font-size:14px"><strong>Email:</strong> ${s.email}</p>
       <p style="font-family:sans-serif;font-size:14px"><strong>Source:</strong> ${s.source || 'homepage'}</p>`
    );
  });
