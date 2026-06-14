/* ============================================================================
   NEW SCHOOL CITIES — seed data for the 11 cities that had ZERO schools in
   Firestore (their listing pages were noindexed for Soft 404).

   Cities: Ahmedabad, Bhopal, Chandigarh, Kanpur, Mangalore, Nagpur, Nashik,
           Patna, Surat, Vadodara, Visakhapatnam

   DATA PROVENANCE — READ BEFORE IMPORTING:
   - name, city, state, board, type, address(locality), established: real,
     publicly-verifiable facts for well-known schools in each city.
   - fees, results, studentTeacherRatio: APPROXIMATE representative values
     based on publicly-published ranges. VERIFY/EDIT before relying on them.
   - rating: intentionally omitted (0) — no ratings invented. Ratings should
     come from your own review-collection process, not be fabricated.

   Import: open /seed-new-school-cities.html while logged in as admin and click
   "Add new-city schools". It ADDS these (does not wipe existing data).
   ========================================================================== */
var NEW_SCHOOLS = [];
function S(o){ NEW_SCHOOLS.push(o); }

/* ---- Ahmedabad (Gujarat) ---- */
S({name:"Delhi Public School Bopal",city:"Ahmedabad",state:"Gujarat",board:"CBSE",type:"Co-ed",fees:95000,established:2004,results:96,studentTeacherRatio:"20:1",address:"Bopal, Ahmedabad",highlights:"Large CBSE campus, strong academics and sports"});
S({name:"Udgam School for Children",city:"Ahmedabad",state:"Gujarat",board:"CBSE",type:"Co-ed",fees:85000,established:1965,results:97,studentTeacherRatio:"22:1",address:"Thaltej, Ahmedabad",highlights:"Long-established CBSE school, consistent board results"});
S({name:"Anand Niketan School",city:"Ahmedabad",state:"Gujarat",board:"CBSE",type:"Co-ed",fees:80000,results:95,studentTeacherRatio:"22:1",address:"Shilaj / Satellite, Ahmedabad",highlights:"Multiple campuses, holistic curriculum"});
S({name:"Ahmedabad International School",city:"Ahmedabad",state:"Gujarat",board:"IB",type:"Co-ed",fees:250000,established:2002,results:98,studentTeacherRatio:"15:1",address:"Bodakdev, Ahmedabad",highlights:"IB World School (PYP, MYP, DP)"});
S({name:"Zydus School for Excellence",city:"Ahmedabad",state:"Gujarat",board:"CBSE",type:"Co-ed",fees:90000,results:96,studentTeacherRatio:"20:1",address:"Vejalpur / Godhavi, Ahmedabad",highlights:"Modern infrastructure, STEM focus"});
S({name:"St. Kabir School",city:"Ahmedabad",state:"Gujarat",board:"CBSE",type:"Co-ed",fees:75000,results:95,studentTeacherRatio:"24:1",address:"Drive-in Road, Ahmedabad",highlights:"Reputed city school, strong alumni network"});
S({name:"Nirma Vidyavihar",city:"Ahmedabad",state:"Gujarat",board:"CBSE",type:"Co-ed",fees:70000,established:1996,results:96,studentTeacherRatio:"22:1",address:"Vastrapur, Ahmedabad",highlights:"Part of Nirma education group"});
S({name:"Eklavya School",city:"Ahmedabad",state:"Gujarat",board:"IGCSE",type:"Co-ed",fees:180000,results:97,studentTeacherRatio:"16:1",address:"Bopal, Ahmedabad",highlights:"Cambridge curriculum, experiential learning"});
S({name:"Calorx Public School",city:"Ahmedabad",state:"Gujarat",board:"CBSE",type:"Co-ed",fees:65000,results:94,studentTeacherRatio:"25:1",address:"Ghatlodia / Mundra, Ahmedabad",highlights:"Affordable CBSE chain"});
S({name:"Kendriya Vidyalaya Ahmedabad Cantonment",city:"Ahmedabad",state:"Gujarat",board:"CBSE",type:"Co-ed",fees:30000,results:95,studentTeacherRatio:"30:1",address:"Cantonment, Ahmedabad",highlights:"Central government school, subsidised fees"});

/* ---- Bhopal (Madhya Pradesh) ---- */
S({name:"Delhi Public School Bhopal",city:"Bhopal",state:"Madhya Pradesh",board:"CBSE",type:"Co-ed",fees:90000,established:2000,results:96,studentTeacherRatio:"22:1",address:"Neelbad, Bhopal",highlights:"Flagship CBSE school with large campus"});
S({name:"Sagar Public School",city:"Bhopal",state:"Madhya Pradesh",board:"CBSE",type:"Co-ed",fees:70000,results:96,studentTeacherRatio:"24:1",address:"Saket Nagar / Gandhi Nagar, Bhopal",highlights:"Multiple campuses, strong board results"});
S({name:"Campion School",city:"Bhopal",state:"Madhya Pradesh",board:"ICSE",type:"Boys",fees:60000,established:1969,results:97,studentTeacherRatio:"25:1",address:"Idgah Hills, Bhopal",highlights:"One of Bhopal's oldest ICSE schools"});
S({name:"St. Joseph's Convent Girls School",city:"Bhopal",state:"Madhya Pradesh",board:"ICSE",type:"Girls",fees:55000,results:97,studentTeacherRatio:"26:1",address:"Idgah Hills, Bhopal",highlights:"Established convent school for girls"});
S({name:"The Sanskaar Valley School",city:"Bhopal",state:"Madhya Pradesh",board:"CBSE",type:"Co-ed",fees:160000,established:2008,results:97,studentTeacherRatio:"15:1",address:"Chandanpura, Bhopal",highlights:"Residential + day school, premium facilities"});
S({name:"Billabong High International School",city:"Bhopal",state:"Madhya Pradesh",board:"CBSE",type:"Co-ed",fees:95000,results:95,studentTeacherRatio:"20:1",address:"Kolar Road, Bhopal",highlights:"International curriculum approach"});
S({name:"Carmel Convent School",city:"Bhopal",state:"Madhya Pradesh",board:"ICSE",type:"Co-ed",fees:50000,results:96,studentTeacherRatio:"28:1",address:"BHEL, Bhopal",highlights:"Well-regarded convent education"});
S({name:"Jawaharlal Nehru School",city:"Bhopal",state:"Madhya Pradesh",board:"CBSE",type:"Co-ed",fees:45000,results:94,studentTeacherRatio:"28:1",address:"Bairagarh, Bhopal",highlights:"Established city CBSE school"});
S({name:"IES Public School",city:"Bhopal",state:"Madhya Pradesh",board:"CBSE",type:"Co-ed",fees:60000,results:95,studentTeacherRatio:"24:1",address:"Kalkheda, Bhopal",highlights:"Part of IES education group"});
S({name:"Kendriya Vidyalaya No.1 Bhopal",city:"Bhopal",state:"Madhya Pradesh",board:"CBSE",type:"Co-ed",fees:28000,results:95,studentTeacherRatio:"32:1",address:"GTB Complex, Bhopal",highlights:"Central government school"});

/* ---- Chandigarh ---- */
S({name:"Vivek High School",city:"Chandigarh",state:"Chandigarh",board:"CBSE",type:"Co-ed",fees:120000,established:1985,results:98,studentTeacherRatio:"18:1",address:"Sector 38, Chandigarh",highlights:"Top-ranked Chandigarh school, strong results"});
S({name:"St. John's High School",city:"Chandigarh",state:"Chandigarh",board:"ICSE",type:"Boys",fees:90000,established:1959,results:98,studentTeacherRatio:"20:1",address:"Sector 26, Chandigarh",highlights:"Premier boys' ICSE school"});
S({name:"Sacred Heart Senior Secondary School",city:"Chandigarh",state:"Chandigarh",board:"ICSE",type:"Girls",fees:75000,established:1958,results:98,studentTeacherRatio:"22:1",address:"Sector 26, Chandigarh",highlights:"Leading girls' school"});
S({name:"St. Stephen's School",city:"Chandigarh",state:"Chandigarh",board:"CBSE",type:"Co-ed",fees:85000,results:97,studentTeacherRatio:"20:1",address:"Sector 45, Chandigarh",highlights:"Reputed co-ed CBSE school"});
S({name:"Bhavan Vidyalaya",city:"Chandigarh",state:"Chandigarh",board:"CBSE",type:"Co-ed",fees:80000,established:1983,results:97,studentTeacherRatio:"22:1",address:"Sector 27 / Sector 33, Chandigarh",highlights:"Bharatiya Vidya Bhavan school"});
S({name:"DAV Public School",city:"Chandigarh",state:"Chandigarh",board:"CBSE",type:"Co-ed",fees:70000,results:96,studentTeacherRatio:"24:1",address:"Sector 8, Chandigarh",highlights:"Established DAV chain school"});
S({name:"Carmel Convent School",city:"Chandigarh",state:"Chandigarh",board:"ICSE",type:"Girls",fees:72000,established:1958,results:98,studentTeacherRatio:"22:1",address:"Sector 9, Chandigarh",highlights:"Long-standing convent school"});
S({name:"Strawberry Fields High School",city:"Chandigarh",state:"Chandigarh",board:"CBSE",type:"Co-ed",fees:110000,results:97,studentTeacherRatio:"18:1",address:"Sector 26, Chandigarh",highlights:"Modern premium CBSE school"});
S({name:"Gurukul Global School",city:"Chandigarh",state:"Chandigarh",board:"CBSE",type:"Co-ed",fees:95000,results:96,studentTeacherRatio:"20:1",address:"Sector 20, Chandigarh",highlights:"Contemporary curriculum and facilities"});
S({name:"Government Model Senior Secondary School Sector 16",city:"Chandigarh",state:"Chandigarh",board:"CBSE",type:"Co-ed",fees:12000,results:92,studentTeacherRatio:"34:1",address:"Sector 16, Chandigarh",highlights:"Government school, minimal fees"});

/* ---- Kanpur (Uttar Pradesh) ---- */
S({name:"Delhi Public School Kanpur",city:"Kanpur",state:"Uttar Pradesh",board:"CBSE",type:"Co-ed",fees:80000,established:2001,results:96,studentTeacherRatio:"24:1",address:"Kalyanpur, Kanpur",highlights:"Leading CBSE school in Kanpur"});
S({name:"Seth M.R. Jaipuria School",city:"Kanpur",state:"Uttar Pradesh",board:"CBSE",type:"Co-ed",fees:70000,results:96,studentTeacherRatio:"24:1",address:"Vishal Nagar, Kanpur",highlights:"Reputed Jaipuria education group"});
S({name:"Sir Padampat Singhania Education Centre",city:"Kanpur",state:"Uttar Pradesh",board:"CBSE",type:"Co-ed",fees:75000,results:97,studentTeacherRatio:"22:1",address:"Kamla Nagar, Kanpur",highlights:"Strong academics, JK group school"});
S({name:"Mercy Memorial School",city:"Kanpur",state:"Uttar Pradesh",board:"ICSE",type:"Co-ed",fees:55000,results:96,studentTeacherRatio:"26:1",address:"Mall Road, Kanpur",highlights:"Established ICSE school"});
S({name:"St. Aloysius High School",city:"Kanpur",state:"Uttar Pradesh",board:"ICSE",type:"Boys",fees:50000,results:97,studentTeacherRatio:"28:1",address:"Civil Lines, Kanpur",highlights:"Historic boys' school"});
S({name:"Dr. Virendra Swarup Education Centre",city:"Kanpur",state:"Uttar Pradesh",board:"CBSE",type:"Co-ed",fees:48000,results:95,studentTeacherRatio:"28:1",address:"Avadhpuri / Civil Lines, Kanpur",highlights:"Popular CBSE chain in Kanpur"});
S({name:"Methodist High School",city:"Kanpur",state:"Uttar Pradesh",board:"ICSE",type:"Co-ed",fees:45000,results:95,studentTeacherRatio:"28:1",address:"Civil Lines, Kanpur",highlights:"Long-established mission school"});
S({name:"Guru Nanak Modern School",city:"Kanpur",state:"Uttar Pradesh",board:"CBSE",type:"Co-ed",fees:42000,results:94,studentTeacherRatio:"30:1",address:"Sarvodaya Nagar, Kanpur",highlights:"Established city school"});
S({name:"St. Mary's Convent School",city:"Kanpur",state:"Uttar Pradesh",board:"ICSE",type:"Girls",fees:46000,results:96,studentTeacherRatio:"28:1",address:"Cantonment, Kanpur",highlights:"Reputed girls' convent school"});
S({name:"Kendriya Vidyalaya IIT Kanpur",city:"Kanpur",state:"Uttar Pradesh",board:"CBSE",type:"Co-ed",fees:28000,results:96,studentTeacherRatio:"32:1",address:"IIT Campus, Kanpur",highlights:"Central school on IIT campus"});

/* ---- Mangalore (Karnataka) ---- */
S({name:"Lourdes Central School",city:"Mangalore",state:"Karnataka",board:"CBSE",type:"Co-ed",fees:70000,established:2005,results:97,studentTeacherRatio:"22:1",address:"Bejai, Mangalore",highlights:"Top CBSE school in Mangalore"});
S({name:"Delhi Public School Mangalore",city:"Mangalore",state:"Karnataka",board:"CBSE",type:"Co-ed",fees:85000,results:96,studentTeacherRatio:"22:1",address:"Kotekar, Mangalore",highlights:"Large modern CBSE campus"});
S({name:"Canara High School",city:"Mangalore",state:"Karnataka",board:"State",type:"Co-ed",fees:30000,established:1891,results:95,studentTeacherRatio:"30:1",address:"Dongerkery, Mangalore",highlights:"Historic Mangalore institution"});
S({name:"St. Aloysius High School",city:"Mangalore",state:"Karnataka",board:"State",type:"Boys",fees:35000,established:1880,results:96,studentTeacherRatio:"28:1",address:"Lighthouse Hill, Mangalore",highlights:"Iconic heritage school and college"});
S({name:"Gokuldas Vidya Bhavan",city:"Mangalore",state:"Karnataka",board:"CBSE",type:"Co-ed",fees:60000,results:96,studentTeacherRatio:"24:1",address:"Kadri, Mangalore",highlights:"Well-regarded CBSE school"});
S({name:"Sharada Vidyalaya",city:"Mangalore",state:"Karnataka",board:"CBSE",type:"Co-ed",fees:45000,results:95,studentTeacherRatio:"26:1",address:"Kodialbail, Mangalore",highlights:"Established city school"});
S({name:"Mount Carmel Central School",city:"Mangalore",state:"Karnataka",board:"CBSE",type:"Co-ed",fees:50000,results:95,studentTeacherRatio:"26:1",address:"Modankap, Bantwal Road, Mangalore",highlights:"Popular CBSE school"});
S({name:"Litera Valley Zee School",city:"Mangalore",state:"Karnataka",board:"CBSE",type:"Co-ed",fees:55000,results:94,studentTeacherRatio:"24:1",address:"Padil, Mangalore",highlights:"Modern co-ed school"});
S({name:"Sri Rama Vidyakendra",city:"Mangalore",state:"Karnataka",board:"CBSE",type:"Co-ed",fees:40000,results:95,studentTeacherRatio:"28:1",address:"Kalladka, Mangalore",highlights:"Value-based CBSE education"});
S({name:"Kendriya Vidyalaya Panambur",city:"Mangalore",state:"Karnataka",board:"CBSE",type:"Co-ed",fees:28000,results:95,studentTeacherRatio:"32:1",address:"Panambur, Mangalore",highlights:"Central government school"});

/* ---- Nagpur (Maharashtra) ---- */
S({name:"Centre Point School",city:"Nagpur",state:"Maharashtra",board:"CBSE",type:"Co-ed",fees:90000,established:1977,results:97,studentTeacherRatio:"20:1",address:"Katol Road / Wardha Road, Nagpur",highlights:"Top CBSE school, multiple campuses"});
S({name:"Delhi Public School Nagpur",city:"Nagpur",state:"Maharashtra",board:"CBSE",type:"Co-ed",fees:85000,results:96,studentTeacherRatio:"22:1",address:"MIHAN, Nagpur",highlights:"Large modern CBSE campus"});
S({name:"Bhavan's B.P. Vidya Mandir",city:"Nagpur",state:"Maharashtra",board:"CBSE",type:"Co-ed",fees:60000,results:96,studentTeacherRatio:"24:1",address:"Civil Lines / Srikrishna Nagar, Nagpur",highlights:"Bharatiya Vidya Bhavan school"});
S({name:"St. Paul School",city:"Nagpur",state:"Maharashtra",board:"ICSE",type:"Co-ed",fees:55000,results:96,studentTeacherRatio:"26:1",address:"Katol Road, Nagpur",highlights:"Reputed ICSE school"});
S({name:"Somalwar High School",city:"Nagpur",state:"Maharashtra",board:"State",type:"Co-ed",fees:35000,results:95,studentTeacherRatio:"30:1",address:"Ramdaspeth / Khamla, Nagpur",highlights:"Renowned for academic results"});
S({name:"Modern School Nagpur",city:"Nagpur",state:"Maharashtra",board:"CBSE",type:"Co-ed",fees:58000,results:95,studentTeacherRatio:"24:1",address:"Koradi Road, Nagpur",highlights:"Established CBSE school"});
S({name:"Podar International School",city:"Nagpur",state:"Maharashtra",board:"CBSE",type:"Co-ed",fees:70000,results:95,studentTeacherRatio:"22:1",address:"Besa, Nagpur",highlights:"Part of Podar education network"});
S({name:"St. Joseph's Convent School",city:"Nagpur",state:"Maharashtra",board:"ICSE",type:"Girls",fees:48000,results:96,studentTeacherRatio:"28:1",address:"Civil Lines, Nagpur",highlights:"Established girls' convent school"});
S({name:"Sandipani School",city:"Nagpur",state:"Maharashtra",board:"CBSE",type:"Co-ed",fees:50000,results:94,studentTeacherRatio:"26:1",address:"Wardhaman Nagar, Nagpur",highlights:"Value-based education"});
S({name:"Kendriya Vidyalaya Ajni Nagpur",city:"Nagpur",state:"Maharashtra",board:"CBSE",type:"Co-ed",fees:28000,results:95,studentTeacherRatio:"32:1",address:"Ajni, Nagpur",highlights:"Central government school"});

/* ---- Nashik (Maharashtra) ---- */
S({name:"Delhi Public School Nashik",city:"Nashik",state:"Maharashtra",board:"CBSE",type:"Co-ed",fees:80000,results:96,studentTeacherRatio:"22:1",address:"Pathardi Phata, Nashik",highlights:"Leading CBSE school"});
S({name:"Fravashi International Academy",city:"Nashik",state:"Maharashtra",board:"CBSE",type:"Co-ed",fees:95000,established:2005,results:97,studentTeacherRatio:"18:1",address:"Wadner, Nashik",highlights:"CBSE + Cambridge pathways"});
S({name:"Ashoka Universal School",city:"Nashik",state:"Maharashtra",board:"CBSE",type:"Co-ed",fees:100000,results:96,studentTeacherRatio:"18:1",address:"Wadala / Chandsi, Nashik",highlights:"CBSE and IB programmes"});
S({name:"Wisdom High International School",city:"Nashik",state:"Maharashtra",board:"IGCSE",type:"Co-ed",fees:160000,results:97,studentTeacherRatio:"15:1",address:"Gangapur Road, Nashik",highlights:"Cambridge international curriculum"});
S({name:"Symbiosis School Nashik",city:"Nashik",state:"Maharashtra",board:"CBSE",type:"Co-ed",fees:75000,results:95,studentTeacherRatio:"22:1",address:"Mahatma Nagar, Nashik",highlights:"Part of Symbiosis education group"});
S({name:"Boys Town Public School",city:"Nashik",state:"Maharashtra",board:"CBSE",type:"Co-ed",fees:120000,established:1981,results:96,studentTeacherRatio:"16:1",address:"Trimbak Road, Nashik",highlights:"Residential + day school, large campus"});
S({name:"Rasbihari International School",city:"Nashik",state:"Maharashtra",board:"CBSE",type:"Co-ed",fees:70000,results:95,studentTeacherRatio:"22:1",address:"Pumping Station, Nashik",highlights:"Established CBSE school"});
S({name:"Holy Cross Convent School",city:"Nashik",state:"Maharashtra",board:"State",type:"Girls",fees:35000,results:96,studentTeacherRatio:"28:1",address:"Sharanpur Road, Nashik",highlights:"Reputed convent school"});
S({name:"Purushottam English School",city:"Nashik",state:"Maharashtra",board:"State",type:"Co-ed",fees:30000,results:94,studentTeacherRatio:"30:1",address:"Tilakwadi, Nashik",highlights:"Established city school"});
S({name:"Kendriya Vidyalaya Nashik Road",city:"Nashik",state:"Maharashtra",board:"CBSE",type:"Co-ed",fees:28000,results:95,studentTeacherRatio:"32:1",address:"Nashik Road, Nashik",highlights:"Central government school"});

/* ---- Patna (Bihar) ---- */
S({name:"Delhi Public School Patna",city:"Patna",state:"Bihar",board:"CBSE",type:"Co-ed",fees:80000,established:1997,results:96,studentTeacherRatio:"24:1",address:"Bailey Road, Patna",highlights:"Leading CBSE school in Patna"});
S({name:"St. Michael's High School",city:"Patna",state:"Bihar",board:"ICSE",type:"Boys",fees:50000,established:1858,results:97,studentTeacherRatio:"28:1",address:"Digha Ghat, Patna",highlights:"One of Bihar's oldest schools"});
S({name:"Notre Dame Academy",city:"Patna",state:"Bihar",board:"ICSE",type:"Girls",fees:48000,results:98,studentTeacherRatio:"26:1",address:"Bahadurpur, Patna",highlights:"Top girls' school in Patna"});
S({name:"St. Karen's Secondary School",city:"Patna",state:"Bihar",board:"CBSE",type:"Co-ed",fees:55000,results:96,studentTeacherRatio:"24:1",address:"Gardanibagh / Patliputra, Patna",highlights:"Popular CBSE school"});
S({name:"Don Bosco Academy",city:"Patna",state:"Bihar",board:"CBSE",type:"Co-ed",fees:52000,results:96,studentTeacherRatio:"26:1",address:"Kurji, Patna",highlights:"Salesian education, strong results"});
S({name:"Loyola High School",city:"Patna",state:"Bihar",board:"ICSE",type:"Co-ed",fees:50000,results:97,studentTeacherRatio:"26:1",address:"Kurji, Patna",highlights:"Jesuit-run reputed school"});
S({name:"St. Xavier's High School",city:"Patna",state:"Bihar",board:"ICSE",type:"Co-ed",fees:50000,results:97,studentTeacherRatio:"26:1",address:"Gandhi Maidan, Patna",highlights:"Established Jesuit school"});
S({name:"Radiant International School",city:"Patna",state:"Bihar",board:"CBSE",type:"Co-ed",fees:58000,results:95,studentTeacherRatio:"24:1",address:"Danapur, Patna",highlights:"Modern CBSE school"});
S({name:"DAV Public School BSEB",city:"Patna",state:"Bihar",board:"CBSE",type:"Co-ed",fees:45000,results:95,studentTeacherRatio:"28:1",address:"BSEB Colony, Patna",highlights:"DAV chain school"});
S({name:"Kendriya Vidyalaya Bailey Road",city:"Patna",state:"Bihar",board:"CBSE",type:"Co-ed",fees:28000,results:95,studentTeacherRatio:"34:1",address:"Bailey Road, Patna",highlights:"Central government school"});

/* ---- Surat (Gujarat) ---- */
S({name:"Fountainhead School",city:"Surat",state:"Gujarat",board:"IB",type:"Co-ed",fees:280000,established:2007,results:98,studentTeacherRatio:"14:1",address:"Kunkni, Surat",highlights:"IB World School (PYP, MYP, DP)"});
S({name:"Delhi Public School Surat",city:"Surat",state:"Gujarat",board:"CBSE",type:"Co-ed",fees:85000,results:96,studentTeacherRatio:"22:1",address:"Bharthana-Vesu, Surat",highlights:"Leading CBSE school"});
S({name:"L.P. Savani Academy",city:"Surat",state:"Gujarat",board:"CBSE",type:"Co-ed",fees:65000,results:96,studentTeacherRatio:"24:1",address:"Adajan / Pal, Surat",highlights:"Large popular CBSE chain"});
S({name:"S.D. Jain Modern School",city:"Surat",state:"Gujarat",board:"CBSE",type:"Co-ed",fees:75000,results:96,studentTeacherRatio:"22:1",address:"Vesu, Surat",highlights:"Reputed modern co-ed school"});
S({name:"Lancers Army School",city:"Surat",state:"Gujarat",board:"CBSE",type:"Co-ed",fees:70000,results:96,studentTeacherRatio:"22:1",address:"Vesu, Surat",highlights:"Well-regarded CBSE school"});
S({name:"The Galaxy Education System",city:"Surat",state:"Gujarat",board:"CBSE",type:"Co-ed",fees:60000,results:95,studentTeacherRatio:"24:1",address:"Pal, Surat",highlights:"Modern campus and facilities"});
S({name:"P.P. Savani Chaitanya Vidya Sankul",city:"Surat",state:"Gujarat",board:"CBSE",type:"Co-ed",fees:62000,results:95,studentTeacherRatio:"24:1",address:"Abrama / Kosad, Surat",highlights:"Large education campus"});
S({name:"Ryan International School Surat",city:"Surat",state:"Gujarat",board:"CBSE",type:"Co-ed",fees:68000,results:95,studentTeacherRatio:"24:1",address:"Bhatar, Surat",highlights:"Part of Ryan group"});
S({name:"Bharti Vidya Bhavan",city:"Surat",state:"Gujarat",board:"CBSE",type:"Co-ed",fees:40000,results:94,studentTeacherRatio:"28:1",address:"Nanpura, Surat",highlights:"Established city school"});
S({name:"Kendriya Vidyalaya Surat",city:"Surat",state:"Gujarat",board:"CBSE",type:"Co-ed",fees:28000,results:95,studentTeacherRatio:"32:1",address:"Udhna, Surat",highlights:"Central government school"});

/* ---- Vadodara (Gujarat) ---- */
S({name:"Navrachana School",city:"Vadodara",state:"Gujarat",board:"CBSE",type:"Co-ed",fees:90000,established:1967,results:97,studentTeacherRatio:"20:1",address:"Sama / Sani, Vadodara",highlights:"Top school group, CBSE + IB campuses"});
S({name:"Baroda High School",city:"Vadodara",state:"Gujarat",board:"ICSE",type:"Co-ed",fees:55000,established:1947,results:97,studentTeacherRatio:"24:1",address:"Alkapuri / ONGC, Vadodara",highlights:"Historic, highly-regarded school"});
S({name:"Delhi Public School Vadodara",city:"Vadodara",state:"Gujarat",board:"CBSE",type:"Co-ed",fees:85000,results:96,studentTeacherRatio:"22:1",address:"Vadsar / Harni, Vadodara",highlights:"Leading CBSE school"});
S({name:"Bright School",city:"Vadodara",state:"Gujarat",board:"CBSE",type:"Co-ed",fees:60000,results:95,studentTeacherRatio:"24:1",address:"Gotri, Vadodara",highlights:"Established CBSE school"});
S({name:"Rosary School",city:"Vadodara",state:"Gujarat",board:"ICSE",type:"Co-ed",fees:52000,results:96,studentTeacherRatio:"26:1",address:"Fatehgunj, Vadodara",highlights:"Reputed ICSE school"});
S({name:"Nalanda International School",city:"Vadodara",state:"Gujarat",board:"CBSE",type:"Co-ed",fees:70000,results:95,studentTeacherRatio:"22:1",address:"New VIP Road, Vadodara",highlights:"Modern co-ed school"});
S({name:"Urmi School",city:"Vadodara",state:"Gujarat",board:"IGCSE",type:"Co-ed",fees:150000,results:97,studentTeacherRatio:"16:1",address:"Productivity Road, Vadodara",highlights:"Cambridge international curriculum"});
S({name:"Vidyani Higher Secondary School",city:"Vadodara",state:"Gujarat",board:"State",type:"Co-ed",fees:30000,results:94,studentTeacherRatio:"30:1",address:"Manjalpur, Vadodara",highlights:"Established Gujarati/English medium school"});
S({name:"Ambe Vidyalaya",city:"Vadodara",state:"Gujarat",board:"CBSE",type:"Co-ed",fees:45000,results:94,studentTeacherRatio:"26:1",address:"Gorwa, Vadodara",highlights:"Popular neighbourhood school"});
S({name:"Kendriya Vidyalaya No.1 Vadodara",city:"Vadodara",state:"Gujarat",board:"CBSE",type:"Co-ed",fees:28000,results:95,studentTeacherRatio:"32:1",address:"ITI Campus, Vadodara",highlights:"Central government school"});

/* ---- Visakhapatnam (Andhra Pradesh) ---- */
S({name:"Delhi Public School Visakhapatnam",city:"Visakhapatnam",state:"Andhra Pradesh",board:"CBSE",type:"Co-ed",fees:85000,results:96,studentTeacherRatio:"22:1",address:"Madhurawada, Visakhapatnam",highlights:"Leading CBSE school in the city"});
S({name:"Timpany School",city:"Visakhapatnam",state:"Andhra Pradesh",board:"ICSE",type:"Co-ed",fees:60000,established:1968,results:97,studentTeacherRatio:"24:1",address:"Siripuram, Visakhapatnam",highlights:"One of Vizag's oldest ICSE schools"});
S({name:"Visakha Valley School",city:"Visakhapatnam",state:"Andhra Pradesh",board:"ICSE",type:"Co-ed",fees:65000,results:97,studentTeacherRatio:"22:1",address:"Madhavadhara, Visakhapatnam",highlights:"Reputed ICSE school"});
S({name:"Sri Prakash Vidyaniketan",city:"Visakhapatnam",state:"Andhra Pradesh",board:"CBSE",type:"Co-ed",fees:70000,results:97,studentTeacherRatio:"20:1",address:"Pendurthi, Visakhapatnam",highlights:"Strong academics and results"});
S({name:"Gitanjali School",city:"Visakhapatnam",state:"Andhra Pradesh",board:"CBSE",type:"Co-ed",fees:75000,results:96,studentTeacherRatio:"20:1",address:"Marikavalasa, Visakhapatnam",highlights:"CBSE + IGCSE pathways"});
S({name:"Navy Children School",city:"Visakhapatnam",state:"Andhra Pradesh",board:"CBSE",type:"Co-ed",fees:40000,results:96,studentTeacherRatio:"26:1",address:"Naval Base, Visakhapatnam",highlights:"Well-regarded forces school"});
S({name:"St. Joseph's School for Girls",city:"Visakhapatnam",state:"Andhra Pradesh",board:"State",type:"Girls",fees:35000,results:96,studentTeacherRatio:"28:1",address:"Waltair, Visakhapatnam",highlights:"Established girls' school"});
S({name:"Daffodils School",city:"Visakhapatnam",state:"Andhra Pradesh",board:"CBSE",type:"Co-ed",fees:55000,results:95,studentTeacherRatio:"24:1",address:"Seethammadhara, Visakhapatnam",highlights:"Popular CBSE school"});
S({name:"Silver Oaks International School",city:"Visakhapatnam",state:"Andhra Pradesh",board:"IGCSE",type:"Co-ed",fees:140000,results:97,studentTeacherRatio:"16:1",address:"Bheemili Road, Visakhapatnam",highlights:"Cambridge international school"});
S({name:"Kendriya Vidyalaya No.1 Visakhapatnam",city:"Visakhapatnam",state:"Andhra Pradesh",board:"CBSE",type:"Co-ed",fees:28000,results:95,studentTeacherRatio:"32:1",address:"NAD, Visakhapatnam",highlights:"Central government school"});

if (typeof module !== 'undefined' && module.exports) module.exports = NEW_SCHOOLS;
