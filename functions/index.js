/**
 * WIB Firebase Cloud Functions
 *
 * Sends email notifications to the admin via Zoho Mail SMTP whenever:
 *   1. A new review is submitted (status: pending)
 *   2. A new contact/enquiry request arrives
 *   3. A new contact form message arrives
 *   4. A new newsletter subscriber signs up
 *
 * One-time setup (run in Google Cloud Shell):
 *   firebase functions:config:set \
 *     email.user="notifications@wibest.in" \
 *     email.pass="your-zoho-app-password" \
 *     email.admin="admin@wibest.in"
 *
 * Get Zoho App Password:
 *   Zoho Mail → Settings → Security → App Passwords → Generate
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
  const cfg = functions.config().email || {};
  return nodemailer.createTransport({
    host: 'smtp.zoho.in',          // use smtp.zoho.com if your account is .com
    port: 465,
    secure: true,
    auth: {
      user: cfg.user || process.env.EMAIL_USER,
      pass: cfg.pass || process.env.EMAIL_PASS,
    },
  });
}

function adminEmail() {
  return (functions.config().email || {}).admin
      || process.env.EMAIL_ADMIN
      || (functions.config().email || {}).user;
}

function senderEmail() {
  return (functions.config().email || {}).user || process.env.EMAIL_USER;
}

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
