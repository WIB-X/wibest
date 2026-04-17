/* Shared meta helper — sets og:/twitter:/canonical tags dynamically.
   Usage:
     WIBMeta.apply({
       title: 'Page title',
       description: 'Page description',
       image: 'https://.../cover.jpg',
       url:   'https://wibest.in/blog/slug/',
       type:  'article'   // optional, default 'website'
     });
*/
(function(global){
  function upsert(tag, keyAttr, keyValue, contentAttr, contentValue){
    if(!contentValue) return;
    var sel = tag + '[' + keyAttr + '="' + keyValue + '"]';
    var el  = document.head.querySelector(sel);
    if(!el){
      el = document.createElement(tag);
      el.setAttribute(keyAttr, keyValue);
      document.head.appendChild(el);
    }
    el.setAttribute(contentAttr, contentValue);
  }
  function apply(opts){
    opts = opts || {};
    var title = opts.title || document.title;
    var desc  = opts.description || '';
    var image = opts.image || 'https://wibest.in/og-default.png';
    var url   = opts.url   || location.href;
    var type  = opts.type  || 'website';
    if(opts.title) document.title = title;
    upsert('meta', 'name',     'description',     'content', desc);
    upsert('meta', 'property', 'og:type',         'content', type);
    upsert('meta', 'property', 'og:title',        'content', title);
    upsert('meta', 'property', 'og:description',  'content', desc);
    upsert('meta', 'property', 'og:image',        'content', image);
    upsert('meta', 'property', 'og:url',          'content', url);
    upsert('meta', 'name',     'twitter:card',    'content', 'summary_large_image');
    upsert('meta', 'name',     'twitter:title',   'content', title);
    upsert('meta', 'name',     'twitter:description','content', desc);
    upsert('meta', 'name',     'twitter:image',   'content', image);
    // canonical
    var link = document.head.querySelector('link[rel="canonical"]');
    if(!link){ link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
    link.setAttribute('href', url);
  }
  global.WIBMeta = { apply: apply };
})(window);
