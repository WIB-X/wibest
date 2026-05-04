/* WIB compare cart.
   - Holds up to 4 items in localStorage.
   - Renders a floating bottom-right button "Compare (n)".
   - Clicking opens /compare-cart/ which renders the saved items.
   - To add: any element with data-compare-add="JSON_STRING" triggers add on click.
     The JSON_STRING should be a stringified object with at least {n, c, u} (name, category, url). */
(function(){
  'use strict';
  var KEY = 'wib_compare_cart_v1';
  var MAX = 4;

  function load(){
    try { return JSON.parse(localStorage.getItem(KEY) || '[]'); } catch(e){ return []; }
  }
  function save(arr){ try { localStorage.setItem(KEY, JSON.stringify(arr)); } catch(e){} }

  function add(item){
    if (!item || !item.n) return false;
    var cart = load();
    if (cart.some(function(x){return x.n === item.n && x.u === item.u;})) return 'duplicate';
    if (cart.length >= MAX) return 'full';
    cart.push(item); save(cart); render(); pulse();
    try { if (window.gtag) gtag('event','compare_add',{item:item.n,category:item.c||''}); } catch(e){}
    return true;
  }
  function remove(idx){
    var cart = load(); cart.splice(idx,1); save(cart); render();
  }
  function clear(){ save([]); render(); }

  var STYLES =
    '.wib-cmp-btn{position:fixed;bottom:20px;right:20px;z-index:998;display:flex;align-items:center;gap:8px;padding:12px 20px;border-radius:30px;background:var(--accent);color:#fff;font-family:Outfit,sans-serif;font-weight:700;font-size:14px;box-shadow:0 8px 24px rgba(37,99,235,0.4);cursor:pointer;border:none;transition:all .25s;text-decoration:none}' +
    '.wib-cmp-btn:hover{transform:translateY(-2px);box-shadow:0 12px 32px rgba(37,99,235,0.5)}' +
    '.wib-cmp-btn.pulse{animation:wibCmpPulse .5s ease-out}' +
    '@keyframes wibCmpPulse{0%{transform:scale(1)}50%{transform:scale(1.12)}100%{transform:scale(1)}}' +
    '.wib-cmp-btn .badge{background:#fff;color:var(--accent);border-radius:20px;padding:2px 8px;font-size:12px;font-weight:800;min-width:20px;text-align:center}' +
    '.wib-cmp-toast{position:fixed;bottom:80px;right:20px;z-index:998;background:#16a34a;color:#fff;padding:10px 18px;border-radius:8px;font-size:13px;font-weight:600;box-shadow:0 6px 16px rgba(22,163,74,0.3);opacity:0;transition:opacity .25s;pointer-events:none}' +
    '.wib-cmp-toast.show{opacity:1}' +
    '@media(max-width:480px){.wib-cmp-btn{bottom:72px;right:12px;padding:10px 16px;font-size:13px}}';

  function injectStyles(){
    if (document.getElementById('wib-cmp-styles')) return;
    var s = document.createElement('style'); s.id='wib-cmp-styles'; s.textContent=STYLES;
    document.head.appendChild(s);
  }

  function render(){
    injectStyles();
    var cart = load();
    var existing = document.getElementById('wib-cmp-btn');
    if (!cart.length) { if (existing) existing.remove(); return; }
    if (!existing) {
      existing = document.createElement('a');
      existing.id = 'wib-cmp-btn';
      existing.className = 'wib-cmp-btn';
      existing.href = '/compare-cart/';
      existing.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>Compare <span class="badge" id="wib-cmp-count">' + cart.length + '</span>';
      document.body.appendChild(existing);
    } else {
      var c = document.getElementById('wib-cmp-count');
      if (c) c.textContent = cart.length;
    }
  }
  function pulse(){
    var el = document.getElementById('wib-cmp-btn');
    if (!el) return;
    el.classList.add('pulse');
    setTimeout(function(){ el.classList.remove('pulse'); }, 600);
    var t = document.createElement('div');
    t.className = 'wib-cmp-toast';
    t.textContent = 'Added to compare';
    document.body.appendChild(t);
    setTimeout(function(){ t.classList.add('show'); }, 10);
    setTimeout(function(){ t.classList.remove('show'); setTimeout(function(){t.remove();},300); }, 1800);
  }

  // Delegate click handler
  document.addEventListener('click', function(ev){
    var el = ev.target.closest('[data-compare-add]');
    if (!el) return;
    ev.preventDefault();
    try {
      var item = JSON.parse(el.getAttribute('data-compare-add'));
      var r = add(item);
      if (r === 'duplicate') { alert('This item is already in your compare list.'); }
      else if (r === 'full') { alert('Compare list is full (max ' + MAX + '). Remove one before adding more.'); }
    } catch(e){ console.error('Bad data-compare-add JSON', e); }
  });

  window.WIBCompare = {
    add: add, remove: remove, clear: clear, load: load,
    count: function(){ return load().length; },
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
  else render();
})();
