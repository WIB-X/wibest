/* WIB Related Cities widget — auto-injects 4 related city links at the bottom of city pages.
   Usage: include <script src="/related-cities.js" defer></script> on any /hospitals/<city>/ or /restaurants/<city>/ page.
   Reads the current city slug from URL, picks 4 related cities by tier + region, renders the widget. */
(function () {
  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // City metadata — tier + region for "related" suggestions
  const CITIES = {
    // Top metros
    'delhi':         {tier:'metro', region:'north',     name:'Delhi'},
    'mumbai':        {tier:'metro', region:'west',      name:'Mumbai'},
    'bangalore':     {tier:'metro', region:'south',     name:'Bangalore'},
    'chennai':       {tier:'metro', region:'south',     name:'Chennai'},
    'hyderabad':     {tier:'metro', region:'south',     name:'Hyderabad'},
    'kolkata':       {tier:'metro', region:'east',      name:'Kolkata'},
    'pune':          {tier:'metro', region:'west',      name:'Pune'},
    'ahmedabad':     {tier:'metro', region:'west',      name:'Ahmedabad'},
    // NCR & metro extensions
    'gurugram':      {tier:'ncr',   region:'north',     name:'Gurugram'},
    'noida':         {tier:'ncr',   region:'north',     name:'Noida'},
    'faridabad':     {tier:'ncr',   region:'north',     name:'Faridabad'},
    'navi-mumbai':   {tier:'ncr',   region:'west',      name:'Navi Mumbai'},
    'pimpri-chinchwad':{tier:'ncr', region:'west',      name:'Pimpri-Chinchwad'},
    // Tier-2
    'jaipur':        {tier:'tier2', region:'north',     name:'Jaipur'},
    'lucknow':       {tier:'tier2', region:'north',     name:'Lucknow'},
    'chandigarh':    {tier:'tier2', region:'north',     name:'Chandigarh'},
    'dehradun':      {tier:'tier2', region:'north',     name:'Dehradun'},
    'kochi':         {tier:'tier2', region:'south',     name:'Kochi'},
    'coimbatore':    {tier:'tier2', region:'south',     name:'Coimbatore'},
    'trivandrum':    {tier:'tier2', region:'south',     name:'Trivandrum'},
    'indore':        {tier:'tier2', region:'central',   name:'Indore'},
    'visakhapatnam': {tier:'tier2', region:'south',     name:'Visakhapatnam'},
    'surat':         {tier:'tier2', region:'west',      name:'Surat'},
    // Tier-3
    'bhopal':        {tier:'tier3', region:'central',   name:'Bhopal'},
    'nagpur':        {tier:'tier3', region:'central',   name:'Nagpur'},
    'mysore':        {tier:'tier3', region:'south',     name:'Mysore'},
    'vadodara':      {tier:'tier3', region:'west',      name:'Vadodara'},
    'patna':         {tier:'tier3', region:'east',      name:'Patna'},
    'mangalore':     {tier:'tier3', region:'south',     name:'Mangalore'},
    'trichy':        {tier:'tier3', region:'south',     name:'Trichy'},
    'bhubaneswar':   {tier:'tier3', region:'east',      name:'Bhubaneswar'},
    'guwahati':      {tier:'tier3', region:'northeast', name:'Guwahati'},
    'ranchi':        {tier:'tier3', region:'east',      name:'Ranchi'},
    'raipur':        {tier:'tier3', region:'central',   name:'Raipur'},
    'madurai':       {tier:'tier3', region:'south',     name:'Madurai'},
    'vellore':       {tier:'tier3', region:'south',     name:'Vellore'},
  };

  function init() {
    // Detect current city + vertical from URL
    const m = window.location.pathname.match(/^\/(hospitals|restaurants)\/([a-z-]+)\/?$/);
    if (!m) return; // not a city index page
    const vertical = m[1];
    const slug = m[2];
    const current = CITIES[slug];
    if (!current) return;

    // Find 4 related cities: prefer same region, fallback to same tier, fallback to anything
    const others = Object.entries(CITIES).filter(([s, c]) => s !== slug);
    const sameRegion = others.filter(([s, c]) => c.region === current.region);
    const sameTier = others.filter(([s, c]) => c.tier === current.tier && c.region !== current.region);

    // Pick: top 2 same region + top 2 same tier (different region) + fillers
    const picks = [];
    sameRegion.slice(0, 2).forEach(p => picks.push(p));
    sameTier.slice(0, 2).forEach(p => picks.push(p));
    // Fill to 4
    while (picks.length < 4 && others.length > picks.length) {
      const next = others.find(([s]) => !picks.find(([ps]) => ps === s));
      if (next) picks.push(next); else break;
    }
    if (picks.length === 0) return;

    // Render
    const labelMap = { hospitals: 'Hospitals', restaurants: 'Restaurants' };
    const wrap = document.createElement('section');
    wrap.className = 'wib-related-cities';
    wrap.setAttribute('aria-label', 'Related cities');
    wrap.innerHTML =
      '<style>' +
      '.wib-related-cities{max-width:1200px;margin:8px auto 32px;padding:24px;background:var(--bg-card);border:1px solid var(--border);border-radius:12px}' +
      '.wib-related-cities h3{font-family:Outfit,sans-serif;font-size:14px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted);margin:0 0 14px}' +
      '.wib-related-cities .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px}' +
      '.wib-related-cities a{display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:var(--bg-secondary);border:1px solid var(--border);border-radius:8px;font-size:14px;font-weight:600;color:var(--text-primary);text-decoration:none;transition:all .15s}' +
      '.wib-related-cities a:hover{background:var(--accent);color:#fff;border-color:var(--accent);transform:translateX(2px)}' +
      '.wib-related-cities a .arr{font-size:12px;opacity:.6}' +
      '.wib-related-cities .all{display:inline-block;margin-top:14px;font-size:13px;color:var(--accent);font-weight:600;text-decoration:none}' +
      '</style>' +
      '<h3>More ' + labelMap[vertical] + ' by city</h3>' +
      '<div class="grid">' +
      picks.map(([s, c]) => '<a href="/' + vertical + '/' + s + '/">' + c.name + ' <span class="arr">→</span></a>').join('') +
      '</div>' +
      '<a class="all" href="/cities/">Browse all 36 cities →</a>';

    // Inject before footer placeholder, fallback to body end
    const footer = document.getElementById('wib-footer-placeholder');
    if (footer) {
      footer.parentNode.insertBefore(wrap, footer);
    } else {
      document.body.appendChild(wrap);
    }
  }
})();
