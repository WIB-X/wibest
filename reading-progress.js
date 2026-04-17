/* Reading progress bar — auto-attaches to any page.
   Shows a thin accent bar at the top of the viewport that fills as the reader scrolls through the article. */
(function () {
  if (document.querySelector('.wib-progress')) return;
  var style = document.createElement('style');
  style.textContent = ''
    + '.wib-progress{position:fixed;top:0;left:0;height:3px;width:0;background:var(--accent,#2563eb);z-index:10001;transition:width .1s linear}'
    + '@media(prefers-reduced-motion:reduce){.wib-progress{transition:none}}';
  document.head.appendChild(style);

  var bar = document.createElement('div');
  bar.className = 'wib-progress';
  bar.setAttribute('aria-hidden', 'true');
  (document.body || document.documentElement).appendChild(bar);

  function update() {
    var h = document.documentElement;
    var total = (h.scrollHeight - h.clientHeight) || 1;
    var pct = Math.min(100, Math.max(0, (h.scrollTop / total) * 100));
    bar.style.width = pct + '%';
  }
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
