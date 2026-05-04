/* Renderer for /schools/[city]/[board]/ pages.
   Each page sets:
     window.WIB_SCH_CITY = "Bangalore"
     window.WIB_SCH_BOARD = "CBSE"
   Loads from Firestore (items collection where category='school'). */
(function(){
  'use strict';
  var CITY = window.WIB_SCH_CITY || '';
  var BOARD = (window.WIB_SCH_BOARD || '').toLowerCase();

  function esc(s){return String(s||'').replace(/[&<>"']/g, function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}

  function getBoard(s){
    return (s.board || s.type || s.board_type || s.curriculum || '').toLowerCase();
  }

  function boardMatch(s){
    if (!BOARD) return true;
    return getBoard(s).indexOf(BOARD) !== -1;
  }
  function cityMatch(s){
    if (!CITY) return true;
    return (s.city || '').toLowerCase() === CITY.toLowerCase();
  }

  async function load(){
    var grid = document.getElementById('schGrid');
    var stat = document.getElementById('schCount');
    if (!grid) return;
    grid.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-muted)">Loading top schools...</div>';

    try {
      if (typeof initFirebase !== 'function' || typeof firebase === 'undefined') {
        grid.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-muted)">Firebase init unavailable. <a href="/schools/" style="color:var(--accent)">Browse all schools</a></div>';
        return;
      }
      var db = initFirebase();
      var snap = await db.collection('items').where('category','==','school').get();
      var rows = [];
      snap.forEach(function(doc){ rows.push(Object.assign({id:doc.id}, doc.data())); });
      rows = rows.filter(cityMatch).filter(boardMatch).sort(function(a,b){return (b.rating||0)-(a.rating||0);});

      if (stat) stat.textContent = rows.length;

      if (!rows.length){
        grid.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-muted)">No '+esc(BOARD.toUpperCase())+' schools in our '+esc(CITY)+' dataset yet. <a href="/schools/" style="color:var(--accent)">Browse all schools</a></div>';
        return;
      }

      grid.innerHTML = rows.slice(0, 30).map(function(s, i){
        var r = s.rating ? '★ '+Number(s.rating).toFixed(1) : '';
        var board = s.board || s.type || '';
        var fees = s.fees ? '<span class="meta-tag">'+esc(s.fees)+'</span>' : '';
        var grade = s.grades || s.gradeRange ? '<span class="meta-tag">'+esc(s.grades||s.gradeRange)+'</span>' : '';
        var area = s.area || s.locality ? '<span class="meta-tag">'+esc(s.area||s.locality)+'</span>' : '';
        return '<div class="scard">'+
          '<div class="scard-rank">#'+(i+1)+'</div>'+
          '<div class="scard-top"><div class="scard-name">'+esc(s.name||'Unnamed')+'</div>'+(r?'<div class="scard-rating">'+r+'</div>':'')+'</div>'+
          '<div class="scard-meta">'+(board?'<span class="meta-tag board">'+esc(board)+'</span>':'')+area+grade+fees+'</div>'+
          (s.description?'<div class="scard-desc">'+esc(s.description).slice(0,200)+'</div>':'')+
          '<div class="scard-actions">'+
            (s.id?'<a href="/school-detail.html?id='+encodeURIComponent(s.id)+'" class="btn-detail">View Details</a>':'')+
            (s.website?'<a href="'+esc(s.website)+'" target="_blank" rel="noopener" class="btn-web">Website</a>':'')+
          '</div>'+
        '</div>';
      }).join('');
    } catch (err) {
      console.error(err);
      grid.innerHTML = '<div style="text-align:center;padding:40px;color:var(--text-muted)">Could not load schools right now. <a href="/schools/" style="color:var(--accent)">Try the main schools page &rsaquo;</a></div>';
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', load);
  else load();
})();
