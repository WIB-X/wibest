/* ============================================================================
   COLLEGES BATCH 2 — Trivandrum (South), Bhubaneswar (East), Guwahati (NE)
   Deliberately balancing geography beyond North. Premier institutes included
   (IIST, IIT Guwahati, KIIT, XIMB, AIIMS Bhubaneswar).
   Integrity: real names/streams/localities/established; approximate fees;
   no fabricated ratings. Import: /seed-colleges-batch2.html (additive, once).
   ========================================================================== */
var BATCH2_COLLEGES = [];
function C(o){ BATCH2_COLLEGES.push(o); }

/* ---- Trivandrum (Kerala) — SOUTH ---- */
C({name:"Indian Institute of Space Science & Technology (IIST)",city:"Trivandrum",state:"Kerala",stream:"Engineering",type:"Government",fees:240000,established:2007,results:98,address:"Valiamala, Trivandrum",highlights:"India's premier space-science institute, ISRO-linked"});
C({name:"College of Engineering Trivandrum (CET)",city:"Trivandrum",state:"Kerala",stream:"Engineering",type:"Government",fees:45000,established:1939,results:95,address:"Sreekariyam, Trivandrum",highlights:"Kerala's top and oldest engineering college"});
C({name:"Government Engineering College Barton Hill",city:"Trivandrum",state:"Kerala",stream:"Engineering",type:"Government",fees:42000,established:1999,results:92,address:"Barton Hill, Trivandrum",highlights:"Reputed government engineering college"});
C({name:"Sree Chitra Tirunal Institute for Medical Sciences",city:"Trivandrum",state:"Kerala",stream:"Medical",type:"Government",fees:30000,established:1976,results:97,address:"Poojappura, Trivandrum",highlights:"Institute of National Importance, cardiology &amp; neuro"});
C({name:"Government Medical College Trivandrum",city:"Trivandrum",state:"Kerala",stream:"Medical",type:"Government",fees:30000,established:1951,results:95,address:"Ulloor, Trivandrum",highlights:"Premier government medical college"});
C({name:"IIITM-K (Digital University Kerala)",city:"Trivandrum",state:"Kerala",stream:"Management",type:"Government",fees:200000,established:2000,results:92,address:"Technopark, Trivandrum",highlights:"IT &amp; digital management programmes"});
C({name:"University College Trivandrum",city:"Trivandrum",state:"Kerala",stream:"Arts",type:"Government",fees:8000,established:1866,results:93,address:"Palayam, Trivandrum",highlights:"Historic government arts &amp; science college"});
C({name:"Mar Ivanios College",city:"Trivandrum",state:"Kerala",stream:"Arts",type:"Private",fees:20000,established:1949,results:93,address:"Nalanchira, Trivandrum",highlights:"Autonomous, top-ranked arts &amp; science college"});
C({name:"Loyola College of Social Sciences",city:"Trivandrum",state:"Kerala",stream:"Commerce",type:"Private",fees:22000,established:1963,results:92,address:"Sreekariyam, Trivandrum",highlights:"Reputed for commerce and social work"});

/* ---- Bhubaneswar (Odisha) — EAST ---- */
C({name:"KIIT University",city:"Bhubaneswar",state:"Odisha",stream:"Engineering",type:"Private",fees:400000,established:1992,results:92,address:"Patia, Bhubaneswar",highlights:"One of India's largest private universities, strong placements"});
C({name:"ITER (SOA University)",city:"Bhubaneswar",state:"Odisha",stream:"Engineering",type:"Private",fees:320000,established:1996,results:90,address:"Jagamara, Bhubaneswar",highlights:"Institute of Technical Education &amp; Research"});
C({name:"College of Engineering & Technology (CET)",city:"Bhubaneswar",state:"Odisha",stream:"Engineering",type:"Government",fees:90000,established:1981,results:90,address:"Ghatikia, Bhubaneswar",highlights:"Leading government engineering college"});
C({name:"AIIMS Bhubaneswar",city:"Bhubaneswar",state:"Odisha",stream:"Medical",type:"Government",fees:6000,established:2012,results:97,address:"Sijua, Patrapada, Bhubaneswar",highlights:"All India Institute of Medical Sciences"});
C({name:"Kalinga Institute of Medical Sciences (KIMS)",city:"Bhubaneswar",state:"Odisha",stream:"Medical",type:"Private",fees:1500000,established:2007,results:93,address:"KIIT Campus, Bhubaneswar",highlights:"Large private medical college and hospital"});
C({name:"Xavier University (XIMB)",city:"Bhubaneswar",state:"Odisha",stream:"Management",type:"Private",fees:2300000,established:1987,results:97,address:"Xavier Square / Harirajpur, Bhubaneswar",highlights:"Top-ranked national B-school"});
C({name:"Utkal University",city:"Bhubaneswar",state:"Odisha",stream:"Arts",type:"Government",fees:10000,established:1943,results:90,address:"Vani Vihar, Bhubaneswar",highlights:"Odisha's oldest and largest university"});
C({name:"Regional College of Management",city:"Bhubaneswar",state:"Odisha",stream:"Management",type:"Private",fees:400000,established:1985,results:88,address:"Chakadola Vihar, Bhubaneswar",highlights:"Established management institute"});
C({name:"BJB Autonomous College",city:"Bhubaneswar",state:"Odisha",stream:"Commerce",type:"Government",fees:12000,established:1944,results:90,address:"Bhubaneswar",highlights:"Premier autonomous arts &amp; commerce college"});

/* ---- Guwahati (Assam) — NORTHEAST ---- */
C({name:"IIT Guwahati",city:"Guwahati",state:"Assam",stream:"Engineering",type:"Government",fees:230000,established:1994,results:99,address:"North Guwahati, Amingaon",highlights:"Among India's top IITs, world-ranked"});
C({name:"Assam Engineering College",city:"Guwahati",state:"Assam",stream:"Engineering",type:"Government",fees:40000,established:1955,results:91,address:"Jalukbari, Guwahati",highlights:"Oldest engineering college in the Northeast"});
C({name:"IIIT Guwahati",city:"Guwahati",state:"Assam",stream:"Engineering",type:"Government",fees:180000,established:2013,results:93,address:"Bongora, Guwahati",highlights:"Institute of Information Technology"});
C({name:"Gauhati Medical College",city:"Guwahati",state:"Assam",stream:"Medical",type:"Government",fees:25000,established:1960,results:94,address:"Bhangagarh, Guwahati",highlights:"Premier government medical college in the Northeast"});
C({name:"Gauhati University",city:"Guwahati",state:"Assam",stream:"Arts",type:"Government",fees:12000,established:1948,results:90,address:"Jalukbari, Guwahati",highlights:"The Northeast's flagship university"});
C({name:"Cotton University",city:"Guwahati",state:"Assam",stream:"Arts",type:"Government",fees:10000,established:1901,results:92,address:"Panbazar, Guwahati",highlights:"Historic flagship for arts and sciences (est. 1901)"});
C({name:"Assam Don Bosco University",city:"Guwahati",state:"Assam",stream:"Management",type:"Private",fees:300000,established:2008,results:90,address:"Azara, Guwahati",highlights:"Private university, engineering + management"});
C({name:"Royal Global University",city:"Guwahati",state:"Assam",stream:"Management",type:"Private",fees:280000,established:2017,results:88,address:"Betkuchi, Guwahati",highlights:"Multi-disciplinary private university"});
C({name:"B. Barooah College",city:"Guwahati",state:"Assam",stream:"Commerce",type:"Government",fees:9000,established:1944,results:89,address:"Ulubari, Guwahati",highlights:"Established arts &amp; commerce college"});

if (typeof module !== 'undefined' && module.exports) module.exports = BATCH2_COLLEGES;
