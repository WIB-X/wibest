/* WIB AI Chat Widget v2 - Powered by Claude API
 * 
 * SETUP: Change WORKER_URL below to your Cloudflare Worker URL
 * Example: https://wib-chat.youraccount.workers.dev
 * 
 * If WORKER_URL is empty or the API is down, falls back to keyword matching.
 */
(function(){

// ====== CHANGE THIS to your Cloudflare Worker URL ======
var WORKER_URL = ''; // e.g. 'https://wib-chat.youraccount.workers.dev'
// =======================================================

var AFF='wib04-21';
var conversationHistory = [];
var isAIMode = WORKER_URL.length > 0;

// Keyword-based fallback (same as before but enhanced)
var BLOGS=[
{k:['phone','under','15000','15k'],t:'Best Phones Under 15000',u:'/blog/best-phone-under-15000-india/'},
{k:['phone','under','20000','20k'],t:'Best Phones Under 20000',u:'/blog/best-phone-under-20000-india/'},
{k:['phone','under','30000','30k'],t:'Best Phones Under 30000',u:'/blog/best-phone-under-30000-india/'},
{k:['phone','under','10000','10k'],t:'Best Phones Under 10000',u:'/blog/best-phone-under-10000-india/'},
{k:['laptop','under','50000','50k'],t:'Best Laptops Under 50000',u:'/blog/best-laptop-under-50000-india/'},
{k:['laptop','under','80000','80k'],t:'Best Laptops Under 80000',u:'/blog/best-laptop-under-80000-india/'},
{k:['surface','pro','microsoft'],t:'Surface Pro vs Surface Laptop',u:'/blog/surface-pro-vs-surface-laptop/'},
{k:['macbook','dell','xps'],t:'MacBook Air vs Dell XPS',u:'/blog/macbook-air-vs-dell-xps-india/'},
{k:['iphone','samsung','s25'],t:'iPhone 16 vs Samsung S25',u:'/blog/iphone-16-vs-samsung-s25/'},
{k:['samsung','iphone','which better','vs apple'],t:'Samsung vs iPhone',u:'/blog/samsung-vs-iphone-which-is-better/'},
{k:['earbuds','tws','wireless earphone'],t:'Best Earbuds Under 2000',u:'/blog/best-earbuds-under-2000-india/'},
{k:['charger','gan','fast charge'],t:'Best GaN Chargers',u:'/blog/best-gan-charger-india/'},
{k:['smartwatch','watch','fitness'],t:'Best Smartwatches',u:'/blog/best-smartwatch-india/'},
{k:['power bank','powerbank'],t:'Best Power Banks',u:'/blog/best-power-bank-india/'},
{k:['monitor','wfh','work from home'],t:'Best WFH Monitors',u:'/blog/best-monitor-work-from-home-india/'},
{k:['mouse','wireless mouse'],t:'Best Wireless Mouse',u:'/blog/best-wireless-mouse-india/'},
{k:['tv','television','smart tv'],t:'Best TVs Under 30000',u:'/blog/best-tv-under-30000-india/'},
{k:['cbse','icse','board','which board'],t:'CBSE vs ICSE Guide',u:'/blog/cbse-vs-icse-which-is-better/'},
{k:['school fee','fees','cost school'],t:'School Fees Guide',u:'/blog/school-fees-india-guide/'},
{k:['ooty','kodaikanal','hill station'],t:'Ooty vs Kodaikanal',u:'/blog/ooty-vs-kodaikanal-which-is-better/'},
{k:['weekend','chennai','trip chennai'],t:'Weekend Trips Chennai',u:'/blog/weekend-trips-from-chennai/'},
{k:['weekend','bangalore','trip bangalore'],t:'Weekend Trips Bangalore',u:'/blog/weekend-trips-from-bangalore/'},
{k:['weekend','delhi','trip delhi'],t:'Weekend Trips Delhi',u:'/blog/weekend-trips-from-delhi/'},
{k:['weekend','mumbai','trip mumbai'],t:'Weekend Trips Mumbai',u:'/blog/weekend-trips-from-mumbai/'},
{k:['weekend','hyderabad','trip hyderabad'],t:'Weekend Trips Hyderabad',u:'/blog/weekend-trips-from-hyderabad/'},
{k:['goa','beach','party'],t:'Goa Travel Guide',u:'/blog/goa-travel-guide/'},
{k:['ladakh','leh','bike trip','manali leh'],t:'Ladakh Bike Trip Guide',u:'/blog/ladakh-bike-trip-guide/'},
{k:['december','winter','new year'],t:'Best Places December',u:'/blog/best-places-visit-india-december/'},
{k:['april','summer'],t:'Best Places April',u:'/blog/best-places-visit-india-april/'},
{k:['hospital','chennai'],t:'Best Hospitals Chennai',u:'/blog/best-hospitals-chennai/'},
{k:['hospital','bangalore','bengaluru'],t:'Best Hospitals Bangalore',u:'/blog/best-hospitals-bangalore/'},
{k:['hospital','delhi','gurgaon'],t:'Best Hospitals Delhi',u:'/blog/best-hospitals-delhi/'},
{k:['hospital','mumbai','bombay'],t:'Best Hospitals Mumbai',u:'/blog/best-hospitals-mumbai/'},
{k:['hospital','hyderabad'],t:'Best Hospitals Hyderabad',u:'/blog/best-hospitals-hyderabad/'},
{k:['government','private','hospital','govt'],t:'Govt vs Private Hospital',u:'/blog/government-vs-private-hospital-india/'},
{k:['creta','nexon','suv'],t:'Creta vs Nexon',u:'/blog/hyundai-creta-vs-tata-nexon/'},
{k:['brezza','nexon','maruti'],t:'Brezza vs Nexon',u:'/blog/maruti-brezza-vs-tata-nexon/'},
{k:['car','under 10','lakh','best car'],t:'Best Cars Under 10L',u:'/blog/best-car-under-10-lakh-india/'},
{k:['electric','ev','electric car'],t:'Best Electric Cars',u:'/blog/best-electric-car-india/'},
{k:['bike','motorcycle','under 1'],t:'Best Bikes Under 1L',u:'/blog/best-bike-under-1-lakh-india/'},
{k:['refrigerator','fridge'],t:'Best Refrigerators',u:'/blog/best-refrigerator-india/'},
{k:['washing machine'],t:'Best Washing Machines',u:'/blog/best-washing-machine-india/'},
{k:['air purifier','purifier','pollution'],t:'Best Air Purifiers',u:'/blog/best-air-purifier-india/'},
{k:['water purifier','ro','uv','kent'],t:'Best Water Purifiers',u:'/blog/best-water-purifier-india/'}
];

function findBlogs(q){var l=q.toLowerCase();var m=[];BLOGS.forEach(function(b){var s=0;b.k.forEach(function(kw){if(l.includes(kw))s++});if(s>0)m.push({b:b,s:s})});m.sort(function(a,b){return b.s-a.s});return m.slice(0,3)}

function fallbackResponse(q){
  var l=q.toLowerCase();var bm=findBlogs(l);
  if(l.match(/buy|price|where to buy|order/)){var p=q.replace(/buy|price of|where to buy|order|in india|online/gi,'').trim();if(p.length>2){var r='You can buy '+p+' from: <a href="https://www.amazon.in/s?k='+encodeURIComponent(p)+'&tag='+AFF+'" target="_blank" style="color:var(--accent)">Amazon India</a> | <a href="https://www.flipkart.com/search?q='+encodeURIComponent(p)+'" target="_blank" style="color:var(--accent)">Flipkart</a>';if(bm.length>0)r+='<br><br>Guide: <a href="'+bm[0].b.u+'" style="color:var(--accent)">'+bm[0].b.t+'</a>';return r}}
  if(bm.length>0){var r='I have a detailed guide: <a href="'+bm[0].b.u+'" style="color:var(--accent)">'+bm[0].b.t+'</a>';if(bm.length>1)r+='<br>Also: <a href="'+bm[1].b.u+'" style="color:var(--accent)">'+bm[1].b.t+'</a>';return r}
  if(l.match(/school/))return'We have 70+ schools across 5 cities. <a href="/schools" style="color:var(--accent)">Browse Schools</a> | <a href="/blog/cbse-vs-icse-which-is-better/" style="color:var(--accent)">CBSE vs ICSE Guide</a>';
  if(l.match(/college/))return'150+ colleges compared. <a href="/colleges" style="color:var(--accent)">Browse Colleges</a>';
  if(l.match(/phone|mobile|laptop|electronic/))return'Compare phones and laptops with buy links. <a href="/electronics" style="color:var(--accent)">Browse Electronics</a>';
  if(l.match(/car|bike|suv/))return'Compare cars and bikes. <a href="/cars" style="color:var(--accent)">Browse Cars & Bikes</a>';
  if(l.match(/hospital|doctor/))return'100+ hospitals across 5 cities. <a href="/hospitals" style="color:var(--accent)">Browse Hospitals</a>';
  if(l.match(/travel|visit|trip|weekend/))return'42 destinations by month. <a href="/travel" style="color:var(--accent)">Plan Your Trip</a>';
  if(l.match(/charger|case|accessor/))return'Best accessories for your device. <a href="/accessories" style="color:var(--accent)">Browse Accessories</a>';
  if(l.match(/price|compare price|best deal/))return'Compare prices across stores. <a href="/price-finder/" style="color:var(--accent)">Price Finder</a>';
  if(l.match(/hello|hi|hey|namaste/))return'Hello! I can help you find the best phones, laptops, schools, hospitals, travel spots, and more in India. What are you looking for?';
  return'I can help you find the best options in India for phones, laptops, schools, cars, hospitals, travel, and more. Try asking "best phone under 20K" or "weekend trips from Chennai".';
}

// AI-powered response via Cloudflare Worker
async function getAIResponse(message){
  if(!WORKER_URL) return fallbackResponse(message);
  
  try {
    var resp = await fetch(WORKER_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        message: message,
        page: window.location.pathname
      })
    });
    
    if(!resp.ok) throw new Error('API error '+resp.status);
    
    var data = await resp.json();
    if(data.error) throw new Error(data.error);
    
    return data.reply || fallbackResponse(message);
  } catch(err) {
    console.warn('AI chat fallback:', err.message);
    return fallbackResponse(message);
  }
}

// Build and inject chat widget
function getPageCategory(){
  var p=window.location.pathname;
  if(p.includes('/schools'))return'schools';
  if(p.includes('/electronics'))return'electronics';
  if(p.includes('/cars'))return'cars';
  if(p.includes('/hospitals'))return'hospitals';
  if(p.includes('/travel'))return'travel';
  if(p.includes('/accessories'))return'accessories';
  if(p.includes('/price-finder'))return'shopping';
  return'default';
}

var quickSets={
  'default':['Best phone under 20K','Weekend trips from Chennai','CBSE vs ICSE','Best hospital nearby'],
  'schools':['CBSE vs ICSE guide','School fees in India','Best CBSE schools','Which board for IIT?'],
  'electronics':['Best phone under 15K','Best laptop under 50K','Samsung vs iPhone','Best earbuds under 2K'],
  'cars':['Creta vs Nexon','Best car under 10L','Best electric car India','Brezza vs Nexon'],
  'hospitals':['Best hospital Chennai','Best hospital Delhi','Govt vs Private hospital','Best cancer hospital'],
  'travel':['Weekend from Chennai','Ooty vs Kodaikanal','Ladakh bike trip','Best places in December'],
  'accessories':['Best GaN charger','Best power bank','Best wireless mouse','Best water purifier'],
  'shopping':['iPhone 16 price','Samsung S25 best deal','MacBook Air price','Best laptop deals']
};

var chatHTML='<div id="wib-chat-btn" style="position:fixed;bottom:24px;right:24px;width:56px;height:56px;border-radius:50%;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 16px rgba(37,99,235,0.4);z-index:300;transition:transform .2s" title="Ask WIB AI"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>';
chatHTML+='<div id="wib-chat" style="display:none;position:fixed;bottom:90px;right:24px;width:380px;max-height:540px;background:var(--bg-card);border:1px solid var(--border);border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,0.15);z-index:300;flex-direction:column;overflow:hidden">';
chatHTML+='<div style="padding:16px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between"><div><div style="font-family:Outfit,sans-serif;font-weight:700;font-size:15px">WIB Assistant'+(isAIMode?' <span style="font-size:10px;font-weight:500;background:var(--accent);color:#fff;padding:2px 6px;border-radius:4px;margin-left:4px">AI</span>':'')+'</div><div style="font-size:11px;color:var(--text-muted)">'+(isAIMode?'Powered by Claude AI':'Find products, schools, hospitals, travel')+'</div></div><button id="wib-chat-close" style="background:none;border:none;cursor:pointer;font-size:18px;color:var(--text-muted);padding:4px">&#x2715;</button></div>';
chatHTML+='<div id="chatMessages" style="flex:1;overflow-y:auto;padding:16px 20px;min-height:300px;max-height:360px"><div style="background:var(--accent-light);border-radius:12px 12px 12px 4px;padding:12px 16px;font-size:13px;line-height:1.6;color:var(--text-primary);max-width:90%;margin-bottom:12px">'+(isAIMode?'Hi! I\'m WIB Assistant, powered by AI. Ask me anything about phones, laptops, schools, hospitals, travel destinations, or cars in India. I can recommend products, compare options, and help you find the best deals.':'Hi! I can help you find the best phones, laptops, schools, hospitals, travel spots, and more in India. What are you looking for?')+'</div></div>';
chatHTML+='<div style="padding:12px 16px;border-top:1px solid var(--border);display:flex;gap:8px"><input id="chatInput" type="text" placeholder="'+(isAIMode?'Ask me anything...':'Ask anything... e.g. best phone under 20K')+'" style="flex:1;padding:10px 14px;border:1px solid var(--border);border-radius:8px;background:var(--bg-secondary);color:var(--text-primary);font-family:inherit;font-size:13px;outline:none"><button id="chatSend" style="padding:10px 16px;border-radius:8px;background:var(--accent);color:#fff;border:none;cursor:pointer;font-family:inherit;font-size:13px;font-weight:600">Send</button></div>';
chatHTML+='<div id="quickBtns" style="padding:8px 16px 12px;display:flex;flex-wrap:wrap;gap:6px"></div></div>';

var container=document.createElement('div');
container.innerHTML=chatHTML;
document.body.appendChild(container);

// Styles
var style=document.createElement('style');
style.textContent='#wib-chat-btn:hover{transform:scale(1.1)}#quickBtns button{padding:6px 12px;border-radius:6px;background:var(--tag-bg);color:var(--text-secondary);font-family:inherit;font-size:11px;border:1px solid var(--border);cursor:pointer;transition:all .2s;white-space:nowrap}#quickBtns button:hover{background:var(--accent-light);color:var(--accent);border-color:var(--accent)}@media(max-width:768px){#wib-chat{width:calc(100% - 32px)!important;right:16px!important;bottom:80px!important}}@keyframes blink{0%,100%{opacity:1}50%{opacity:0.3}}.typing-dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--text-muted);margin:0 2px;animation:blink 1.2s infinite}';
document.head.appendChild(style);

// Quick buttons
var cat=getPageCategory();
var btns=quickSets[cat]||quickSets['default'];
var qc=document.getElementById('quickBtns');
btns.forEach(function(txt){
  var btn=document.createElement('button');
  btn.textContent=txt;
  btn.onclick=function(){document.getElementById('chatInput').value=txt;sendMsg()};
  qc.appendChild(btn);
});

// Event handlers
document.getElementById('wib-chat-btn').onclick=function(){
  var c=document.getElementById('wib-chat');
  c.style.display=c.style.display==='none'?'flex':'none';
};
document.getElementById('wib-chat-close').onclick=function(){
  document.getElementById('wib-chat').style.display='none';
};
document.getElementById('chatSend').onclick=sendMsg;
document.getElementById('chatInput').onkeydown=function(e){if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendMsg()}};

async function sendMsg(){
  var input=document.getElementById('chatInput');
  var msg=input.value.trim();
  if(!msg)return;
  
  var box=document.getElementById('chatMessages');
  var sendBtn=document.getElementById('chatSend');
  
  // Show user message
  box.innerHTML+='<div style="background:var(--accent);color:#fff;border-radius:12px 12px 4px 12px;padding:12px 16px;font-size:13px;max-width:80%;margin-left:auto;margin-bottom:12px">'+msg.replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</div>';
  input.value='';
  sendBtn.disabled=true;
  sendBtn.textContent='...';
  
  // Show typing indicator
  box.innerHTML+='<div id="typing" style="display:flex;gap:2px;padding:12px 0;margin-bottom:12px"><span class="typing-dot" style="animation-delay:0s"></span><span class="typing-dot" style="animation-delay:0.2s"></span><span class="typing-dot" style="animation-delay:0.4s"></span></div>';
  box.scrollTop=box.scrollHeight;
  
  // Get response (AI or fallback)
  var reply;
  if(isAIMode){
    reply=await getAIResponse(msg);
  } else {
    await new Promise(function(r){setTimeout(r,400+Math.random()*300)});
    reply=fallbackResponse(msg);
  }
  
  // Remove typing indicator
  var t=document.getElementById('typing');if(t)t.remove();
  
  // Show response
  box.innerHTML+='<div style="background:var(--accent-light);border-radius:12px 12px 12px 4px;padding:12px 16px;font-size:13px;line-height:1.6;color:var(--text-primary);max-width:90%;margin-bottom:12px">'+reply+'</div>';
  box.scrollTop=box.scrollHeight;
  
  sendBtn.disabled=false;
  sendBtn.textContent='Send';
  
  // Track in GA
  if(typeof gtag==='function'){gtag('event','chat_message',{message_text:msg.substring(0,100),ai_mode:isAIMode?'claude':'keyword'})}
}

})();
