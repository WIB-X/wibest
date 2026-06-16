/* ============================================================================
   NORTHEAST COLLEGES — Shillong, Imphal, Agartala. Deepening the NE.
   Flagships: IIM Shillong, NIT Manipur, NIT Agartala, central universities.
   Real names/streams/localities/established; approximate fees; no ratings.
   Import: /seed-colleges-northeast.html (additive, run once).
   ========================================================================== */
var NE_COLLEGES = [];
function C(o){ NE_COLLEGES.push(o); }

/* ---- Shillong (Meghalaya) ---- */
C({name:"IIM Shillong (RGIIM)",city:"Shillong",state:"Meghalaya",stream:"Management",type:"Government",fees:1600000,established:2007,results:99,address:"Umsawli, Shillong",highlights:"Rajiv Gandhi IIM — a top national B-school"});
C({name:"NEHU (North-Eastern Hill University)",city:"Shillong",state:"Meghalaya",stream:"Arts",type:"Government",fees:12000,established:1973,results:92,address:"Mawlai, Shillong",highlights:"Central university; arts, science and management"});
C({name:"NIT Meghalaya",city:"Shillong",state:"Meghalaya",stream:"Engineering",type:"Government",fees:160000,established:2010,results:93,address:"Bijni Complex, Shillong",highlights:"National Institute of Technology"});
C({name:"NEIGRIHMS (Medical)",city:"Shillong",state:"Meghalaya",stream:"Medical",type:"Government",fees:30000,established:1987,results:95,address:"Mawdiangdiang, Shillong",highlights:"Institute of National Importance for medicine"});
C({name:"St. Anthony's College",city:"Shillong",state:"Meghalaya",stream:"Arts",type:"Private",fees:18000,established:1934,results:93,address:"Bomfyle Road, Shillong",highlights:"Top-ranked arts &amp; science college"});
C({name:"St. Edmund's College",city:"Shillong",state:"Meghalaya",stream:"Arts",type:"Private",fees:16000,established:1923,results:92,address:"Laitumkhrah, Shillong",highlights:"Historic arts &amp; science college"});
C({name:"Lady Keane College",city:"Shillong",state:"Meghalaya",stream:"Commerce",type:"Government",fees:9000,established:1935,results:90,address:"Malki, Shillong",highlights:"Premier women's college"});
C({name:"Shillong College",city:"Shillong",state:"Meghalaya",stream:"Commerce",type:"Private",fees:10000,established:1980,results:89,address:"Boyce Road, Shillong",highlights:"Arts, science and commerce"});

/* ---- Imphal (Manipur) ---- */
C({name:"NIT Manipur",city:"Imphal",state:"Manipur",stream:"Engineering",type:"Government",fees:160000,established:2010,results:93,address:"Langol, Imphal",highlights:"National Institute of Technology"});
C({name:"Manipur University",city:"Imphal",state:"Manipur",stream:"Arts",type:"Government",fees:11000,established:1980,results:91,address:"Canchipur, Imphal",highlights:"Central university; arts, science and management"});
C({name:"RIMS Imphal (Medical)",city:"Imphal",state:"Manipur",stream:"Medical",type:"Government",fees:30000,established:1972,results:95,address:"Lamphelpat, Imphal",highlights:"Regional Institute of Medical Sciences"});
C({name:"JNIMS (Medical)",city:"Imphal",state:"Manipur",stream:"Medical",type:"Government",fees:28000,established:1996,results:93,address:"Porompat, Imphal",highlights:"Jawaharlal Nehru Institute of Medical Sciences"});
C({name:"DM College of Science",city:"Imphal",state:"Manipur",stream:"Arts",type:"Government",fees:8000,established:1934,results:90,address:"Imphal",highlights:"Historic science college"});
C({name:"Manipur Institute of Technology",city:"Imphal",state:"Manipur",stream:"Engineering",type:"Government",fees:60000,established:1983,results:88,address:"Takyelpat, Imphal",highlights:"State engineering institute"});
C({name:"DM College of Commerce",city:"Imphal",state:"Manipur",stream:"Commerce",type:"Government",fees:8000,established:1962,results:89,address:"Imphal",highlights:"Established commerce college"});
C({name:"Manipur International University",city:"Imphal",state:"Manipur",stream:"Management",type:"Private",fees:150000,established:2016,results:86,address:"Ghari, Imphal",highlights:"Private university, management and IT"});

/* ---- Agartala (Tripura) ---- */
C({name:"NIT Agartala",city:"Agartala",state:"Tripura",stream:"Engineering",type:"Government",fees:170000,established:1965,results:93,address:"Jirania, Agartala",highlights:"A leading National Institute of Technology"});
C({name:"Tripura University",city:"Agartala",state:"Tripura",stream:"Arts",type:"Government",fees:11000,established:1987,results:91,address:"Suryamaninagar, Agartala",highlights:"Central university; arts, science and management"});
C({name:"Agartala Govt Medical College (AGMC)",city:"Agartala",state:"Tripura",stream:"Medical",type:"Government",fees:30000,established:2005,results:93,address:"Kunjaban, Agartala",highlights:"Premier government medical college"});
C({name:"Tripura Medical College",city:"Agartala",state:"Tripura",stream:"Medical",type:"Government",fees:30000,established:2006,results:92,address:"Hapania, Agartala",highlights:"Government medical college and teaching hospital"});
C({name:"MBB College (Maharaja Bir Bikram)",city:"Agartala",state:"Tripura",stream:"Arts",type:"Government",fees:9000,established:1947,results:91,address:"College Tilla, Agartala",highlights:"Historic flagship arts &amp; science college"});
C({name:"ICFAI University Tripura",city:"Agartala",state:"Tripura",stream:"Management",type:"Private",fees:200000,established:2004,results:88,address:"Kamalghat, Agartala",highlights:"Private university, management and engineering"});
C({name:"Women's College Agartala",city:"Agartala",state:"Tripura",stream:"Commerce",type:"Government",fees:8000,established:1965,results:89,address:"Agartala",highlights:"Premier women's college"});
C({name:"Tripura Institute of Technology",city:"Agartala",state:"Tripura",stream:"Engineering",type:"Government",fees:50000,established:2003,results:87,address:"Narsingarh, Agartala",highlights:"State polytechnic/engineering institute"});

if (typeof module !== 'undefined' && module.exports) module.exports = NE_COLLEGES;
