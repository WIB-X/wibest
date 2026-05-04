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
// REMOVED: was writing synthetic/random prices to Firestore, which misled users.
// Will reintroduce with real data once Amazon PA-API credentials are obtained
// (requires 3 qualifying affiliate sales in the Associates program first).

// ── 7b. Weekly newsletter digest (cron) ──────────────────────────────────────
// Every Friday 10:00 IST: pulls the 5 most-recent blog posts and emails all
// non-unsubscribed subscribers a rich digest with cover images + CTAs.
function digestHtml(posts) {
  const escape = (s) => (s || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const postCards = posts.map((p, i) => {
    const url = `https://wibest.in/blog/${p.slug}/`;
    const title = escape(p.title || p.slug).slice(0, 100);
    const summary = escape(p.summary || p.description || '').slice(0, 180);
    const cover = p.coverImage || p.cover_image || 'https://wibest.in/og-default.jpg';
    const category = escape(p.category || 'Guide');
    const readTime = p.readTime || '5 min read';
    // Category colour mapping
    const catColors = {
      Insurance: '#0891b2', Finance: '#7c3aed', Education: '#2563eb',
      Travel: '#059669', Appliances: '#ea580c', Electronics: '#db2777',
      Health: '#dc2626', Cars: '#1d4ed8'
    };
    const catColor = catColors[category] || '#2563eb';
    return `
      <table cellpadding="0" cellspacing="0" border="0" style="width:100%;margin-bottom:18px">
        <tr><td style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden">
          <a href="${url}" style="text-decoration:none;color:inherit;display:block">
            <img src="${cover}" alt="${title}" width="560" style="width:100%;max-width:560px;height:auto;display:block;border:0">
            <div style="padding:18px 22px">
              <span style="display:inline-block;font-size:11px;font-weight:700;color:#fff;background:${catColor};padding:3px 10px;border-radius:4px;text-transform:uppercase;letter-spacing:.06em;margin-bottom:10px">${category}</span>
              <div style="font-family:-apple-system,'Helvetica Neue',sans-serif;font-size:18px;font-weight:700;color:#0f172a;line-height:1.35;margin-bottom:8px">${title}</div>
              <div style="color:#64748b;font-size:14px;line-height:1.6;margin-bottom:12px">${summary}${summary.length >= 180 ? '…' : ''}</div>
              <div style="color:#94a3b8;font-size:12px">📖 ${readTime} · #${i + 1} this week</div>
            </div>
          </a>
        </td></tr>
      </table>`;
  }).join('');

  return `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>WIB Weekly</title></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;-webkit-font-smoothing:antialiased">
<table cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f1f5f9">
  <tr><td align="center" style="padding:30px 16px">
    <table cellpadding="0" cellspacing="0" border="0" width="600" style="width:100%;max-width:600px">

      <!-- Logo/Header -->
      <tr><td style="padding:0 0 28px 0;text-align:center">
        <span style="font-family:'Outfit','Helvetica Neue',sans-serif;font-size:28px;font-weight:800;letter-spacing:-0.02em;background:linear-gradient(135deg,#2563eb,#9333ea);-webkit-background-clip:text;-webkit-text-fill-color:transparent;color:#2563eb">WIB Weekly</span>
        <div style="color:#64748b;font-size:13px;margin-top:4px">India's comparison digest · every Friday</div>
      </td></tr>

      <!-- Greeting -->
      <tr><td style="background:#fff;border-radius:14px;padding:28px 28px 8px;border:1px solid #e2e8f0">
        <h1 style="margin:0 0 10px;font-family:'Outfit','Helvetica Neue',sans-serif;font-size:24px;font-weight:700;color:#0f172a;letter-spacing:-0.02em">👋 This week's top guides</h1>
        <p style="margin:0 0 20px;color:#475569;font-size:15px;line-height:1.6">Hand-picked comparisons to help you decide better. Five guides, zero sponsored rankings.</p>
      </td></tr>

      <!-- Posts -->
      <tr><td style="padding:16px 0 0 0">
        ${postCards}
      </td></tr>

      <!-- Tools CTA -->
      <tr><td style="background:linear-gradient(135deg,#eff6ff,#faf5ff);border:1px solid #ddd6fe;border-radius:12px;padding:24px 26px;margin-top:8px">
        <div style="font-family:'Outfit','Helvetica Neue',sans-serif;font-size:16px;font-weight:700;color:#0f172a;margin-bottom:10px">🤖 Try our free tools</div>
        <div style="color:#475569;font-size:14px;line-height:1.7;margin-bottom:14px">Ask WIB AI any comparison question, or take our 3-question phone recommendation quiz.</div>
        <a href="https://wibest.in/compare/ai/?utm_source=newsletter&utm_campaign=weekly" style="display:inline-block;background:#2563eb;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600;margin-right:8px;margin-bottom:6px">Ask WIB AI →</a>
        <a href="https://wibest.in/quiz/?utm_source=newsletter&utm_campaign=weekly" style="display:inline-block;background:#fff;color:#2563eb;border:1px solid #2563eb;padding:10px 20px;border-radius:8px;text-decoration:none;font-size:14px;font-weight:600">Phone Quiz →</a>
      </td></tr>

      <!-- Footer -->
      <tr><td style="padding:32px 20px 20px;text-align:center">
        <div style="font-size:12px;color:#94a3b8;line-height:1.7">
          You got this because you subscribed at <a href="https://wibest.in" style="color:#64748b">wibest.in</a>.<br>
          <a href="https://wibest.in/unsubscribe/" style="color:#94a3b8;text-decoration:underline">Unsubscribe</a> ·
          <a href="https://wibest.in/privacy/" style="color:#94a3b8;text-decoration:underline">Privacy</a> ·
          <a href="https://wibest.in/contact/" style="color:#94a3b8;text-decoration:underline">Contact</a>
        </div>
      </td></tr>

    </table>
  </td></tr>
</table>
</body></html>`;
}

exports.sendWeeklyDigest = functions.pubsub
  .schedule('0 10 * * FRI')
  .timeZone('Asia/Kolkata')
  .onRun(async () => {
    const db = admin.firestore();

    // Pull subscribers (skip unsubscribed — guard against missing field too)
    const subsSnap = await db.collection('newsletter_subscribers').limit(5000).get();
    const emails = [];
    subsSnap.forEach(d => {
      const s = d.data();
      if (s.email && s.unsubscribed !== true) emails.push(s.email);
    });
    if (emails.length === 0) { console.log('No active subscribers; skipping digest.'); return null; }

    // Pull 5 most-recent blog posts
    const postsSnap = await db.collection('blog_posts')
      .orderBy('publishedAt', 'desc').limit(5).get();
    const posts = [];
    postsSnap.forEach(d => posts.push({ slug: d.id, ...d.data() }));
    if (posts.length === 0) { console.log('No posts to feature; skipping digest.'); return null; }

    const html = digestHtml(posts);
    const subject = `WIB Weekly: ${(posts[0].title || 'new guides this week').slice(0, 80)}`;
    const transport = createTransport();

    // Send in BCC batches of 80 (Zoho free tier: ~500/hr). Small delay between batches.
    let sent = 0, failed = 0;
    for (let i = 0; i < emails.length; i += 80) {
      const batch = emails.slice(i, i + 80);
      try {
        await transport.sendMail({
          from: `"WIB Weekly" <${senderEmail()}>`,
          to: senderEmail(),
          bcc: batch,
          subject,
          html
        });
        sent += batch.length;
      } catch (e) {
        console.error(`digest batch ${i / 80 + 1} failed:`, e.message);
        failed += batch.length;
      }
      // Respect Zoho rate limits
      if (i + 80 < emails.length) await new Promise(r => setTimeout(r, 1500));
    }
    console.log(`Weekly digest: ${sent} sent, ${failed} failed, ${emails.length} total subscribers.`);
    return null;
  });

// ── 7c. Unsubscribe endpoint (HTTPS) ─────────────────────────────────────────
// Called from /unsubscribe/ page. Flips `unsubscribed: true` for a subscriber.
exports.unsubscribe = functions.https.onRequest(async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).send('');
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const { email } = req.body || {};
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'valid email required' });
  }
  try {
    const db = admin.firestore();
    const snap = await db.collection('newsletter_subscribers')
      .where('email', '==', email.toLowerCase().trim())
      .limit(5).get();
    if (snap.empty) {
      // Don't reveal whether email is on list (anti-enumeration) — succeed silently
      return res.json({ ok: true });
    }
    const batch = db.batch();
    snap.forEach(doc => batch.update(doc.ref, {
      unsubscribed: true,
      unsubscribedAt: admin.firestore.FieldValue.serverTimestamp()
    }));
    await batch.commit();
    return res.json({ ok: true });
  } catch (e) {
    console.error('unsubscribe error:', e.message);
    return res.status(500).json({ error: 'internal error' });
  }
});

// ── Catalog cache: load wibest data files once per warm function instance ──
// Used by aiAnswer to inject real catalog entries into the prompt so the AI
// can quote actual hospital names, restaurant addresses, etc.
const _catalogCache = { hospitals: null, restaurants: null, fetchedAt: 0 };
const CATALOG_TTL = 6 * 60 * 60 * 1000; // 6 hours

async function loadCatalog() {
  const now = Date.now();
  if (_catalogCache.hospitals && (now - _catalogCache.fetchedAt) < CATALOG_TTL) {
    return _catalogCache;
  }
  try {
    const [hosp, rest] = await Promise.all([
      fetch('https://wibest.in/hospitals-data.js').then(r => r.text()).catch(() => null),
      fetch('https://wibest.in/restaurants-data.js').then(r => r.text()).catch(() => null),
    ]);
    // Parse: extract array literal from `window.WIB_HOSPITALS = [...]` and `window.WIB_RESTAURANTS = [...]`
    const parseArr = (txt, varname) => {
      if (!txt) return [];
      const m = txt.match(new RegExp('window\\.' + varname + '\\s*=\\s*(\\[[\\s\\S]*?\\n\\]\\s*;)'));
      if (!m) return [];
      try {
        // Wrap in IIFE to safely eval the array literal
        // eslint-disable-next-line no-new-func
        return Function('"use strict";return ' + m[1].replace(/;$/, ''))();
      } catch (e) { return []; }
    };
    _catalogCache.hospitals = parseArr(hosp, 'WIB_HOSPITALS');
    _catalogCache.restaurants = parseArr(rest, 'WIB_RESTAURANTS');
    _catalogCache.fetchedAt = now;
    console.log('Catalog loaded: ' + _catalogCache.hospitals.length + ' hospitals, ' + _catalogCache.restaurants.length + ' restaurants');
  } catch (e) {
    console.error('catalog load failed:', e.message);
  }
  return _catalogCache;
}

// Detect category + extract city/keyword tokens from a free-text query
function detectIntent(q) {
  const lower = q.toLowerCase();
  const cityList = ['delhi','mumbai','bangalore','bengaluru','chennai','hyderabad','pune','kolkata','ahmedabad','coimbatore','indore','jaipur','kochi','cochin','lucknow','chandigarh','visakhapatnam','vizag','gurugram','noida','navi mumbai','thane','pimpri-chinchwad'];
  const cityHit = cityList.find(c => lower.includes(c));
  const intent = {
    category: null,
    city: cityHit ? (cityHit === 'bengaluru' ? 'Bangalore' : cityHit === 'cochin' ? 'Kochi' : cityHit === 'vizag' ? 'Visakhapatnam' : cityHit.replace(/(^|\s)([a-z])/g, (_,a,b) => a + b.toUpperCase())) : null,
    keyword: null,
  };
  if (/\bhospital|cardiac|cardiology|oncology|cancer|neurolog|orthopedic|dental|maternity|paediatric|ivf|gynaec|kidney|liver transplant|nephrology|gastro/.test(lower)) {
    intent.category = 'hospital';
    const specMap = {
      cardiac: ['Cardiology','Cardiac Surgery','Cardiac Sciences'],
      cardiology: ['Cardiology','Cardiac Surgery','Cardiac Sciences'],
      oncology: ['Oncology','Surgical Oncology','Radiation Oncology'],
      cancer: ['Oncology','Surgical Oncology','Radiation Oncology'],
      neuro: ['Neurology','Neurosciences','Neurosurgery'],
      ortho: ['Orthopedics','Joint Replacement','Sports Medicine'],
      dental: ['Dental'],
      maternity: ['Maternity','Gynaecology','IVF'],
      paediatric: ['Paediatrics','Neonatology'],
      ivf: ['IVF','Gynaecology'],
      kidney: ['Kidney Transplant','Nephrology','Renal Sciences'],
      liver: ['Liver Transplant','Hepatology'],
      gastro: ['Gastroenterology','Hepatology'],
    };
    for (const k in specMap) if (lower.includes(k)) { intent.keyword = specMap[k]; break; }
  } else if (/\brestaurant|food|eat|dining|cuisine|biryani|cafe|brewery|kebab|seafood|street food|chettinad|gujarati|bengali|awadhi|italian|chinese|continental/.test(lower)) {
    intent.category = 'restaurant';
    const cuMap = {
      biryani: ['Biryani'],
      cafe: ['Cafe'],
      brewery: ['Brewery'],
      kebab: ['Kebabs','Mughlai'],
      seafood: ['Seafood','Coastal'],
      'street food': ['Street Food','Chaat'],
      chettinad: ['Chettinad'],
      gujarati: ['Gujarati'],
      bengali: ['Bengali'],
      awadhi: ['Awadhi','Mughlai'],
      italian: ['Italian'],
      chinese: ['Chinese','Asian'],
    };
    for (const k in cuMap) if (lower.includes(k)) { intent.keyword = cuMap[k]; break; }
  }
  return intent;
}

async function buildCatalogContext(query) {
  const intent = detectIntent(query);
  if (!intent.category) return '';
  const cat = await loadCatalog();
  let pool = [];
  // Compute relevant WIB landing pages to cite at the end of the answer
  const relatedPages = [];
  const cityLower = intent.city ? intent.city.toLowerCase() : '';
  if (intent.category === 'hospital') {
    pool = (cat.hospitals || []).filter(h => !intent.city || h.c === intent.city);
    if (intent.keyword) pool = pool.filter(h => (h.s||[]).some(s => intent.keyword.includes(s)));
    pool.sort((a,b) => (b.r||0) - (a.r||0));
    pool = pool.slice(0, 12);
    if (!pool.length) return '';
    const lines = pool.map(h => `- ${h.n} (${h.c}) — ${(h.s||[]).slice(0,3).join(', ')} — ★${h.r||'?'} — ${h.addr||''} — ${h.phone||''}`);
    if (cityLower) {
      relatedPages.push(`https://wibest.in/hospitals/${cityLower}/`);
      // Match keyword to known specialty pages
      const specMap = { cardiology:'best-cardiology', cardiac:'best-cardiology', oncology:'best-oncology', cancer:'best-oncology', neurology:'best-neurology', orthopedics:'best-orthopedics', orthopaedics:'best-orthopedics', gastroenterology:'best-gastroenterology', paediatrics:'best-paediatrics', pediatrics:'best-paediatrics', gynaecology:'best-gynaecology' };
      if (intent.keyword) {
        for (const k of intent.keyword) {
          const key = k.toLowerCase();
          for (const w in specMap) { if (key.includes(w)) { relatedPages.push(`https://wibest.in/hospitals/${cityLower}/${specMap[w]}/`); break; } }
        }
      }
    }
    const cite = relatedPages.length ? `\n\n[CITATION URLS — link to these in your "Related WIB pages" section at the end]\n${[...new Set(relatedPages)].join('\n')}` : '';
    return `\n\n[VERIFIED WIB HOSPITAL CATALOG — quote these by name when relevant${intent.city ? ' (filtered to ' + intent.city + ')' : ''}${intent.keyword ? ' (filtered to ' + intent.keyword.join('/') + ')' : ''}]\n` + lines.join('\n') + cite;
  }
  if (intent.category === 'restaurant') {
    pool = (cat.restaurants || []).filter(r => !intent.city || r.c === intent.city);
    if (intent.keyword) pool = pool.filter(r => (r.cu||[]).some(c => intent.keyword.includes(c)));
    pool.sort((a,b) => (b.r||0) - (a.r||0));
    pool = pool.slice(0, 12);
    if (!pool.length) return '';
    const lines = pool.map(r => {
      const budget = r.b===1?'budget':r.b===2?'mid':'premium';
      return `- ${r.n} (${r.c}) — ${(r.cu||[]).slice(0,3).join(', ')} — ★${r.r||'?'} — ${budget} — ${r.a||''}`;
    });
    if (cityLower) {
      relatedPages.push(`https://wibest.in/restaurants/${cityLower}/`);
      const cuMap = { biryani:'best-biryani', cafe:'best-cafes', cafes:'best-cafes', 'south indian':'best-south-indian', mughlai:'best-mughlai', seafood:'best-seafood', 'street food':'best-street-food', chinese:'best-chinese', bengali:'best-bengali', 'kebabs':'best-kebabs', awadhi:'best-awadhi', maharashtrian:'best-maharashtrian', rajasthani:'best-rajasthani', gujarati:'best-gujarati-thali', kerala:'best-kerala-food', chettinad:'best-chettinad', andhra:'best-andhra' };
      if (intent.keyword) {
        for (const k of intent.keyword) {
          const key = k.toLowerCase();
          for (const w in cuMap) { if (key.includes(w)) { relatedPages.push(`https://wibest.in/restaurants/${cityLower}/${cuMap[w]}/`); break; } }
        }
      }
    }
    const cite = relatedPages.length ? `\n\n[CITATION URLS — link to these in your "Related WIB pages" section at the end]\n${[...new Set(relatedPages)].join('\n')}` : '';
    return `\n\n[VERIFIED WIB RESTAURANT CATALOG — quote these by name when relevant${intent.city ? ' (filtered to ' + intent.city + ')' : ''}${intent.keyword ? ' (filtered to ' + intent.keyword.join('/') + ')' : ''}]\n` + lines.join('\n') + cite;
  }
  return '';
}

// ── 8. AI Compare proxy (Gemini) ─────────────────────────────────────────────
// Set GEMINI_API_KEY in functions/.env (or via Firebase secret manager)
exports.compareAI = functions
  .runWith({ minInstances: 1, memory: '512MB', timeoutSeconds: 30 })
  .https.onRequest(async (req, res) => {
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
  // 8000-char limit accommodates structured prompts from /decide/ quizzes
  // (template + answers + instructions easily reach 1500-2500 chars) and
  // longer comparison contexts, while still guarding against abuse.
  if (!query || typeof query !== 'string' || query.length > 8000) {
    return res.status(400).json({ error: 'query required (max 8000 chars)' });
  }

  // Inject today's date + a current-events snapshot so the model doesn't
  // claim recent products are "unreleased" (training cutoff is 1-2 years behind).
  const today = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });
  const currentContext = [
    `Today's date is ${today}.`,
    'Smartphones currently available in India: iPhone 17 / 17 Pro / 17 Pro Max (Sep 2025), iPhone 16 series, Samsung Galaxy S26 (Jan 2026), S25, OnePlus 13, Xiaomi 15, Vivo X200, Pixel 9.',
    'Cars on sale: Tata Nexon, Curvv, Harrier EV, Hyundai Creta 2026, Mahindra XUV700, Thar Roxx, BE 6, Maruti Grand Vitara, Toyota Innova Hycross, Kia Syros, MG Windsor EV.',
    'Treat anything the user asks about as available unless certain it is discontinued. Do NOT add disclaimers about release dates unless specifically asked.'
  ].join(' ');

  const system = `You are WIB AI — an expert comparison assistant for Indian consumers, covering EVERY category Indians shop or research, not just electronics.

You answer questions about:
- **Electronics**: smartphones, laptops, tablets, smartwatches, earbuds, TVs, appliances
- **Vehicles**: cars, bikes, scooters, EVs (specs, mileage, price, fuel type)
- **Education**: schools (CBSE/ICSE/IB/State Board), colleges (engineering, medical, MBA, arts), coaching, study abroad
- **Healthcare**: hospitals (by city, by speciality — cardiac, oncology, neurology, ortho, etc.), insurance, health checkups
- **Travel**: destinations, hotels, hill stations, weekend trips, beaches, religious sites, honeymoon
- **Finance**: loans (home, personal, education, car, gold), insurance (term, health, car, bike), mutual funds, tax saving, credit cards
- **Food**: restaurants by city and cuisine, dining recommendations
- **Lifestyle**: solar, EV charging, home appliances, kitchenware

${currentContext}

Style:
- Concise (under 300 words)
- India-specific: ₹ prices in INR, Indian brands, locality references (Bangalore, Mumbai, Delhi etc.), availability on Flipkart/Amazon.in/Practo/Zomato
- Use markdown: **bold** key terms, ## headings, bullet points
- Always end with a clear "**Recommendation:**" line
- If [CITATION URLS] are provided in catalog context, append a final "## Related WIB pages" section with those URLs as markdown links (label them readably, e.g., "Best Cardiology Hospitals in Bangalore"). Skip this section if no citation URLs.

If the user asks about something genuinely outside your scope (e.g. legal advice, medical diagnosis, stock picks), say so politely and redirect — but DO NOT decline questions about schools, hospitals, restaurants, colleges, travel destinations, insurance, or anything from the categories above. Those are core to your purpose.`;
  // Inject relevant entries from the WIB catalog (hospitals, restaurants) so the
  // AI can quote real names with addresses/phones/ratings instead of guessing.
  const catalogContext = await buildCatalogContext(items ? items.join(' ') + ' ' + query : query);

  const user = items
    ? `Compare these for an Indian buyer: ${items.join(' vs ')}\n\nUser context: ${query}${catalogContext}`
    : query + catalogContext;

  // Models in priority order — FASTEST first. Comparison answers don't need
  // deep reasoning, so flash-lite (≈1-2s) is a much better UX than flash (≈4-6s).
  const models = [
    { name: 'gemini-2.5-flash-lite',  retry: true  },
    { name: 'gemini-2.5-flash',       retry: true  },
    { name: 'gemini-flash-latest',    retry: false },
    { name: 'gemini-2.0-flash-lite',  retry: false },
    { name: 'gemini-2.0-flash',       retry: false },
  ];
  const errors = [];
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));

  async function callModel(model) {
    const apiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: system + '\n\n' + user }] }],
        // 2.5 models allocate "thinking" tokens from the output budget by default,
        // which was truncating replies to 1-2 sentences. Disable thinking for
        // comparison answers (they don't need chain-of-thought) and raise budget.
        generationConfig: {
          temperature: 0.4,
          maxOutputTokens: 2048,
          thinkingConfig: { thinkingBudget: 0 }
        }
      })
    });
    return apiRes.json();
  }

  function extractText(data) {
    const candidate = (data.candidates || [])[0];
    if (!candidate) return { error: 'no candidates returned (may be blocked)' };
    const text = candidate.content && candidate.content.parts && candidate.content.parts[0]
      && candidate.content.parts[0].text;
    if (!text) return { error: `candidate has no text (finishReason=${candidate.finishReason})` };
    return { text };
  }

  for (const { name: model, retry } of models) {
    try {
      let data = await callModel(model);

      // Retry once on transient overload (UNAVAILABLE / 503 / "high demand")
      if (data.error && retry) {
        const msg = (data.error.message || '').toLowerCase();
        const transient = data.error.status === 'UNAVAILABLE' || data.error.code === 503 || msg.includes('high demand') || msg.includes('overloaded');
        if (transient) {
          await sleep(1200);
          data = await callModel(model);
        }
      }

      if (data.error) {
        console.error(`Gemini ${model} error:`, JSON.stringify(data.error));
        errors.push(`${model}: ${data.error.message || JSON.stringify(data.error)}`);
        continue;
      }

      const { text, error: extractErr } = extractText(data);
      if (extractErr) { errors.push(`${model}: ${extractErr}`); continue; }

      // Log query to Firestore for content-planning analytics (non-blocking)
      try {
        admin.firestore().collection('ai_query_log').add({
          query: query.slice(0, 500),
          items: items || [],
          model,
          answeredAt: admin.firestore.FieldValue.serverTimestamp(),
          source: req.headers['referer'] || 'unknown',
        }).catch(() => {}); // ignore log failures
      } catch (e) {}

      // Success
      return res.json({ answer: text, model });
    } catch (e) {
      console.error(`compareAI fetch error (${model}):`, e.message);
      errors.push(`${model}: ${e.message}`);
    }
  }

  // All models failed — return ALL errors so we can diagnose
  return res.status(500).json({
    error: 'All Gemini models failed',
    details: errors,
    help: 'Check that Generative Language API is enabled on project wibest-449fe and the API key has no referrer restrictions.'
  });
});

// touch 2026-04-18T11:53:51Z — force redeploy after GEMINI_API_KEY secret added

// ── 9. EarnKaro Affiliate Link Converter ────────────────────────────────────
// Converts partner product URLs (Flipkart, Myntra, Ajio, Nykaa, etc.) into
// EarnKaro tracked affiliate URLs on the fly. Caches results in Firestore for
// 30 days to stay well under the 60/minute API rate limit.
//
// Client calls: POST /convertLink { url: "https://www.flipkart.com/..." }
//        → { affiliateUrl: "https://ekaro.in/..." } on success
//        → { affiliateUrl: <original> } on failure (graceful fallback)
exports.convertLink = functions
  .runWith({ memory: '256MB', timeoutSeconds: 15 })
  .https.onRequest(async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type');
    res.set('Access-Control-Max-Age', '3600');
    if (req.method === 'OPTIONS') return res.status(204).send('');
    if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

    const { url } = req.body || {};
    if (!url || typeof url !== 'string' || !/^https?:\/\//i.test(url)) {
      return res.status(400).json({ error: 'valid http(s) url required' });
    }

    const apiKey = process.env.EARNKARO_API_KEY;
    if (!apiKey) {
      // No key configured — return original URL so user still gets to the product
      console.warn('EARNKARO_API_KEY not set; returning original URL');
      return res.json({ affiliateUrl: url, fallback: true });
    }

    const db = admin.firestore();
    // Cache key — hash-ish of the URL (simple safe doc ID)
    const cacheKey = Buffer.from(url).toString('base64').replace(/[^A-Za-z0-9]/g, '').slice(0, 120);
    const cacheRef = db.collection('affiliate_link_cache').doc(cacheKey);

    // Try cache first
    try {
      const cached = await cacheRef.get();
      if (cached.exists) {
        const d = cached.data();
        const ageMs = Date.now() - (d.createdAt?.toMillis?.() || 0);
        // 30-day TTL
        if (d.affiliateUrl && ageMs < 30 * 24 * 60 * 60 * 1000) {
          return res.json({ affiliateUrl: d.affiliateUrl, cached: true });
        }
      }
    } catch (e) {
      console.warn('cache read failed:', e.message);
    }

    // Call EarnKaro API
    try {
      const ekRes = await fetch('https://ekaro-api.affiliaters.in/api/converter/public', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ deal: url, convert_option: 'convert_only' })
      });
      const data = await ekRes.json();

      if (data.success !== 1 || !data.data) {
        console.warn('EarnKaro API non-success:', JSON.stringify(data).slice(0, 200));
        return res.json({ affiliateUrl: url, fallback: true, reason: data.message || 'no data' });
      }

      // EK returns a full text block — extract the URL we sent (first http url in response)
      const match = String(data.data).match(/https?:\/\/[^\s"'<>]+/);
      const affiliateUrl = match ? match[0] : url;

      // Cache it (fire-and-forget; don't block response)
      cacheRef.set({
        affiliateUrl,
        originalUrl: url,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      }).catch(e => console.warn('cache write failed:', e.message));

      return res.json({ affiliateUrl, cached: false });
    } catch (e) {
      console.error('EarnKaro fetch error:', e.message);
      return res.json({ affiliateUrl: url, fallback: true, reason: e.message });
    }
  });
