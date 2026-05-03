/* Shared renderer for /restaurants/[city]/ pages.
   Each city page sets window.WIB_REST_CITY before this script runs.
   Filters WIB_RESTAURANTS by city and renders cards. */
(function(){
  'use strict';
  var ALL = window.WIB_RESTAURANTS || [];
  var CITY = window.WIB_REST_CITY || '';
  var rows = ALL.filter(function(r){ return r.c === CITY; });
  var filtered = rows.slice();

  function esc(s){return String(s||'').replace(/[&<>"']/g, function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}

  function init(){
    var stat = document.getElementById('cityCount');
    if (stat) stat.textContent = rows.length;
    // Build cuisine filter from this city's restaurants
    var cf = document.getElementById('cuisineFilter');
    if (cf) {
      var cuisines = Array.from(new Set(rows.flatMap(function(r){return r.cu||[]}))).sort();
      cuisines.forEach(function(cu){
        var o = document.createElement('option');
        o.value = cu; o.textContent = cu;
        cf.appendChild(o);
      });
    }
    apply();
    emitItemList();
  }

  function emitItemList(){
    if (!rows.length) return;
    var list = rows.slice(0,30).map(function(r,i){
      return {
        '@type':'ListItem','position': i+1,
        'item':{
          '@type':'Restaurant',
          'name': r.n,
          'address': {'@type':'PostalAddress','addressLocality': r.c, 'streetAddress': r.a, 'addressCountry':'IN'},
          'servesCuisine': r.cu,
          'priceRange': r.b===1?'$':r.b===2?'$$':'$$$',
          'aggregateRating': {'@type':'AggregateRating','ratingValue': r.r, 'bestRating':5, 'ratingCount':1}
        }
      };
    });
    var s = document.createElement('script');
    s.type = 'application/ld+json';
    s.text = JSON.stringify({'@context':'https://schema.org','@type':'ItemList','itemListElement': list});
    document.head.appendChild(s);
  }

  function apply(){
    var cuisine = (document.getElementById('cuisineFilter') || {}).value || '';
    var budget = (document.getElementById('budgetFilter') || {}).value || '';
    var search = ((document.getElementById('searchInput') || {}).value || '').toLowerCase().trim();
    filtered = rows.filter(function(r){
      if (cuisine && !(r.cu||[]).includes(cuisine)) return false;
      if (budget && String(r.b) !== budget) return false;
      if (search) {
        var hay = (r.n + ' ' + (r.cu||[]).join(' ') + ' ' + (r.a||'')).toLowerCase();
        if (hay.indexOf(search) === -1) return false;
      }
      return true;
    });
    render();
  }
  window.applyRest = apply;

  function reset(){
    ['cuisineFilter','budgetFilter','searchInput'].forEach(function(id){
      var el = document.getElementById(id); if (el) el.value = '';
    });
    apply();
  }
  window.resetRest = reset;

  function render(){
    var rc = document.getElementById('resultsCount');
    if (rc) rc.textContent = 'Showing ' + filtered.length + ' of ' + rows.length + ' restaurants';
    var grid = document.getElementById('restGrid');
    if (!grid) return;
    if (!filtered.length) {
      grid.innerHTML = '<div style="text-align:center;padding:60px;color:var(--text-muted)">No restaurants match your filters.</div>';
      return;
    }
    grid.innerHTML = filtered.map(function(r){
      var stars = '★'.repeat(Math.round(r.r)) + '☆'.repeat(5-Math.round(r.r));
      var budget = r.b===1?'₹':r.b===2?'₹₹':'₹₹₹';
      var zomato = 'https://www.zomato.com/' + (r.z || (r.n.toLowerCase().replace(/\s+/g,'-')+'-'+r.c.toLowerCase()));
      var swiggy = 'https://www.swiggy.com/search?query=' + encodeURIComponent(r.n + ' ' + r.c);
      var maps = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(r.n + ', ' + r.a + ', ' + r.c);
      var cuisines = (r.cu||[]).slice(0,3).map(function(c){return '<span class="cu-tag">'+esc(c)+'</span>'}).join('');
      return '<div class="rcard">'+
        '<div class="rcard-top"><div class="rcard-name">'+esc(r.n)+'</div><div class="rcard-rating">★ '+r.r+'</div></div>'+
        '<div class="rcard-meta">'+esc(r.a)+' · '+budget+'</div>'+
        '<div class="rcard-cuisines">'+cuisines+'</div>'+
        '<div class="rcard-actions">'+
          '<a href="'+zomato+'" target="_blank" rel="noopener" class="btn-zomato">Zomato</a>'+
          '<a href="'+swiggy+'" target="_blank" rel="noopener" class="btn-swiggy">Swiggy</a>'+
          '<a href="'+maps+'" target="_blank" rel="noopener" class="btn-map">Map</a>'+
        '</div>'+
      '</div>';
    }).join('');
    if (window.wibInitReveal) window.wibInitReveal();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
