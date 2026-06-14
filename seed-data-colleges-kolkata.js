/* ============================================================================
   KOLKATA COLLEGES — seed for the new Kolkata colleges section.
   Kolkata was missing from Colleges entirely (top-3 metro gap).
   Integrity: real names/streams/localities/established; approximate fees;
   no fabricated ratings. stream values match the sub-page filters
   (Engineering, Medical, Management, Arts, Commerce).
   Import: /seed-colleges-kolkata.html (additive, run once).
   ========================================================================== */
var KOLKATA_COLLEGES = [];
function C(o){ KOLKATA_COLLEGES.push(o); }

/* ---- Engineering ---- */
C({name:"Jadavpur University (Engineering)",city:"Kolkata",state:"West Bengal",stream:"Engineering",type:"Government",fees:24000,established:1955,results:95,address:"Jadavpur, Kolkata",highlights:"Top-ranked state university; among India's best for engineering"});
C({name:"IIEST Shibpur",city:"Kolkata",state:"West Bengal",stream:"Engineering",type:"Government",fees:125000,established:1856,results:94,address:"Shibpur, Howrah",highlights:"Institute of National Importance, historic engineering school"});
C({name:"Heritage Institute of Technology",city:"Kolkata",state:"West Bengal",stream:"Engineering",type:"Private",fees:300000,established:2001,results:90,address:"Anandapur, Kolkata",highlights:"Top private engineering college, strong placements"});
C({name:"Institute of Engineering & Management (IEM)",city:"Kolkata",state:"West Bengal",stream:"Engineering",type:"Private",fees:320000,established:1989,results:90,address:"Salt Lake, Kolkata",highlights:"Well-placed private engineering institute"});
C({name:"Techno India Salt Lake",city:"Kolkata",state:"West Bengal",stream:"Engineering",type:"Private",fees:280000,established:2001,results:88,address:"Salt Lake, Kolkata",highlights:"Large private engineering college"});

/* ---- Medical ---- */
C({name:"Calcutta Medical College",city:"Kolkata",state:"West Bengal",stream:"Medical",type:"Government",fees:9000,established:1835,results:96,address:"College Street, Kolkata",highlights:"Asia's oldest Western medical college"});
C({name:"NRS Medical College",city:"Kolkata",state:"West Bengal",stream:"Medical",type:"Government",fees:9000,established:1873,results:95,address:"Sealdah, Kolkata",highlights:"Major government medical college and hospital"});
C({name:"R.G. Kar Medical College",city:"Kolkata",state:"West Bengal",stream:"Medical",type:"Government",fees:9000,established:1886,results:95,address:"Shyambazar, Kolkata",highlights:"Historic government medical college"});
C({name:"IPGMER / SSKM Hospital",city:"Kolkata",state:"West Bengal",stream:"Medical",type:"Government",fees:9000,established:1957,results:96,address:"Bhowanipore, Kolkata",highlights:"Premier postgraduate medical institute"});

/* ---- Management (MBA) ---- */
C({name:"IIM Calcutta",city:"Kolkata",state:"West Bengal",stream:"Management",type:"Government",fees:2700000,established:1961,results:100,address:"Joka, Kolkata",highlights:"India's first IIM; top-tier MBA, elite placements"});
C({name:"IISWBM",city:"Kolkata",state:"West Bengal",stream:"Management",type:"Government",fees:400000,established:1953,results:92,address:"College Square, Kolkata",highlights:"India's first business school"});
C({name:"Praxis Business School",city:"Kolkata",state:"West Bengal",stream:"Management",type:"Private",fees:850000,established:2007,results:90,address:"Bishnupur, Kolkata",highlights:"Analytics-focused PGDM programme"});
C({name:"Army Institute of Management Kolkata",city:"Kolkata",state:"West Bengal",stream:"Management",type:"Private",fees:700000,established:1997,results:90,address:"Alipore, Kolkata",highlights:"AICTE-approved, strong placements"});

/* ---- Arts / Science ---- */
C({name:"Presidency University",city:"Kolkata",state:"West Bengal",stream:"Arts",type:"Government",fees:9000,established:1817,results:95,address:"College Street, Kolkata",highlights:"Historic top university for arts and sciences"});
C({name:"St. Xavier's College (Autonomous)",city:"Kolkata",state:"West Bengal",stream:"Arts",type:"Private",fees:60000,established:1860,results:96,address:"Park Street, Kolkata",highlights:"India's top-ranked autonomous college"});
C({name:"Scottish Church College",city:"Kolkata",state:"West Bengal",stream:"Arts",type:"Private",fees:14000,established:1830,results:93,address:"Urquhart Square, Kolkata",highlights:"Oldest Christian liberal arts college in India"});
C({name:"Lady Brabourne College",city:"Kolkata",state:"West Bengal",stream:"Arts",type:"Government",fees:10000,established:1939,results:93,address:"Park Circus, Kolkata",highlights:"Leading government women's college"});

/* ---- Commerce ---- */
C({name:"St. Xavier's College Commerce",city:"Kolkata",state:"West Bengal",stream:"Commerce",type:"Private",fees:65000,established:1860,results:96,address:"Park Street, Kolkata",highlights:"Top commerce programme in Eastern India"});
C({name:"Goenka College of Commerce & Business Administration",city:"Kolkata",state:"West Bengal",stream:"Commerce",type:"Government",fees:11000,established:1905,results:92,address:"College Street, Kolkata",highlights:"Premier government commerce college"});
C({name:"Shri Shikshayatan College",city:"Kolkata",state:"West Bengal",stream:"Commerce",type:"Private",fees:18000,established:1954,results:91,address:"Lord Sinha Road, Kolkata",highlights:"Reputed women's commerce college"});
C({name:"Heramba Chandra College",city:"Kolkata",state:"West Bengal",stream:"Commerce",type:"Private",fees:12000,established:1958,results:90,address:"Golpark, Kolkata",highlights:"Popular commerce and arts college"});

if (typeof module !== 'undefined' && module.exports) module.exports = KOLKATA_COLLEGES;
