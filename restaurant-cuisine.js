/* Renderer for /restaurants/[city]/[cuisine-list]/ landing pages.
   Each page sets:
     window.WIB_REST_CITY     = "Bangalore"
     window.WIB_REST_CUISINES = ["Biryani"]   // OR (one match qualifies)
     window.WIB_REST_NAME_RX  = /optional regex/
   Filters WIB_RESTAURANTS, sorts by rating desc, renders rich list. */
(function(){
  'use strict';
  var ALL = window.WIB_RESTAURANTS || [];
  var CITY = window.WIB_REST_CITY || '';
  var CUISINES = (window.WIB_REST_CUISINES || []).map(function(c){return c.toLowerCase()});
  var NAME_RX = window.WIB_REST_NAME_RX || null;

  function matchCuisine(r){
    if (!CUISINES.length) return true;
    var rc = (r.cu||[]).map(function(c){return c.toLowerCase()});
    return CUISINES.some(function(c){
      return rc.some(function(x){ return x.indexOf(c) !== -1; });
    });
  }
  function matchName(r){
    if (!NAME_RX) return false;
    return NAME_RX.test(r.n) || NAME_RX.test((r.cu||[]).join(' '));
  }

  var rows = ALL
    .filter(function(r){ return r.c === CITY; })
    .filter(function(r){ return matchCuisine(r) || matchName(r); })
    .sort(function(a,b){ return (b.r||0) - (a.r||0); });

  function esc(s){return String(s||'').replace(/[&<>"']/g, function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}

  function init(){
    var stat = document.getElementById('cuisineCount');
    if (stat) stat.textContent = rows.length;
    render();
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

  function render(){
    var grid = document.getElementById('restGrid');
    if (!grid) return;
    if (!rows.length) {
      grid.innerHTML = '<div style="text-align:center;padding:60px;color:var(--text-muted)">No matches in our current dataset for this city yet.</div>';
      return;
    }
    grid.innerHTML = rows.map(function(r, i){
      var budget = r.b===1?'₹':r.b===2?'₹₹':'₹₹₹';
      var zomato = 'https://www.zomato.com/' + (r.z || (r.n.toLowerCase().replace(/\s+/g,'-')+'-'+r.c.toLowerCase()));
      var swiggy = 'https://www.swiggy.com/search?query=' + encodeURIComponent(r.n + ' ' + r.c);
      var maps = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(r.n + ', ' + r.a + ', ' + r.c);
      var cuisines = (r.cu||[]).slice(0,4).map(function(c){return '<span class="cu-tag">'+esc(c)+'</span>'}).join('');
      return '<div class="rcard">'+
        '<div class="rcard-rank">#'+(i+1)+'</div>'+
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
