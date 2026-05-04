/* Renderer for /hospitals/[city]/[specialty]/ pages.
   Each page sets:
     window.WIB_HOSP_CITY = "Bangalore"
     window.WIB_HOSP_SPECS = ["Cardiology","Cardiac Sciences","Cardiac Surgery"]  // any-match
   Filters WIB_HOSPITALS, sorts by rating desc, renders cards. */
(function(){
  'use strict';
  var ALL = window.WIB_HOSPITALS || [];
  var CITY = window.WIB_HOSP_CITY || '';
  var SPECS = (window.WIB_HOSP_SPECS || []).map(function(s){return s.toLowerCase()});

  function matchSpec(h){
    if (!SPECS.length) return true;
    var hs = (h.s||[]).map(function(s){return s.toLowerCase()});
    return SPECS.some(function(s){
      return hs.some(function(x){ return x.indexOf(s) !== -1; });
    });
  }

  var rows = ALL
    .filter(function(h){ return h.c === CITY; })
    .filter(matchSpec)
    .sort(function(a,b){ return (b.r||0) - (a.r||0); });

  function esc(s){return String(s||'').replace(/[&<>"']/g, function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}

  function init(){
    var stat = document.getElementById('specCount');
    if (stat) stat.textContent = rows.length;
    render();
  }

  function render(){
    var grid = document.getElementById('hospGrid');
    if (!grid) return;
    if (!rows.length) {
      grid.innerHTML = '<div style="text-align:center;padding:60px;color:var(--text-muted)">No matches in our current dataset for this specialty in '+esc(CITY)+'. <a href="/hospitals/'+esc(CITY.toLowerCase())+'/" style="color:var(--accent)">Browse all hospitals in '+esc(CITY)+' &rsaquo;</a></div>';
      return;
    }
    grid.innerHTML = rows.map(function(h, i){
      var emer = h.er ? '<span class="emer-tag">24x7 Emergency</span>' : '';
      var maps = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(h.n + ', ' + (h.addr||'') + ', ' + h.c);
      var web = h.w ? '<a href="'+esc(h.w)+'" target="_blank" rel="noopener" class="btn-web">Website</a>' : '';
      var phone = h.phone ? '<a href="tel:'+esc(h.phone)+'" class="btn-phone">Call</a>' : '';
      var specs = (h.s||[]).slice(0,4).map(function(s){return '<span class="sp-tag">'+esc(s)+'</span>'}).join('');
      var compareData = JSON.stringify({n:h.n, c:'Hospital', city:h.c, r:h.r, tags:(h.s||[]).slice(0,2).join(', '), u:window.location.pathname});
      return '<div class="hcard">'+
        '<div class="hcard-rank">#'+(i+1)+'</div>'+
        '<button class="hcard-add" title="Add to compare list" data-compare-add=\''+compareData.replace(/'/g, '&#39;')+'\' style="position:absolute;top:14px;right:14px;width:28px;height:28px;border-radius:50%;background:var(--bg-secondary);border:1px solid var(--border);color:var(--text-muted);cursor:pointer;font-size:16px;line-height:1;display:flex;align-items:center;justify-content:center;transition:all .15s">+</button>'+
        '<div class="hcard-top" style="padding-right:36px"><div class="hcard-name">'+esc(h.n)+'</div><div class="hcard-rating">★ '+h.r+'</div></div>'+
        '<div class="hcard-meta">'+esc(h.t)+' · '+(h.b||0)+' beds · est. '+(h.e||'')+' · '+esc(h.a||'')+' '+emer+'</div>'+
        '<div class="hcard-addr">'+esc(h.addr||'')+'</div>'+
        '<div class="hcard-specs">'+specs+'</div>'+
        '<div class="hcard-actions">'+
          web+
          phone+
          '<a href="'+maps+'" target="_blank" rel="noopener" class="btn-map">Map</a>'+
        '</div>'+
      '</div>';
    }).join('');
    if (window.wibInitReveal) window.wibInitReveal();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
