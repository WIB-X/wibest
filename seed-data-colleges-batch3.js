/* ============================================================================
   COLLEGES BATCH 3 — Gurugram, Noida, Dehradun (close the North loop:
   these had schools but no colleges). Real names/streams/localities/
   established; approximate fees; no fabricated ratings.
   Import: /seed-colleges-batch3.html (additive, run once).
   ========================================================================== */
var BATCH3_COLLEGES = [];
function C(o){ BATCH3_COLLEGES.push(o); }

/* ---- Gurugram (Haryana) ---- */
C({name:"Management Development Institute (MDI Gurgaon)",city:"Gurugram",state:"Haryana",stream:"Management",type:"Private",fees:2400000,established:1973,results:98,address:"Mehrauli Road, Sukhrali, Gurugram",highlights:"One of India's top B-schools, elite placements"});
C({name:"NorthCap University",city:"Gurugram",state:"Haryana",stream:"Engineering",type:"Private",fees:350000,established:1996,results:90,address:"Sector 23A, Gurugram",highlights:"Established private engineering university"});
C({name:"Amity University Gurugram",city:"Gurugram",state:"Haryana",stream:"Engineering",type:"Private",fees:320000,established:2010,results:89,address:"Panchgaon, Manesar, Gurugram",highlights:"Multi-disciplinary private university"});
C({name:"SGT University",city:"Gurugram",state:"Haryana",stream:"Medical",type:"Private",fees:1200000,established:2013,results:90,address:"Budhera, Gurugram",highlights:"Medical, dental and engineering programmes"});
C({name:"GD Goenka University",city:"Gurugram",state:"Haryana",stream:"Management",type:"Private",fees:600000,established:2013,results:88,address:"Sohna Road, Gurugram",highlights:"Private university, management and law"});
C({name:"KR Mangalam University",city:"Gurugram",state:"Haryana",stream:"Engineering",type:"Private",fees:300000,established:2013,results:88,address:"Sohna Road, Gurugram",highlights:"Multi-disciplinary private university"});
C({name:"Dronacharya College of Engineering",city:"Gurugram",state:"Haryana",stream:"Engineering",type:"Private",fees:200000,established:1998,results:86,address:"Khentawas, Gurugram",highlights:"Established engineering college"});
C({name:"Gurugram University",city:"Gurugram",state:"Haryana",stream:"Arts",type:"Government",fees:20000,established:2017,results:87,address:"Sector 51, Gurugram",highlights:"State university for arts, commerce and science"});

/* ---- Noida / Greater Noida (Uttar Pradesh) ---- */
C({name:"Shiv Nadar University",city:"Noida",state:"Uttar Pradesh",stream:"Engineering",type:"Private",fees:500000,established:2011,results:95,address:"Greater Noida",highlights:"Top private research university"});
C({name:"Bennett University",city:"Noida",state:"Uttar Pradesh",stream:"Engineering",type:"Private",fees:450000,established:2016,results:92,address:"Greater Noida",highlights:"Times Group university, strong placements"});
C({name:"Jaypee Institute of Information Technology (JIIT)",city:"Noida",state:"Uttar Pradesh",stream:"Engineering",type:"Private",fees:380000,established:2001,results:92,address:"Sector 62, Noida",highlights:"Well-placed engineering institute"});
C({name:"Amity University Noida",city:"Noida",state:"Uttar Pradesh",stream:"Engineering",type:"Private",fees:350000,established:2005,results:89,address:"Sector 125, Noida",highlights:"One of India's largest private universities"});
C({name:"Galgotias University",city:"Noida",state:"Uttar Pradesh",stream:"Engineering",type:"Private",fees:200000,established:2011,results:87,address:"Greater Noida",highlights:"Large private engineering university"});
C({name:"Sharda University",city:"Noida",state:"Uttar Pradesh",stream:"Medical",type:"Private",fees:1300000,established:2009,results:89,address:"Greater Noida",highlights:"Medical, dental and engineering programmes"});
C({name:"GL Bajaj Institute of Technology",city:"Noida",state:"Uttar Pradesh",stream:"Engineering",type:"Private",fees:180000,established:2008,results:88,address:"Greater Noida",highlights:"AKTU-affiliated, strong placements"});
C({name:"Jaypee Business School",city:"Noida",state:"Uttar Pradesh",stream:"Management",type:"Private",fees:600000,established:2003,results:88,address:"Sector 62, Noida",highlights:"Established management programme"});
C({name:"IMS Noida (Commerce & Management)",city:"Noida",state:"Uttar Pradesh",stream:"Commerce",type:"Private",fees:150000,established:1998,results:87,address:"Sector 62, Noida",highlights:"Management and commerce college"});

/* ---- Dehradun (Uttarakhand) ---- */
C({name:"University of Petroleum & Energy Studies (UPES)",city:"Dehradun",state:"Uttarakhand",stream:"Engineering",type:"Private",fees:450000,established:2003,results:93,address:"Bidholi, Dehradun",highlights:"Top private university, energy &amp; engineering focus"});
C({name:"Graphic Era University",city:"Dehradun",state:"Uttarakhand",stream:"Engineering",type:"Private",fees:280000,established:2008,results:90,address:"Clement Town, Dehradun",highlights:"Well-placed private engineering university"});
C({name:"DIT University",city:"Dehradun",state:"Uttarakhand",stream:"Engineering",type:"Private",fees:250000,established:1998,results:89,address:"Mussoorie Road, Dehradun",highlights:"Established engineering university"});
C({name:"Forest Research Institute (FRI)",city:"Dehradun",state:"Uttarakhand",stream:"Arts",type:"Government",fees:60000,established:1906,results:92,address:"New Forest, Dehradun",highlights:"Deemed university, forestry &amp; environmental science"});
C({name:"Doon University",city:"Dehradun",state:"Uttarakhand",stream:"Arts",type:"Government",fees:30000,established:2009,results:88,address:"Kedarpur, Dehradun",highlights:"State university, arts and sciences"});
C({name:"SGRR University",city:"Dehradun",state:"Uttarakhand",stream:"Medical",type:"Private",fees:1100000,established:2017,results:88,address:"Patel Nagar, Dehradun",highlights:"Medical and multi-disciplinary university"});
C({name:"Uttaranchal University",city:"Dehradun",state:"Uttarakhand",stream:"Management",type:"Private",fees:200000,established:2013,results:87,address:"Arcadia Grant, Dehradun",highlights:"Law, management and engineering"});
C({name:"ICFAI University Dehradun",city:"Dehradun",state:"Uttarakhand",stream:"Management",type:"Private",fees:250000,established:2011,results:87,address:"Selaqui, Dehradun",highlights:"Management and law programmes"});

if (typeof module !== 'undefined' && module.exports) module.exports = BATCH3_COLLEGES;
