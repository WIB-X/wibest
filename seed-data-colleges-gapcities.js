/* ============================================================================
   COLLEGES — GAP CITIES (11): Ahmedabad, Bhopal, Chandigarh, Kanpur,
   Mangalore, Nagpur, Nashik, Patna, Surat, Vadodara, Visakhapatnam.
   These city pages exist but had ZERO Firestore college data (noindexed
   2026-06-30 until this import). Real names/streams/localities/established;
   approximate annual fees; NO fabricated ratings (rating stays 0).
   Import: /seed-colleges-gapcities.html (additive, run once).
   ========================================================================== */
var GAP_COLLEGES = [];
function C(o){ GAP_COLLEGES.push(o); }

/* ---- Ahmedabad (Gujarat) ---- */
C({name:"IIM Ahmedabad",city:"Ahmedabad",state:"Gujarat",stream:"Management",type:"Government",fees:1750000,established:1961,results:99,address:"Vastrapur, Ahmedabad",highlights:"India's premier B-school, top placements"});
C({name:"CEPT University",city:"Ahmedabad",state:"Gujarat",stream:"Arts",type:"Private",fees:400000,established:1962,results:93,address:"Navrangpura, Ahmedabad",highlights:"Premier architecture, planning and design university"});
C({name:"Nirma University",city:"Ahmedabad",state:"Gujarat",stream:"Engineering",type:"Private",fees:230000,established:2003,results:92,address:"Sarkhej-Gandhinagar Highway, Ahmedabad",highlights:"Top private engineering and management university in Gujarat"});
C({name:"LD College of Engineering",city:"Ahmedabad",state:"Gujarat",stream:"Engineering",type:"Government",fees:15000,established:1948,results:91,address:"Navrangpura, Ahmedabad",highlights:"Gujarat's leading government engineering college"});
C({name:"B.J. Medical College",city:"Ahmedabad",state:"Gujarat",stream:"Medical",type:"Government",fees:25000,established:1946,results:95,address:"Asarwa, Ahmedabad",highlights:"One of Gujarat's oldest and largest government medical colleges"});
C({name:"Ahmedabad University",city:"Ahmedabad",state:"Gujarat",stream:"Management",type:"Private",fees:350000,established:2009,results:90,address:"Navrangpura, Ahmedabad",highlights:"Research-focused private university, liberal education"});
C({name:"MICA",city:"Ahmedabad",state:"Gujarat",stream:"Management",type:"Private",fees:1125000,established:1991,results:96,address:"Shela, Ahmedabad",highlights:"India's leading strategic marketing and communications school"});
C({name:"St. Xavier's College Ahmedabad",city:"Ahmedabad",state:"Gujarat",stream:"Arts",type:"Private",fees:15000,established:1955,results:89,address:"Navrangpura, Ahmedabad",highlights:"Reputed arts and science college, Gujarat University affiliated"});
C({name:"GLS University",city:"Ahmedabad",state:"Gujarat",stream:"Commerce",type:"Private",fees:80000,established:2015,results:88,address:"Law Garden, Ahmedabad",highlights:"Commerce and management focus, long-running GLS institutions"});
C({name:"Gujarat University",city:"Ahmedabad",state:"Gujarat",stream:"Arts",type:"Government",fees:10000,established:1949,results:86,address:"Navrangpura, Ahmedabad",highlights:"Large state university, arts, science and commerce"});

/* ---- Bhopal (Madhya Pradesh) ---- */
C({name:"MANIT Bhopal (NIT)",city:"Bhopal",state:"Madhya Pradesh",stream:"Engineering",type:"Government",fees:140000,established:1960,results:93,address:"Link Road No. 3, Bhopal",highlights:"National Institute of Technology, strong core placements"});
C({name:"IISER Bhopal",city:"Bhopal",state:"Madhya Pradesh",stream:"Arts",type:"Government",fees:65000,established:2008,results:94,address:"Bhauri, Bhopal",highlights:"Premier science education and research institute (BS-MS)"});
C({name:"Gandhi Medical College",city:"Bhopal",state:"Madhya Pradesh",stream:"Medical",type:"Government",fees:30000,established:1955,results:94,address:"Royal Market, Bhopal",highlights:"Leading government medical college of MP"});
C({name:"NLIU Bhopal",city:"Bhopal",state:"Madhya Pradesh",stream:"Arts",type:"Government",fees:250000,established:1997,results:93,address:"Kerwa Dam Road, Bhopal",highlights:"National Law Institute University, top-10 law school"});
C({name:"IIFM Bhopal",city:"Bhopal",state:"Madhya Pradesh",stream:"Management",type:"Government",fees:600000,established:1982,results:92,address:"Nehru Nagar, Bhopal",highlights:"Indian Institute of Forest Management, sectoral MBA"});
C({name:"VIT Bhopal University",city:"Bhopal",state:"Madhya Pradesh",stream:"Engineering",type:"Private",fees:200000,established:2017,results:90,address:"Kothri Kalan, Sehore (Bhopal)",highlights:"VIT group campus, modern curriculum"});
C({name:"LNCT Bhopal",city:"Bhopal",state:"Madhya Pradesh",stream:"Engineering",type:"Private",fees:120000,established:1994,results:88,address:"Kalchuri Nagar, Raisen Road, Bhopal",highlights:"Established private engineering group"});
C({name:"Barkatullah University",city:"Bhopal",state:"Madhya Pradesh",stream:"Arts",type:"Government",fees:12000,established:1970,results:85,address:"Hoshangabad Road, Bhopal",highlights:"State university, arts, science and commerce"});
C({name:"Oriental Institute of Science & Technology",city:"Bhopal",state:"Madhya Pradesh",stream:"Engineering",type:"Private",fees:110000,established:1995,results:87,address:"Raisen Road, Bhopal",highlights:"Established private engineering institute"});

/* ---- Chandigarh ---- */
C({name:"Panjab University",city:"Chandigarh",state:"Chandigarh",stream:"Arts",type:"Government",fees:20000,established:1882,results:92,address:"Sector 14, Chandigarh",highlights:"Historic state university with top NIRF ranking"});
C({name:"Punjab Engineering College (PEC)",city:"Chandigarh",state:"Chandigarh",stream:"Engineering",type:"Government",fees:110000,established:1921,results:93,address:"Sector 12, Chandigarh",highlights:"Deemed university, one of India's oldest engineering colleges"});
C({name:"UIET Panjab University",city:"Chandigarh",state:"Chandigarh",stream:"Engineering",type:"Government",fees:90000,established:2002,results:90,address:"Sector 25, Chandigarh",highlights:"University Institute of Engineering & Technology"});
C({name:"Government Medical College & Hospital (GMCH)",city:"Chandigarh",state:"Chandigarh",stream:"Medical",type:"Government",fees:40000,established:1991,results:94,address:"Sector 32, Chandigarh",highlights:"Leading government medical college of the region"});
C({name:"University Business School (UBS)",city:"Chandigarh",state:"Chandigarh",stream:"Management",type:"Government",fees:70000,established:1968,results:91,address:"Panjab University, Chandigarh",highlights:"Value-for-money MBA with strong North-India recruiter base"});
C({name:"DAV College Chandigarh",city:"Chandigarh",state:"Chandigarh",stream:"Commerce",type:"Private",fees:30000,established:1958,results:88,address:"Sector 10, Chandigarh",highlights:"Reputed college for commerce and sciences"});
C({name:"GGDSD College",city:"Chandigarh",state:"Chandigarh",stream:"Commerce",type:"Private",fees:35000,established:1973,results:88,address:"Sector 32, Chandigarh",highlights:"Popular commerce and BBA college"});
C({name:"Post Graduate Government College",city:"Chandigarh",state:"Chandigarh",stream:"Arts",type:"Government",fees:12000,established:1953,results:86,address:"Sector 11, Chandigarh",highlights:"Well-regarded government college for arts and science"});

/* ---- Kanpur (Uttar Pradesh) ---- */
C({name:"IIT Kanpur",city:"Kanpur",state:"Uttar Pradesh",stream:"Engineering",type:"Government",fees:230000,established:1959,results:98,address:"Kalyanpur, Kanpur",highlights:"One of India's top IITs, elite placements and research"});
C({name:"Harcourt Butler Technical University (HBTU)",city:"Kanpur",state:"Uttar Pradesh",stream:"Engineering",type:"Government",fees:110000,established:1921,results:91,address:"Nawabganj, Kanpur",highlights:"Historic technical university, strong UP recruiter base"});
C({name:"GSVM Medical College",city:"Kanpur",state:"Uttar Pradesh",stream:"Medical",type:"Government",fees:35000,established:1956,results:93,address:"Swaroop Nagar, Kanpur",highlights:"Major government medical college of UP"});
C({name:"CSJM Kanpur University",city:"Kanpur",state:"Uttar Pradesh",stream:"Arts",type:"Government",fees:12000,established:1966,results:85,address:"Kalyanpur, Kanpur",highlights:"Large state university, wide UG/PG programmes"});
C({name:"PSIT Kanpur",city:"Kanpur",state:"Uttar Pradesh",stream:"Engineering",type:"Private",fees:130000,established:2004,results:89,address:"Bhauti, Kanpur",highlights:"Prominent private engineering institute (AKTU)"});
C({name:"Christ Church College",city:"Kanpur",state:"Uttar Pradesh",stream:"Commerce",type:"Private",fees:20000,established:1866,results:87,address:"The Mall, Kanpur",highlights:"One of North India's oldest degree colleges"});
C({name:"DAV College Kanpur",city:"Kanpur",state:"Uttar Pradesh",stream:"Arts",type:"Private",fees:15000,established:1919,results:85,address:"Civil Lines, Kanpur",highlights:"Historic arts, science and commerce college"});
C({name:"Axis Institute of Technology & Management",city:"Kanpur",state:"Uttar Pradesh",stream:"Management",type:"Private",fees:90000,established:2008,results:85,address:"Rooma, Kanpur",highlights:"Private engineering and management campus"});

/* ---- Mangalore (Karnataka) ---- */
C({name:"NITK Surathkal",city:"Mangalore",state:"Karnataka",stream:"Engineering",type:"Government",fees:150000,established:1960,results:96,address:"Surathkal, Mangalore",highlights:"Top-10 NIT with beachside campus and elite placements"});
C({name:"Kasturba Medical College (KMC) Mangalore",city:"Mangalore",state:"Karnataka",stream:"Medical",type:"Private",fees:1500000,established:1955,results:95,address:"Light House Hill Road, Mangalore",highlights:"Manipal group's renowned medical college"});
C({name:"St Aloysius (Deemed to be University)",city:"Mangalore",state:"Karnataka",stream:"Arts",type:"Private",fees:60000,established:1880,results:90,address:"Light House Hill, Mangalore",highlights:"Historic Jesuit institution, arts, science and commerce"});
C({name:"Sahyadri College of Engineering & Management",city:"Mangalore",state:"Karnataka",stream:"Engineering",type:"Private",fees:160000,established:2007,results:89,address:"Adyar, Mangalore",highlights:"Modern private engineering campus, active placement cell"});
C({name:"Yenepoya (Deemed to be University)",city:"Mangalore",state:"Karnataka",stream:"Medical",type:"Private",fees:1300000,established:2008,results:91,address:"Deralakatte, Mangalore",highlights:"Medical, dental and allied health sciences"});
C({name:"Mangalore University",city:"Mangalore",state:"Karnataka",stream:"Arts",type:"Government",fees:15000,established:1980,results:86,address:"Mangalagangothri, Konaje",highlights:"State university serving coastal Karnataka"});
C({name:"Srinivas University",city:"Mangalore",state:"Karnataka",stream:"Management",type:"Private",fees:120000,established:2013,results:86,address:"Pandeshwar, Mangalore",highlights:"Private university, management and allied programmes"});
C({name:"AJ Institute of Medical Sciences",city:"Mangalore",state:"Karnataka",stream:"Medical",type:"Private",fees:1200000,established:2001,results:89,address:"Kuntikana, Mangalore",highlights:"Private medical college and research centre"});

/* ---- Nagpur (Maharashtra) ---- */
C({name:"VNIT Nagpur",city:"Nagpur",state:"Maharashtra",stream:"Engineering",type:"Government",fees:140000,established:1960,results:94,address:"South Ambazari Road, Nagpur",highlights:"Visvesvaraya NIT, strong core and software placements"});
C({name:"IIM Nagpur",city:"Nagpur",state:"Maharashtra",stream:"Management",type:"Government",fees:750000,established:2015,results:96,address:"MIHAN, Nagpur",highlights:"New-generation IIM with rapidly growing recruiter base"});
C({name:"AIIMS Nagpur",city:"Nagpur",state:"Maharashtra",stream:"Medical",type:"Government",fees:6500,established:2018,results:97,address:"MIHAN, Nagpur",highlights:"All India Institute of Medical Sciences"});
C({name:"Government Medical College (GMC) Nagpur",city:"Nagpur",state:"Maharashtra",stream:"Medical",type:"Government",fees:30000,established:1947,results:93,address:"Hanuman Nagar, Nagpur",highlights:"One of Maharashtra's largest government medical colleges"});
C({name:"RTM Nagpur University",city:"Nagpur",state:"Maharashtra",stream:"Arts",type:"Government",fees:12000,established:1923,results:85,address:"Chhaoni, Nagpur",highlights:"Historic state university of Vidarbha"});
C({name:"G.H. Raisoni College of Engineering",city:"Nagpur",state:"Maharashtra",stream:"Engineering",type:"Private",fees:150000,established:1996,results:89,address:"Hingna Road, Nagpur",highlights:"Autonomous private engineering college"});
C({name:"Yeshwantrao Chavan College of Engineering (YCCE)",city:"Nagpur",state:"Maharashtra",stream:"Engineering",type:"Private",fees:130000,established:1984,results:88,address:"Wanadongri, Nagpur",highlights:"Established autonomous engineering college"});
C({name:"Hislop College",city:"Nagpur",state:"Maharashtra",stream:"Arts",type:"Private",fees:15000,established:1883,results:86,address:"Civil Lines, Nagpur",highlights:"Historic arts, science and commerce college"});

/* ---- Nashik (Maharashtra) ---- */
C({name:"K.K. Wagh Institute of Engineering",city:"Nashik",state:"Maharashtra",stream:"Engineering",type:"Private",fees:130000,established:1984,results:89,address:"Amrutdham, Panchavati, Nashik",highlights:"Nashik's leading private engineering institute"});
C({name:"MET Institute of Engineering (Bhujbal Knowledge City)",city:"Nashik",state:"Maharashtra",stream:"Engineering",type:"Private",fees:120000,established:1993,results:87,address:"Adgaon, Nashik",highlights:"Established engineering campus"});
C({name:"Sandip University",city:"Nashik",state:"Maharashtra",stream:"Engineering",type:"Private",fees:180000,established:2017,results:86,address:"Mahiravani, Trimbak Road, Nashik",highlights:"Private university, engineering and management"});
C({name:"Maharashtra University of Health Sciences (MUHS)",city:"Nashik",state:"Maharashtra",stream:"Medical",type:"Government",fees:50000,established:1998,results:92,address:"Dindori Road, Nashik",highlights:"State health-sciences university headquartered in Nashik"});
C({name:"Symbiosis Institute of Operations Management (SIOM)",city:"Nashik",state:"Maharashtra",stream:"Management",type:"Private",fees:650000,established:2005,results:93,address:"Gangapur Road, Nashik",highlights:"Symbiosis's specialist operations MBA"});
C({name:"KTHM College",city:"Nashik",state:"Maharashtra",stream:"Arts",type:"Private",fees:12000,established:1969,results:86,address:"Gangapur Road, Nashik",highlights:"MVP Samaj's flagship arts, commerce and science college"});
C({name:"BYK College of Commerce",city:"Nashik",state:"Maharashtra",stream:"Commerce",type:"Private",fees:12000,established:1959,results:87,address:"College Road, Nashik",highlights:"Nashik's best-known commerce college"});
C({name:"NDMVP College of Engineering",city:"Nashik",state:"Maharashtra",stream:"Engineering",type:"Private",fees:120000,established:2001,results:86,address:"Gangapur Road, Nashik",highlights:"MVP Samaj engineering college"});

/* ---- Patna (Bihar) ---- */
C({name:"IIT Patna",city:"Patna",state:"Bihar",stream:"Engineering",type:"Government",fees:230000,established:2008,results:95,address:"Bihta, Patna",highlights:"IIT with fast-growing placement record"});
C({name:"NIT Patna",city:"Patna",state:"Bihar",stream:"Engineering",type:"Government",fees:140000,established:1886,results:92,address:"Ashok Rajpath, Patna",highlights:"One of India's oldest engineering institutions"});
C({name:"AIIMS Patna",city:"Patna",state:"Bihar",stream:"Medical",type:"Government",fees:6500,established:2012,results:96,address:"Phulwari Sharif, Patna",highlights:"All India Institute of Medical Sciences"});
C({name:"Patna Medical College (PMCH)",city:"Patna",state:"Bihar",stream:"Medical",type:"Government",fees:25000,established:1925,results:93,address:"Ashok Rajpath, Patna",highlights:"Bihar's historic government medical college"});
C({name:"Patna University",city:"Patna",state:"Bihar",stream:"Arts",type:"Government",fees:10000,established:1917,results:86,address:"Ashok Rajpath, Patna",highlights:"One of India's oldest universities"});
C({name:"Chanakya National Law University (CNLU)",city:"Patna",state:"Bihar",stream:"Arts",type:"Government",fees:160000,established:2006,results:91,address:"Mithapur, Patna",highlights:"Bihar's national law university"});
C({name:"Patna Women's College",city:"Patna",state:"Bihar",stream:"Arts",type:"Private",fees:25000,established:1940,results:88,address:"Bailey Road, Patna",highlights:"Autonomous, Bihar's premier women's college"});
C({name:"St. Xavier's College of Management & Technology",city:"Patna",state:"Bihar",stream:"Management",type:"Private",fees:150000,established:2010,results:86,address:"Digha Ghat, Patna",highlights:"Jesuit management and technology college"});

/* ---- Surat (Gujarat) ---- */
C({name:"SVNIT Surat",city:"Surat",state:"Gujarat",stream:"Engineering",type:"Government",fees:150000,established:1961,results:94,address:"Ichchhanath, Surat",highlights:"Sardar Vallabhbhai National Institute of Technology"});
C({name:"Government Medical College Surat",city:"Surat",state:"Gujarat",stream:"Medical",type:"Government",fees:25000,established:1964,results:93,address:"Majura Gate, Surat",highlights:"South Gujarat's main government medical college"});
C({name:"Veer Narmad South Gujarat University",city:"Surat",state:"Gujarat",stream:"Arts",type:"Government",fees:12000,established:1965,results:85,address:"Udhna-Magdalla Road, Surat",highlights:"State university for South Gujarat"});
C({name:"Sarvajanik College of Engineering & Technology (SCET)",city:"Surat",state:"Gujarat",stream:"Engineering",type:"Private",fees:95000,established:1995,results:88,address:"Athwalines, Surat",highlights:"Reputed grant-in-aid engineering college"});
C({name:"AURO University",city:"Surat",state:"Gujarat",stream:"Management",type:"Private",fees:250000,established:2011,results:86,address:"Hazira Road, Surat",highlights:"Private university, management, hospitality and law"});
C({name:"P P Savani University",city:"Surat",state:"Gujarat",stream:"Engineering",type:"Private",fees:150000,established:2017,results:85,address:"Kosamba, Surat",highlights:"New-generation private university"});
C({name:"Bhagwan Mahavir University",city:"Surat",state:"Gujarat",stream:"Commerce",type:"Private",fees:80000,established:2019,results:84,address:"Vesu, Surat",highlights:"Private university, commerce, engineering and design"});

/* ---- Vadodara (Gujarat) ---- */
C({name:"The Maharaja Sayajirao University of Baroda (MSU)",city:"Vadodara",state:"Gujarat",stream:"Arts",type:"Government",fees:15000,established:1949,results:91,address:"Pratapgunj, Vadodara",highlights:"Premier state university, English-medium since inception"});
C({name:"Faculty of Technology & Engineering, MSU",city:"Vadodara",state:"Gujarat",stream:"Engineering",type:"Government",fees:20000,established:1890,results:90,address:"Kalabhavan, Vadodara",highlights:"Historic engineering faculty with strong alumni network"});
C({name:"Medical College Baroda",city:"Vadodara",state:"Gujarat",stream:"Medical",type:"Government",fees:25000,established:1946,results:93,address:"Anandpura, Vadodara",highlights:"Major government medical college (SSG Hospital)"});
C({name:"Parul University",city:"Vadodara",state:"Gujarat",stream:"Engineering",type:"Private",fees:150000,established:2015,results:87,address:"Waghodia, Vadodara",highlights:"Large multi-disciplinary private university"});
C({name:"Navrachana University",city:"Vadodara",state:"Gujarat",stream:"Engineering",type:"Private",fees:200000,established:2009,results:86,address:"Vasna-Bhayli Road, Vadodara",highlights:"Private university, engineering, design and education"});
C({name:"Sumandeep Vidyapeeth",city:"Vadodara",state:"Gujarat",stream:"Medical",type:"Private",fees:1400000,established:2007,results:88,address:"Piparia, Vadodara",highlights:"Deemed university, medical and dental sciences"});
C({name:"GSFC University",city:"Vadodara",state:"Gujarat",stream:"Engineering",type:"Private",fees:100000,established:2015,results:85,address:"Fertilizer Nagar, Vadodara",highlights:"Industry-backed university (GSFC group)"});

/* ---- Visakhapatnam (Andhra Pradesh) ---- */
C({name:"Andhra University",city:"Visakhapatnam",state:"Andhra Pradesh",stream:"Arts",type:"Government",fees:25000,established:1926,results:88,address:"Waltair Junction, Visakhapatnam",highlights:"Historic state university with sprawling coastal campus"});
C({name:"AU College of Engineering",city:"Visakhapatnam",state:"Andhra Pradesh",stream:"Engineering",type:"Government",fees:35000,established:1955,results:90,address:"Andhra University, Visakhapatnam",highlights:"Andhra University's flagship engineering college"});
C({name:"GITAM (Deemed to be University)",city:"Visakhapatnam",state:"Andhra Pradesh",stream:"Engineering",type:"Private",fees:280000,established:1980,results:90,address:"Rushikonda, Visakhapatnam",highlights:"Large deemed university, engineering to management"});
C({name:"IIM Visakhapatnam",city:"Visakhapatnam",state:"Andhra Pradesh",stream:"Management",type:"Government",fees:800000,established:2015,results:96,address:"Gambheeram, Visakhapatnam",highlights:"New-generation IIM with strong early placement record"});
C({name:"Andhra Medical College",city:"Visakhapatnam",state:"Andhra Pradesh",stream:"Medical",type:"Government",fees:20000,established:1923,results:94,address:"Maharanipeta, Visakhapatnam",highlights:"One of India's oldest medical colleges"});
C({name:"Damodaram Sanjivayya National Law University (DSNLU)",city:"Visakhapatnam",state:"Andhra Pradesh",stream:"Arts",type:"Government",fees:180000,established:2008,results:90,address:"Sabbavaram, Visakhapatnam",highlights:"Andhra Pradesh's national law university"});
C({name:"Gayatri Vidya Parishad College of Engineering (GVP)",city:"Visakhapatnam",state:"Andhra Pradesh",stream:"Engineering",type:"Private",fees:120000,established:1996,results:89,address:"Madhurawada, Visakhapatnam",highlights:"Autonomous, one of AP's best private engineering colleges"});
C({name:"ANITS",city:"Visakhapatnam",state:"Andhra Pradesh",stream:"Engineering",type:"Private",fees:110000,established:2001,results:88,address:"Sangivalasa, Visakhapatnam",highlights:"Anil Neerukonda Institute of Technology & Sciences"});

if (typeof module !== 'undefined' && module.exports) module.exports = GAP_COLLEGES;
