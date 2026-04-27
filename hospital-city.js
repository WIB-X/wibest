/**
 * Shared renderer for /hospitals/[city]/ landing pages.
 * Each city page sets window.WIB_CITY (and optionally WIB_CITY_ALSO for NCR-style merges)
 * before this script runs. Filters WIB_HOSPITALS by city and renders the same card layout
 * as the main listings page.
 */
(function(){
  'use strict';
  var H = window.WIB_HOSPITALS || [];
  var CATS = window.WIB_HOSPITAL_SPEC_CATEGORIES || {};
  var practoUrl = window.WIB_practoUrl || function(n,c){return '#'};
  var CITY = window.WIB_CITY || '';
  var ALSO = window.WIB_CITY_ALSO || []; // e.g. for Delhi: ['Gurugram','Faridabad']
  var allowedCities = [CITY].concat(ALSO);

  function esc(s){return String(s||'').replace(/[&<>"']/g, function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}

  var cityHospitals = H.filter(function(h){return allowedCities.indexOf(h.c) !== -1});
  var filtered = cityHospitals.slice();

  function init(){
    // Specialty filter (only specs that actually appear in this city's hospitals)
    var sf = document.getElementById('specFilter');
    if (sf) {
      Object.keys(CATS).forEach(function(cat){
        var existing = Array.from(new Set(cityHospitals.flatMap(function(h){return h.s||[]})));
        var members = CATS[cat].filter(function(s){return existing.indexOf(s) !== -1});
        if (!members.length) return;
        var og = document.createElement('optgroup');
        og.label = cat;
        var all = document.createElement('option');
        all.value = '__cat__' + cat;
        all.textContent = 'All ' + cat;
        og.appendChild(all);
        members.forEach(function(spec){
          var o = document.createElement('option');
          o.value = spec;
          o.textContent = '   ' + spec;
          og.appendChild(o);
        });
        sf.appendChild(og);
      });
    }

    var stat = document.getElementById('cityStatCount');
    if (stat) stat.textContent = cityHospitals.length;

    applyFilters();
    emitSchemaItemList(cityHospitals);
  }

  function emitSchemaItemList(items){
    if (!items || !items.length) return;
    var list = items.slice(0,25).map(function(it,i){
      var url = 'https://wibest.in/hospital-detail.html?name=' + encodeURIComponent(it.n||'') + '&city=' + encodeURIComponent(it.c||'');
      var h = {
        '@type':'Hospital',
        'name': it.n || '',
        'url': url,
        'address':{'@type':'PostalAddress','addressLocality': it.c || '','streetAddress': it.addr || '','addressCountry':'IN'}
      };
      if (it.phone) h.telephone = it.phone;
      if (it.s && it.s.length) h.medicalSpecialty = it.s;
      if (it.r) h.aggregateRating = {'@type':'AggregateRating','ratingValue': it.r,'bestRating':5,'ratingCount':1};
      return {'@type':'ListItem','position': i+1,'item': h};
    });
    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.text = JSON.stringify({'@context':'https://schema.org','@type':'ItemList','itemListElement': list});
    document.head.appendChild(s);
  }

  function applyFilters(){
    var sub = document.getElementById('subCityFilter');
    var subVal = sub ? sub.value : '';
    var specRaw = (document.getElementById('specFilter') || {}).value || '';
    var type = (document.getElementById('typeFilter') || {}).value || '';
    var sort = (document.getElementById('sortSelect') || {}).value || '';
    var search = ((document.getElementById('searchInput') || {}).value || '').toLowerCase().trim();

    var specMatch;
    if (!specRaw) specMatch = function(){return true};
    else if (specRaw.indexOf('__cat__') === 0) {
      var cat = specRaw.slice(7);
      var members = CATS[cat] || [];
      specMatch = function(h){return (h.s||[]).some(function(s){return members.indexOf(s) !== -1})};
    } else specMatch = function(h){return (h.s||[]).indexOf(specRaw) !== -1};

    filtered = cityHospitals.filter(function(h){
      if (subVal && h.c !== subVal) return false;
      if (!specMatch(h)) return false;
      if (type && h.t !== type) return false;
      if (search) {
        var hay = (h.n + ' ' + h.c + ' ' + (h.s||[]).join(' ') + ' ' + (h.addr||'')).toLowerCase();
        if (hay.indexOf(search) === -1) return false;
      }
      return true;
    });
    if (sort === 'rating-high') filtered.sort(function(a,b){return b.r-a.r});
    else if (sort === 'beds-high') filtered.sort(function(a,b){return b.b-a.b});
    else if (sort === 'name-az') filtered.sort(function(a,b){return a.n.localeCompare(b.n)});
    else if (sort === 'est-old') filtered.sort(function(a,b){return a.e-b.e});
    render();
  }
  window.applyFilters = applyFilters;

  function resetFilters(){
    ['subCityFilter','specFilter','typeFilter','sortSelect','searchInput'].forEach(function(id){
      var el = document.getElementById(id);
      if (el) el.value = '';
    });
    applyFilters();
  }
  window.resetFilters = resetFilters;

  function render(){
    var rc = document.getElementById('resultsCount');
    if (rc) rc.textContent = 'Showing ' + filtered.length + ' of ' + cityHospitals.length + ' hospitals';
    var grid = document.getElementById('hospGrid');
    if (!grid) return;
    if (!filtered.length) {
      grid.innerHTML = '<div class="no-results">No hospitals match your filters. Try changing your selection.</div>';
      return;
    }
    grid.innerHTML = filtered.map(function(h){
      var typeClass = h.t === 'Government' ? 'govt' : h.t === 'Private' ? 'pvt' : 'trust';
      var detailHref = '/hospital-detail.html?name=' + encodeURIComponent(h.n) + '&city=' + encodeURIComponent(h.c);
      var practo = practoUrl(h.n, h.c);
      var web = h.w && h.w !== '#' ? h.w : '';
      var specs = h.s.slice(0,4).map(function(s){return '<span class="spec-tag">' + esc(s) + '</span>'}).join('') +
                  (h.s.length > 4 ? '<span class="spec-tag">+' + (h.s.length-4) + ' more</span>' : '');
      var phone = h.phone ? '<a href="tel:' + esc(h.phone.replace(/[^+\d]/g,'')) + '" class="btn-secondary" style="font-size:12px;padding:10px;text-align:center" onclick="event.stopPropagation()">Call</a>' : '';
      var websiteBtn = web ? '<a href="' + esc(web) + '" target="_blank" rel="noopener" class="btn-secondary" style="font-size:12px;padding:10px;text-align:center" onclick="event.stopPropagation()">Website</a>' : '';
      return '<a class="hcard ' + typeClass + '" href="' + detailHref + '" style="display:block;text-decoration:none;color:inherit">' +
        '<div class="hcard-top"><div class="hcard-name">' + esc(h.n) + '</div><div class="hcard-rating">★ ' + h.r + '</div></div>' +
        '<div class="hcard-city">' + esc(h.c) + ' · ' + esc(h.t) + ' · Est. ' + h.e + '</div>' +
        '<div class="hcard-tags">' + specs + '</div>' +
        '<div class="hcard-details">' +
          '<div class="detail-item"><div class="detail-label">Beds</div><div class="detail-val">' + h.b.toLocaleString() + '</div></div>' +
          '<div class="detail-item"><div class="detail-label">Emergency</div><div class="detail-val">' + (h.er ? '✓ 24/7' : 'No') + '</div></div>' +
          '<div class="detail-item"><div class="detail-label">Accreditation</div><div class="detail-val">' + esc(h.a) + '</div></div>' +
          '<div class="detail-item"><div class="detail-label">Insurance</div><div class="detail-val">' + esc(h.i.slice(0,2).join(', ')) + '</div></div>' +
        '</div>' +
        '<div class="hcard-actions">' +
          '<a href="' + practo + '" target="_blank" rel="noopener" class="btn-primary" style="font-size:12px;padding:10px;text-align:center" onclick="event.stopPropagation()">Find on Practo</a>' +
          (phone || websiteBtn) +
        '</div>' +
      '</a>';
    }).join('');
    if (window.wibInitReveal) window.wibInitReveal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
