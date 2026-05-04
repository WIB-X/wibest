/* Renderer for /colleges/[city]/[stream]/ pages.
   Each page sets:
     window.WIB_COLL_CITY = "Bangalore"
     window.WIB_COLL_STREAM = "Engineering"  // matched against c.stream (case-insensitive partial)
   Loads from Firestore (items collection where category='college'). */
(function(){
  'use strict';
  var CITY = window.WIB_COLL_CITY || '';
  var STREAM = (window.WIB_COLL_STREAM || '').toLowerCase();

  function esc(s){return String(s||'').replace(/[&<>"']/g, function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}

  function streamMatch(c){
    if (!STREAM) return true;
    var s = (c.stream || '').toLowerCase();
    return s.indexOf(STREAM) !== -1;
  }

  function cityMatch(c){
    if (!CITY) return true;
    return (c.city || '').toLowerCase() === CITY.toLowerCase();
  }

  async function load(){
    var grid = document.getElementById('collGrid');
    var stat = document.getElementById('collCount');
    if (!grid) return;
    grid.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-muted)">Loading top colleges...</div>';

    try {
      if (typeof initFirebase !== 'function' || typeof firebase === 'undefined') {
        grid.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-muted)">Firebase init unavailable. <a href="/colleges/" style="color:var(--accent)">Browse all colleges</a></div>';
        return;
      }
      var db = initFirebase();
      var snap = await db.collection('items').where('category','==','college').get();
      var rows = [];
      snap.forEach(function(doc){ rows.push(Object.assign({id:doc.id}, doc.data())); });
      rows = rows.filter(cityMatch).filter(streamMatch).sort(function(a,b){return (b.rating||0)-(a.rating||0);});

      if (stat) stat.textContent = rows.length;

      if (!rows.length){
        grid.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-muted)">No '+esc(STREAM)+' colleges in our '+esc(CITY)+' dataset yet. <a href="/colleges/" style="color:var(--accent)">Browse all colleges</a></div>';
        return;
      }

      grid.innerHTML = rows.slice(0, 30).map(function(c, i){
        var r = c.rating ? '★ '+Number(c.rating).toFixed(1) : '';
        var fees = c.fees ? '<span class="meta-tag">'+esc(c.fees)+'</span>' : '';
        var type = c.type ? '<span class="meta-tag">'+esc(c.type)+'</span>' : '';
        var accred = c.accreditation ? '<span class="meta-tag">'+esc(c.accreditation)+'</span>' : '';
        var nirf = c.nirfRank ? '<span class="meta-tag">NIRF #'+esc(c.nirfRank)+'</span>' : '';
        return '<div class="ccard">'+
          '<div class="ccard-rank">#'+(i+1)+'</div>'+
          '<div class="ccard-top"><div class="ccard-name">'+esc(c.name||'Unnamed')+'</div>'+(r?'<div class="ccard-rating">'+r+'</div>':'')+'</div>'+
          '<div class="ccard-meta">'+nirf+type+fees+accred+'</div>'+
          (c.description?'<div class="ccard-desc">'+esc(c.description).slice(0,200)+'</div>':'')+
          '<div class="ccard-actions">'+
            (c.id?'<a href="/college-detail.html?id='+encodeURIComponent(c.id)+'" class="btn-detail">View Details</a>':'')+
            (c.website?'<a href="'+esc(c.website)+'" target="_blank" rel="noopener" class="btn-web">Website</a>':'')+
          '</div>'+
        '</div>';
      }).join('');
    } catch (err) {
      console.error(err);
      grid.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-muted)">Could not load colleges right now. <a href="/colleges/" style="color:var(--accent)">Try the main colleges page &rsaquo;</a></div>';
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', load);
  else load();
})();
