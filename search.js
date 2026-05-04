/* Site-wide search overlay.
   Triggers: Ctrl/Cmd+K, "/", or click the .wib-search-trigger button.
   Searches window.WIB_SEARCH_INDEX (loaded via /search-index.js). */
(function(){
  'use strict';

  var STYLES =
    '.wib-search-trigger{display:inline-flex;align-items:center;gap:6px;padding:6px 10px;border-radius:8px;border:1px solid var(--border);background:var(--bg-card);color:var(--text-muted);font-family:inherit;font-size:13px;cursor:pointer;transition:all .15s}' +
    '.wib-search-trigger:hover{border-color:var(--accent);color:var(--accent)}' +
    '.wib-search-trigger kbd{background:var(--tag-bg);border-radius:4px;padding:1px 6px;font-size:11px;font-family:inherit;color:var(--text-muted);margin-left:6px}' +
    '.wib-overlay{position:fixed;inset:0;background:rgba(15,23,42,0.55);backdrop-filter:blur(4px);z-index:9999;display:flex;align-items:flex-start;justify-content:center;padding-top:80px;animation:wibFade .15s ease-out}' +
    '@keyframes wibFade{from{opacity:0}to{opacity:1}}' +
    '.wib-modal{width:min(560px,92vw);background:var(--bg-card);border:1px solid var(--border);border-radius:14px;box-shadow:0 24px 60px rgba(15,23,42,0.4);overflow:hidden;display:flex;flex-direction:column;max-height:70vh}' +
    '.wib-modal input{width:100%;padding:18px 22px;border:none;background:transparent;color:var(--text-primary);font-family:inherit;font-size:16px;border-bottom:1px solid var(--border)}' +
    '.wib-modal input:focus{outline:none}' +
    '.wib-results{overflow-y:auto;padding:8px 0}' +
    '.wib-r{display:flex;justify-content:space-between;align-items:center;padding:10px 22px;cursor:pointer;color:var(--text-primary);text-decoration:none;font-size:14px;border-left:3px solid transparent}' +
    '.wib-r:hover,.wib-r.active{background:var(--bg-secondary);border-left-color:var(--accent)}' +
    '.wib-r-cat{font-size:11px;color:var(--text-muted);font-weight:600;text-transform:uppercase;letter-spacing:0.05em}' +
    '.wib-empty{padding:28px 22px;text-align:center;color:var(--text-muted);font-size:14px}' +
    '.wib-foot{padding:10px 22px;border-top:1px solid var(--border);font-size:11px;color:var(--text-muted);display:flex;justify-content:space-between}' +
    '.wib-foot kbd{background:var(--tag-bg);border-radius:4px;padding:1px 6px;font-size:10px;margin:0 2px}';

  var INDEX = window.WIB_SEARCH_INDEX || [];
  var openOverlay, closeOverlay;
  var activeIdx = 0;
  var resultLinks = [];

  function injectStyles(){
    if (document.getElementById('wib-search-styles')) return;
    var s = document.createElement('style'); s.id='wib-search-styles'; s.textContent=STYLES;
    document.head.appendChild(s);
  }

  function score(query, label){
    label = label.toLowerCase();
    query = query.toLowerCase();
    if (label === query) return 1000;
    if (label.startsWith(query)) return 500;
    if (label.indexOf(' '+query) >= 0) return 300;  // word start
    if (label.indexOf(query) >= 0) return 100;
    // fuzzy: all chars in order
    var qi = 0;
    for (var i=0; i<label.length && qi<query.length; i++){
      if (label[i] === query[qi]) qi++;
    }
    return qi === query.length ? 50 - (label.length - query.length) : 0;
  }

  function search(q){
    if (!q.trim()) return [];
    q = q.trim();
    var ranked = [];
    for (var i=0; i<INDEX.length; i++){
      var sc = score(q, INDEX[i].l);
      if (sc > 0) ranked.push({e: INDEX[i], s: sc});
    }
    ranked.sort(function(a,b){return b.s - a.s;});
    return ranked.slice(0, 12).map(function(r){return r.e;});
  }

  function renderResults(query){
    var holder = document.getElementById('wib-results');
    if (!holder) return;
    var rows = search(query);
    activeIdx = 0;
    if (!rows.length){
      holder.innerHTML = '<div class="wib-empty">'+(query?'No matches':'Type to search across schools, hospitals, restaurants, blog...')+'</div>';
      resultLinks = [];
      return;
    }
    holder.innerHTML = rows.map(function(r,i){
      return '<a class="wib-r'+(i===0?' active':'')+'" href="'+r.u+'" data-idx="'+i+'"><span>'+r.l+'</span><span class="wib-r-cat">'+r.c+'</span></a>';
    }).join('');
    resultLinks = holder.querySelectorAll('.wib-r');
  }

  openOverlay = function(){
    injectStyles();
    if (document.getElementById('wib-overlay')) return;
    var ov = document.createElement('div');
    ov.id = 'wib-overlay'; ov.className = 'wib-overlay';
    ov.innerHTML =
      '<div class="wib-modal" onclick="event.stopPropagation()">' +
        '<input id="wib-search-input" type="search" placeholder="Search wibest.in..." autocomplete="off" autofocus>' +
        '<div class="wib-results" id="wib-results"></div>' +
        '<div class="wib-foot"><span><kbd>esc</kbd> close</span><span><kbd>↑</kbd><kbd>↓</kbd> navigate <kbd>↵</kbd> open</span></div>' +
      '</div>';
    ov.onclick = closeOverlay;
    document.body.appendChild(ov);
    var input = document.getElementById('wib-search-input');
    setTimeout(function(){ input && input.focus(); }, 50);
    renderResults('');
    input.oninput = function(){ renderResults(this.value); };
    input.onkeydown = function(ev){
      if (ev.key === 'Escape') { closeOverlay(); }
      else if (ev.key === 'ArrowDown') { ev.preventDefault(); moveActive(1); }
      else if (ev.key === 'ArrowUp') { ev.preventDefault(); moveActive(-1); }
      else if (ev.key === 'Enter') {
        ev.preventDefault();
        if (resultLinks.length) window.location.href = resultLinks[activeIdx].href;
      }
    };
  };

  closeOverlay = function(){
    var ov = document.getElementById('wib-overlay');
    if (ov) ov.remove();
  };

  function moveActive(d){
    if (!resultLinks.length) return;
    activeIdx = (activeIdx + d + resultLinks.length) % resultLinks.length;
    for (var i=0; i<resultLinks.length; i++){
      resultLinks[i].classList.toggle('active', i === activeIdx);
    }
    resultLinks[activeIdx].scrollIntoView({block:'nearest'});
  }

  // Global hotkeys
  document.addEventListener('keydown', function(ev){
    var inField = /input|textarea|select/i.test(ev.target.tagName) || ev.target.isContentEditable;
    if ((ev.metaKey || ev.ctrlKey) && (ev.key === 'k' || ev.key === 'K')) {
      ev.preventDefault(); openOverlay();
    } else if (ev.key === '/' && !inField) {
      ev.preventDefault(); openOverlay();
    }
  });

  // Make trigger button visible: components.js can call WIBSearch.attach(el)
  window.WIBSearch = {
    open: openOverlay,
    close: closeOverlay,
    attach: function(el){
      if (!el) return;
      el.classList.add('wib-search-trigger');
      el.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>Search<kbd>/</kbd>';
      el.onclick = openOverlay;
      injectStyles();
    },
    autoMount: function(){
      injectStyles();
      // find any element marked data-wib-search
      document.querySelectorAll('[data-wib-search]').forEach(function(el){ window.WIBSearch.attach(el); });
    }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', window.WIBSearch.autoMount);
  else window.WIBSearch.autoMount();
})();
