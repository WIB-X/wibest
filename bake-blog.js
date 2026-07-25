/**
 * bake-blog.js
 * Injects static article HTML into each blog post HTML shell.
 * This makes content visible to crawlers (Google AdSense, Googlebot)
 * without needing JavaScript or Firebase to execute.
 *
 * Run: node bake-blog.js
 */

const fs = require('fs');
const path = require('path');

// ── 1. Load all seed data files into BLOG_POSTS ──────────────────────────────
const BLOG_POSTS = {};

const seedFiles = [
  'seed-data-expansion.js',
  'seed-data-expansion-2.js',
  'seed-data-expansion-3.js',
  'seed-data-batch4a-summer.js',
  'seed-data-batch4b-education.js',
  'seed-data-batch4c-tax.js',
  'seed-data-batch4d-hillstations.js',
  'seed-blog/data-blogs-expansion.js',
  'seed-data-blog-neet.js', // override best-coaching-neet-india with refreshed content (must load last)
];

for (const file of seedFiles) {
  try {
    const code = fs.readFileSync(file, 'utf8');
    // Execute in a context where BLOG_POSTS is available
    const fn = new Function('BLOG_POSTS', code + '\n//# sourceURL=' + file);
    fn(BLOG_POSTS);
    console.log(`✓ Loaded ${file}`);
  } catch (e) {
    console.warn(`⚠ Could not load ${file}: ${e.message}`);
  }
}

const total = Object.keys(BLOG_POSTS).length;
console.log(`\nLoaded ${total} blog posts from seed data.\n`);

// ── 2. Helpers ────────────────────────────────────────────────────────────────
function escHtml(str) {
  return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function calcReadTime(html) {
  const words = (html || '').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function buildTOC(html) {
  const headings = [];
  const re = /<h([23])[^>]*>(.*?)<\/h[23]>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const level = m[1];
    const text = m[2].replace(/<[^>]+>/g, '').trim();
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    headings.push({ level, text, id });
  }
  if (headings.length < 2) return { toc: '', html };

  // Inject IDs into headings
  let htmlWithIds = html.replace(/<h([23])([^>]*)>(.*?)<\/h[23]>/gi, (full, level, attrs, inner) => {
    const text = inner.replace(/<[^>]+>/g, '').trim();
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return `<h${level}${attrs} id="${id}">${inner}</h${level}>`;
  });

  const tocHtml = `<nav class="toc" aria-label="Table of Contents">
  <div class="toc-title">Contents</div>
  <ul>${headings.map(h =>
    `<li class="${h.level === '3' ? 'toc-sub' : ''}"><a href="#${h.id}">${escHtml(h.text)}</a></li>`
  ).join('')}</ul>
</nav>`;

  return { toc: tocHtml, html: htmlWithIds };
}

function buildStaticArticleHTML(slug, p) {
  const title = p.title || slug;
  const rawContent = p.content || p.body || '';
  const summary = p.summary || p.description || '';
  const category = p.category || 'Guide';
  const author = p.author || 'WIB Editorial';
  const date = p.date || '';
  const coverImage = p.coverImage || p.cover_image || '';
  const readTime = calcReadTime(rawContent);
  const { toc, html: contentWithIds } = buildTOC(rawContent);

  // Build FAQ section from p.faq if present
  let faqHtml = '';
  if (p.faq && p.faq.length >= 2) {
    faqHtml = `<section class="faq-block" style="margin-top:36px;padding:24px 28px;background:var(--bg-card);border:1px solid var(--border);border-radius:12px">
  <h2 style="font-family:Outfit,sans-serif;font-size:20px;font-weight:700;margin:0 0 16px">Frequently asked questions</h2>
  ${p.faq.map(f => `<details class="faq-item" style="border-bottom:1px solid var(--border);padding:14px 0">
    <summary style="font-weight:600;cursor:pointer;list-style:none">${escHtml(f.q)}</summary>
    <p style="margin:10px 0 0;color:var(--text-secondary);font-size:14.5px;line-height:1.7">${f.a}</p>
  </details>`).join('')}
</section>`;
  }

  return `<div class="breadcrumb"><a href="/blog">Blog</a> &rsaquo; ${escHtml(title)}</div>
${coverImage ? `<img src="${escHtml(coverImage)}" alt="${escHtml(title)}" loading="lazy" style="width:100%;aspect-ratio:16/9;object-fit:cover;max-height:320px;border-radius:12px;margin-bottom:24px">` : ''}
<div class="article-category">${escHtml(category)}</div>
<h1>${escHtml(title)}</h1>
<div class="article-meta">
  <span>&#9201; ${readTime} min read</span>
  ${date ? `<span>&#128197; ${escHtml(date)}</span>` : ''}
  <span>By ${escHtml(author)}</span>
</div>
${summary ? `<p class="article-summary" style="font-size:16px;color:var(--text-secondary);line-height:1.7;margin-bottom:24px;padding-bottom:20px;border-bottom:1px solid var(--border)">${escHtml(summary)}</p>` : ''}
${toc}
<div class="article-body">${contentWithIds}</div>
${faqHtml}
<div class="article-footer" style="margin-top:40px;padding-top:24px;border-top:1px solid var(--border)">
  <a href="/blog" style="display:inline-block;padding:10px 20px;border:1px solid var(--border);border-radius:8px;font-size:13px;text-decoration:none;color:var(--text-primary)">&larr; Back to Blog</a>
</div>`;
}

// ── 3. Inject into each HTML file ─────────────────────────────────────────────
let updated = 0, skipped = 0, missing = 0;

for (const [slug, p] of Object.entries(BLOG_POSTS)) {
  const htmlPath = path.join('blog', slug, 'index.html');

  if (!fs.existsSync(htmlPath)) {
    console.log(`  — No HTML for: ${slug}`);
    missing++;
    continue;
  }

  let html = fs.readFileSync(htmlPath, 'utf8');

  // Check if already baked (has a static-bake marker)
  if (html.includes('data-static-baked="true"')) {
    skipped++;
    continue;
  }

  // Build the static content
  const staticContent = buildStaticArticleHTML(slug, p);

  // Replace the skeleton placeholder in the articleContent div
  // The div looks like: <div class="article" id="articleContent">...skeleton...</div>
  const skeletonRe = /(<div[^>]+id="articleContent"[^>]*>)([\s\S]*?)(<\/div>)(?=\s*<script)/;
  const newDiv = `<div class="article" id="articleContent" data-static-baked="true">\n${staticContent}\n</div>`;

  if (skeletonRe.test(html)) {
    html = html.replace(skeletonRe, newDiv);
  } else {
    // Fallback: inject after <div class="article" id="articleContent">
    const divStart = html.indexOf('<div class="article" id="articleContent">');
    if (divStart === -1) {
      console.log(`  ⚠ Could not find articleContent in: ${slug}`);
      missing++;
      continue;
    }
    const afterDiv = divStart + '<div class="article" id="articleContent">'.length;
    // Find the matching closing </div>
    html = html.slice(0, divStart) + newDiv + html.slice(html.indexOf('</div>', afterDiv) + 6);
  }

  // Also inject static JSON-LD for the article schema (helps Google understand content)
  const jsonLd = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": p.title || slug,
    "description": p.summary || p.description || '',
    "author": { "@type": "Organization", "name": "WIB Editorial" },
    "publisher": { "@type": "Organization", "name": "WIB", "url": "https://wibest.in" },
    "datePublished": p.date || "2025-01-01",
    "dateModified": p.date || "2026-06-06",
    "url": `https://wibest.in/blog/${slug}/`,
    "mainEntityOfPage": `https://wibest.in/blog/${slug}/`
  });

  // Inject before </head>
  if (!html.includes('"@type":"Article"') && !html.includes('"@type": "Article"')) {
    html = html.replace('</head>', `<script type="application/ld+json">${jsonLd}</script>\n</head>`);
  }

  // Also inject FAQ schema statically if faq data exists
  if (p.faq && p.faq.length >= 2) {
    const faqJsonLd = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": p.faq.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a }
      }))
    });
    if (!html.includes('"FAQPage"')) {
      html = html.replace('</head>', `<script type="application/ld+json">${faqJsonLd}</script>\n</head>`);
    }
  }

  fs.writeFileSync(htmlPath, html, 'utf8');
  updated++;
  console.log(`  ✓ Baked: ${slug}`);
}

console.log(`\n✅ Done. Updated: ${updated} | Skipped (already baked): ${skipped} | Missing HTML: ${missing}`);
