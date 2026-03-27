/* WIB AI Chat Widget - Include via <script src="/chat-widget.js"></script> on any page */
(function(){
var AFF='wib04-21';
var BLOGS=[
{k:['phone','under','15000','15k','budget phone'],t:'Best Phones Under 15000',u:'/blog/best-phone-under-15000-india/'},
{k:['phone','under','20000','20k','mid range phone'],t:'Best Phones Under 20000',u:'/blog/best-phone-under-20000-india/'},
{k:['phone','under','30000','30k'],t:'Best Phones Under 30000',u:'/blog/best-phone-under-30000-india/'},
{k:['phone','under','10000','10k','cheapest phone'],t:'Best Phones Under 10000',u:'/blog/best-phone-under-10000-india/'},
{k:['laptop','under','50000','50k','student laptop'],t:'Best Laptops Under 50000',u:'/blog/best-laptop-under-50000-india/'},
{k:['surface','pro','laptop','microsoft'],t:'Surface Pro vs Surface Laptop',u:'/blog/surface-pro-vs-surface-laptop/'},
{k:['macbook','dell','xps'],t:'MacBook Air vs Dell XPS',u:'/blog/macbook-air-vs-dell-xps-india/'},
{k:['iphone','samsung','s25','s24'],t:'iPhone 16 vs Samsung S25',u:'/blog/iphone-16-vs-samsung-s25/'},
{k:['earbuds','tws','wireless earphone','under 2000'],t:'Best Earbuds Under 2000',u:'/blog/best-earbuds-under-2000-india/'},
{k:['charger','gan','fast charge','65w'],t:'Best GaN Chargers',u:'/blog/best-gan-charger-india/'},
{k:['smartwatch','watch','fitness band'],t:'Best Smartwatches in India',u:'/blog/best-smartwatch-india/'},
{k:['tv','television','under 30000','smart tv'],t:'Best TVs Under 30000',u:'/blog/best-tv-under-30000-india/'},
{k:['refrigerator','fridge'],t:'Best Refrigerators in India',u:'/blog/best-refrigerator-india/'},
{k:['washing machine'],t:'Best Washing Machines',u:'/blog/best-washing-machine-india/'},
{k:['air purifier','purifier'],t:'Best Air Purifiers',u:'/blog/best-air-purifier-india/'},
{k:['cbse','icse','board','which board'],t:'CBSE vs ICSE Guide',u:'/blog/cbse-vs-icse-which-is-better/'},
{k:['school fee','fees','cost of school'],t:'School Fees Guide India',u:'/blog/school-fees-india-guide/'},
{k:['ooty','kodaikanal','hill station','which hill'],t:'Ooty vs Kodaikanal',u:'/blog/ooty-vs-kodaikanal-which-is-better/'},
{k:['weekend','trip','chennai','getaway from chennai'],t:'Weekend Trips from Chennai',u:'/blog/weekend-trips-from-chennai/'},
{k:['weekend','bangalore','trip from bangalore'],t:'Weekend Trips from Bangalore',u:'/blog/weekend-trips-from-bangalore/'},
{k:['weekend','delhi','trip from delhi'],t:'Weekend Trips from Delhi',u:'/blog/weekend-trips-from-delhi/'},
{k:['weekend','mumbai','trip from mumbai'],t:'Weekend Trips from Mumbai',u:'/blog/weekend-trips-from-mumbai/'},
{k:['goa','beach','party'],t:'Goa Travel Guide',u:'/blog/goa-travel-guide/'},
{k:['april','summer','visit in april'],t:'Best Places to Visit in April',u:'/blog/best-places-visit-india-april/'},
{k:['hospital','chennai','best hospital chennai'],t:'Best Hospitals in Chennai',u:'/blog/best-hospitals-chennai/'},
{k:['hospital','bangalore','best hospital bangalore'],t:'Best Hospitals in Bangalore',u:'/blog/best-hospitals-bangalore/'},
{k:['hospital','delhi','best hospital delhi'],t:'Best Hospitals in Delhi',u:'/blog/best-hospitals-delhi/'},
{k:['hospital','mumbai','best hospital mumbai'],t:'Best Hospitals in Mumbai',u:'/blog/best-hospitals-mumbai/'},
{k:['government','private','hospital','govt vs private'],t:'Govt vs Private Hospitals',u:'/blog/government-vs-private-hospital-india/'},
{k:['creta','nexon','suv'],t:'Hyundai Creta vs Tata Nexon',u:'/blog/hyundai-creta-vs-tata-nexon/'},
{k:['car','under 10','lakh','best car'],t:'Best Cars Under 10 Lakh',u:'/blog/best-car-under-10-lakh-india/'},
{k:['bike','under 1','lakh','best bike','motorcycle'],t:'Best Bikes Under 1 Lakh',u:'/blog/best-bike-under-1-lakh-india/'}
];

function findBlogs(query){
  var q=query.toLowerCase();
  var matches=[];
  BLOGS.forEach(function(b){
    var score=0;
    b.k.forEach(function(kw){if(q.includes(kw))score++;});
    if(score>0)matches.push({blog:b,score:score});
  });
  matches.sort(function(a,b){return b.score-a.score;});
  return matches.slice(0,3);
}

function getResponse(q){
  var l=q.toLowerCase();
  var blogMatches=findBlogs(l);
  
  // Direct product searches - return Amazon link with affiliate tag
  if(l.match(/buy|price|where to buy|order/)){
    var product=q.replace(/buy|price of|where to buy|order|in india|online/gi,'').trim();
    if(product.length>2){
      var resp='You can buy '+product+' from: <a href="https://www.amazon.in/s?k='+encodeURIComponent(product)+'&tag='+AFF+'" target="_blank" style="color:var(--accent)">Amazon India</a> | <a href="https://www.flipkart.com/search?q='+encodeURIComponent(product)+'" target="_blank" style="color:var(--accent)">Flipkart</a>';
      if(blogMatches.length>0){
        resp+='<br><br>Related guide: <a href="'+blogMatches[0].blog.u+'" style="color:var(--accent)">'+blogMatches[0].blog.t+'</a>';
      }
      return resp;
    }
  }
  
  // If we found matching blog articles, recommend them
  if(blogMatches.length>0){
    var best=blogMatches[0].blog;
    var resp='I have a detailed guide on that: <a href="'+best.u+'" style="color:var(--accent)">'+best.t+'</a>';
    if(blogMatches.length>1){
      resp+='<br><br>Also related: ';
      for(var i=1;i<Math.min(blogMatches.length,3);i++){
        resp+='<a href="'+blogMatches[i].blog.u+'" style="color:var(--accent)">'+blogMatches[i].blog.t+'</a>';
        if(i<blogMatches.length-1&&i<2)resp+=' | ';
      }
    }
    return resp;
  }

  // Category-level responses
  if(l.match(/school|cbse|icse|board/))return'We have 70+ schools compared across 5 cities. Filter by board, fees, and city. <a href="/schools" style="color:var(--accent)">Browse Schools</a><br><br>Popular guide: <a href="/blog/cbse-vs-icse-which-is-better/" style="color:var(--accent)">CBSE vs ICSE - Which is Better?</a>';
  if(l.match(/college|university|degree/))return'150+ colleges compared across streams - engineering, medical, arts, commerce. <a href="/colleges" style="color:var(--accent)">Browse Colleges</a>';
  if(l.match(/phone|mobile|smartphone/))return'We compare phones with specs, prices, and buy links. <a href="/electronics" style="color:var(--accent)">Browse Phones</a><br><br>Popular guides: <a href="/blog/best-phone-under-15000-india/" style="color:var(--accent)">Best Under 15K</a> | <a href="/blog/best-phone-under-20000-india/" style="color:var(--accent)">Best Under 20K</a>';
  if(l.match(/laptop|notebook|computer/))return'Compare laptops by specs, prices, and brand. <a href="/electronics" style="color:var(--accent)">Browse Laptops</a><br><br>Guide: <a href="/blog/best-laptop-under-50000-india/" style="color:var(--accent)">Best Laptops Under 50K</a>';
  if(l.match(/car|suv|sedan/))return'Compare cars by price, mileage, safety, and features. <a href="/cars" style="color:var(--accent)">Browse Cars</a><br><br>Guides: <a href="/blog/best-car-under-10-lakh-india/" style="color:var(--accent)">Best Under 10L</a> | <a href="/blog/hyundai-creta-vs-tata-nexon/" style="color:var(--accent)">Creta vs Nexon</a>';
  if(l.match(/bike|motorcycle|scooter/))return'Compare bikes by price, mileage, and performance. <a href="/cars" style="color:var(--accent)">Browse Bikes</a><br><br>Guide: <a href="/blog/best-bike-under-1-lakh-india/" style="color:var(--accent)">Best Bikes Under 1 Lakh</a>';
  if(l.match(/hospital|doctor|medical|health/))return'Compare 100+ hospitals across 5 cities by speciality and ratings. <a href="/hospitals" style="color:var(--accent)">Browse Hospitals</a><br><br>City guides: <a href="/blog/best-hospitals-chennai/" style="color:var(--accent)">Chennai</a> | <a href="/blog/best-hospitals-bangalore/" style="color:var(--accent)">Bangalore</a> | <a href="/blog/best-hospitals-delhi/" style="color:var(--accent)">Delhi</a>';
  if(l.match(/travel|visit|trip|weekend|holiday|vacation|tourism/))return'Discover destinations month-by-month with hotel bookings and travel mode ratings. <a href="/travel" style="color:var(--accent)">Plan Your Trip</a><br><br>Guides: <a href="/blog/weekend-trips-from-chennai/" style="color:var(--accent)">From Chennai</a> | <a href="/blog/weekend-trips-from-bangalore/" style="color:var(--accent)">From Bangalore</a> | <a href="/blog/goa-travel-guide/" style="color:var(--accent)">Goa Guide</a>';
  if(l.match(/charger|case|guard|accessor|backpack/))return'Find the best accessories for your specific device with buy links. <a href="/accessories" style="color:var(--accent)">Browse Accessories</a><br><br>Guide: <a href="/blog/best-gan-charger-india/" style="color:var(--accent)">Best GaN Chargers</a>';
  if(l.match(/compare|vs|versus|difference|better/))return'Use our side-by-side comparison tool for any category. <a href="/compare" style="color:var(--accent)">Compare Now</a>';
  if(l.match(/hello|hi|hey|namaste/))return'Hello! I can help you find the best phones, laptops, schools, cars, hospitals, travel destinations, and accessories in India. What are you looking for?';
  
  return'I can help you compare and find the best options in India for: phones, laptops, schools, colleges, cars, bikes, hospitals, travel destinations, chargers, earbuds, and more. Try asking something like "best phone under 20K" or "weekend trips from Chennai".';
}

// Build and inject the chat widget HTML
var chatHTML='<div id="wib-chat-btn" style="position:fixed;bottom:24px;right:24px;width:56px;height:56px;border-radius:50%;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 4px 16px rgba(37,99,235,0.4);z-index:300;transition:transform .2s" title="Ask WIB Assistant"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div>';
chatHTML+='<div id="wib-chat" style="display:none;position:fixed;bottom:90px;right:24px;width:380px;max-height:540px;background:var(--bg-card);border:1px solid var(--border);border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,0.15);z-index:300;flex-direction:column;overflow:hidden">';
chatHTML+='<div style="padding:16px 20px;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between"><div><div style="font-family:Outfit,sans-serif;font-weight:700;font-size:15px">WIB Assistant</div><div style="font-size:11px;color:var(--text-muted)">Find the best products, schools, hospitals, and travel spots</div></div><button id="wib-chat-close" style="background:none;border:none;cursor:pointer;font-size:18px;color:var(--text-muted)">&#x2715;</button></div>';
chatHTML+='<div id="chatMessages" style="flex:1;overflow-y:auto;padding:16px 20px;min-height:300px;max-height:360px"><div style="background:var(--accent-light);border-radius:12px 12px 12px 4px;padding:12px 16px;font-size:13px;line-height:1.6;color:var(--text-primary);max-width:90%;margin-bottom:12px">Hi! I can help you find the best phones, laptops, schools, hospitals, travel destinations, and more in India. What are you looking for?</div></div>';
chatHTML+='<div style="padding:12px 16px;border-top:1px solid var(--border);display:flex;gap:8px"><input id="chatInput" type="text" placeholder="Ask anything... e.g. best phone under 20K" style="flex:1;padding:10px 14px;border:1px solid var(--border);border-radius:8px;background:var(--bg-secondary);color:var(--text-primary);font-family:inherit;font-size:13px;outline:none"><button id="chatSend" style="padding:10px 16px;border-radius:8px;background:var(--accent);color:#fff;border:none;cursor:pointer;font-family:inherit;font-size:13px;font-weight:600">Send</button></div>';
chatHTML+='<div id="quickBtns" style="padding:8px 16px 12px;display:flex;flex-wrap:wrap;gap:6px"></div>';
chatHTML+='</div>';

// Quick action buttons - rotate based on current page
var quickSets={
  'default':['Best phone under 20K','Weekend trips from Chennai','CBSE vs ICSE','Best hospital in Bangalore'],
  'schools':['CBSE vs ICSE guide','School fees in India','Best schools Bangalore','Best schools Chennai'],
  'electronics':['Best phone under 15K','Best laptop under 50K','Best earbuds under 2K','Best GaN charger'],
  'cars':['Creta vs Nexon','Best car under 10L','Best bike under 1L','Buy Creta online'],
  'hospitals':['Best hospital Chennai','Best hospital Delhi','Govt vs Private hospital','Best hospital Bangalore'],
  'travel':['Weekend from Chennai','Ooty vs Kodaikanal','Goa travel guide','Weekend from Bangalore'],
  'accessories':['Best GaN charger','Best earbuds under 2K','Best smartwatch','Best phone case']
};

function getPageCategory(){
  var p=window.location.pathname;
  if(p.includes('/schools'))return'schools';
  if(p.includes('/electronics'))return'electronics';
  if(p.includes('/cars'))return'cars';
  if(p.includes('/hospitals'))return'hospitals';
  if(p.includes('/travel'))return'travel';
  if(p.includes('/accessories'))return'accessories';
  return'default';
}

// Inject into page
var container=document.createElement('div');
container.innerHTML=chatHTML;
document.body.appendChild(container);

// Add styles
var style=document.createElement('style');
style.textContent='#wib-chat-btn:hover{transform:scale(1.1)}#quickBtns button{padding:6px 12px;border-radius:6px;background:var(--tag-bg);color:var(--text-secondary);font-family:inherit;font-size:11px;border:1px solid var(--border);cursor:pointer;transition:all .2s;white-space:nowrap}#quickBtns button:hover{background:var(--accent-light);color:var(--accent);border-color:var(--accent)}@media(max-width:768px){#wib-chat{width:calc(100% - 32px)!important;right:16px!important;bottom:80px!important}}';
document.head.appendChild(style);

// Populate quick buttons
var cat=getPageCategory();
var btns=quickSets[cat]||quickSets['default'];
var qContainer=document.getElementById('quickBtns');
btns.forEach(function(txt){
  var btn=document.createElement('button');
  btn.textContent=txt;
  btn.onclick=function(){document.getElementById('chatInput').value=txt;sendMsg();};
  qContainer.appendChild(btn);
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
document.getElementById('chatInput').onkeydown=function(e){if(e.key==='Enter')sendMsg();};

function sendMsg(){
  var input=document.getElementById('chatInput');
  var msg=input.value.trim();
  if(!msg)return;
  var box=document.getElementById('chatMessages');
  box.innerHTML+='<div style="background:var(--accent);color:#fff;border-radius:12px 12px 4px 12px;padding:12px 16px;font-size:13px;max-width:80%;margin-left:auto;margin-bottom:12px">'+msg.replace(/</g,'&lt;')+'</div>';
  input.value='';
  box.innerHTML+='<div id="typing" style="color:var(--text-muted);font-size:12px;margin-bottom:12px;display:flex;gap:4px"><span style="animation:pulse 1s infinite">Searching</span><span style="animation:pulse 1s infinite .2s">.</span><span style="animation:pulse 1s infinite .4s">.</span><span style="animation:pulse 1s infinite .6s">.</span></div>';
  box.scrollTop=box.scrollHeight;
  setTimeout(function(){
    var r=getResponse(msg);
    var t=document.getElementById('typing');
    if(t)t.remove();
    box.innerHTML+='<div style="background:var(--accent-light);border-radius:12px 12px 12px 4px;padding:12px 16px;font-size:13px;line-height:1.6;color:var(--text-primary);max-width:90%;margin-bottom:12px">'+r+'</div>';
    box.scrollTop=box.scrollHeight;
  },600+Math.random()*400);
}

// Add pulse animation
var anim=document.createElement('style');
anim.textContent='@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.3}}';
document.head.appendChild(anim);

})();
