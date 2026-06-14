/* ============================================================================
   SCHOOLS BATCH 3 — Bhubaneswar, Guwahati, Trivandrum
   (last 3 cities missing from Schools but present in Hospitals/Restaurants)
   Integrity: real names/boards/localities/established; approximate fees;
   no fabricated ratings. Import: /seed-schools-batch3.html (additive, once).
   ========================================================================== */
var BATCH3_SCHOOLS = [];
function S(o){ BATCH3_SCHOOLS.push(o); }

/* ---- Bhubaneswar (Odisha) ---- */
S({name:"Sai International School",city:"Bhubaneswar",state:"Odisha",board:"CBSE",type:"Co-ed",fees:130000,established:2007,results:98,studentTeacherRatio:"18:1",address:"Chandrasekharpur, Bhubaneswar",highlights:"One of Odisha's top-ranked CBSE schools"});
S({name:"Delhi Public School Kalinga",city:"Bhubaneswar",state:"Odisha",board:"CBSE",type:"Co-ed",fees:90000,established:2008,results:97,studentTeacherRatio:"22:1",address:"Mahalaxmi Vihar, Bhubaneswar",highlights:"Leading CBSE school"});
S({name:"KIIT International School",city:"Bhubaneswar",state:"Odisha",board:"CBSE",type:"Co-ed",fees:150000,results:97,studentTeacherRatio:"16:1",address:"KIIT Campus, Patia, Bhubaneswar",highlights:"Residential + day, part of KIIT group"});
S({name:"Mother's Public School",city:"Bhubaneswar",state:"Odisha",board:"CBSE",type:"Co-ed",fees:70000,established:1981,results:97,studentTeacherRatio:"24:1",address:"Unit-1, Bhubaneswar",highlights:"Long-established, strong board results"});
S({name:"DAV Public School Chandrasekharpur",city:"Bhubaneswar",state:"Odisha",board:"CBSE",type:"Co-ed",fees:55000,results:96,studentTeacherRatio:"26:1",address:"Chandrasekharpur, Bhubaneswar",highlights:"Popular DAV chain school"});
S({name:"St. Joseph's High School",city:"Bhubaneswar",state:"Odisha",board:"ICSE",type:"Co-ed",fees:50000,results:96,studentTeacherRatio:"26:1",address:"Sundarpada, Bhubaneswar",highlights:"Reputed ICSE school"});
S({name:"Loyola School Bhubaneswar",city:"Bhubaneswar",state:"Odisha",board:"ICSE",type:"Co-ed",fees:55000,results:96,studentTeacherRatio:"24:1",address:"Niladri Vihar, Bhubaneswar",highlights:"Jesuit-run ICSE school"});
S({name:"Sri Sri Academy Bhubaneswar",city:"Bhubaneswar",state:"Odisha",board:"CBSE",type:"Co-ed",fees:65000,results:95,studentTeacherRatio:"24:1",address:"Patia, Bhubaneswar",highlights:"Values-based CBSE school"});
S({name:"Prabhujee English Medium School",city:"Bhubaneswar",state:"Odisha",board:"ICSE",type:"Co-ed",fees:45000,results:95,studentTeacherRatio:"26:1",address:"Saheed Nagar, Bhubaneswar",highlights:"Established ICSE school"});
S({name:"Kendriya Vidyalaya No.1 Bhubaneswar",city:"Bhubaneswar",state:"Odisha",board:"CBSE",type:"Co-ed",fees:28000,results:95,studentTeacherRatio:"32:1",address:"Unit-9, Bhubaneswar",highlights:"Central government school"});

/* ---- Guwahati (Assam) ---- */
S({name:"Delhi Public School Guwahati",city:"Guwahati",state:"Assam",board:"CBSE",type:"Co-ed",fees:90000,established:2004,results:97,studentTeacherRatio:"22:1",address:"NH-37, Guwahati",highlights:"Leading CBSE school in the Northeast"});
S({name:"Don Bosco School Panbazar",city:"Guwahati",state:"Assam",board:"ICSE",type:"Boys",fees:55000,established:1922,results:97,studentTeacherRatio:"26:1",address:"Panbazar, Guwahati",highlights:"Historic Salesian school"});
S({name:"Maria's Public School",city:"Guwahati",state:"Assam",board:"CBSE",type:"Co-ed",fees:60000,results:96,studentTeacherRatio:"24:1",address:"Kahilipara, Guwahati",highlights:"Popular co-ed CBSE school"});
S({name:"Faculty Higher Secondary School",city:"Guwahati",state:"Assam",board:"CBSE",type:"Co-ed",fees:50000,results:96,studentTeacherRatio:"26:1",address:"Rehabari, Guwahati",highlights:"Well-regarded CBSE school"});
S({name:"South Point School",city:"Guwahati",state:"Assam",board:"CBSE",type:"Co-ed",fees:65000,results:96,studentTeacherRatio:"24:1",address:"Christian Basti, Guwahati",highlights:"Established CBSE school"});
S({name:"Sankardev Vidya Niketan",city:"Guwahati",state:"Assam",board:"CBSE",type:"Co-ed",fees:40000,results:95,studentTeacherRatio:"28:1",address:"Beltola, Guwahati",highlights:"Reputed local CBSE school"});
S({name:"Holy Child School",city:"Guwahati",state:"Assam",board:"ICSE",type:"Co-ed",fees:45000,results:95,studentTeacherRatio:"28:1",address:"Christian Basti, Guwahati",highlights:"Convent ICSE school"});
S({name:"Maharishi Vidya Mandir Guwahati",city:"Guwahati",state:"Assam",board:"CBSE",type:"Co-ed",fees:42000,results:95,studentTeacherRatio:"28:1",address:"Lokhra, Guwahati",highlights:"Part of Maharishi group"});
S({name:"Kendriya Vidyalaya Khanapara",city:"Guwahati",state:"Assam",board:"CBSE",type:"Co-ed",fees:28000,results:95,studentTeacherRatio:"32:1",address:"Khanapara, Guwahati",highlights:"Central government school"});

/* ---- Trivandrum / Thiruvananthapuram (Kerala) ---- */
S({name:"Loyola School Trivandrum",city:"Trivandrum",state:"Kerala",board:"CBSE",type:"Co-ed",fees:70000,established:1963,results:98,studentTeacherRatio:"22:1",address:"Sreekariyam, Trivandrum",highlights:"One of Kerala's top schools, Jesuit-run"});
S({name:"Christ Nagar School",city:"Trivandrum",state:"Kerala",board:"ICSE",type:"Co-ed",fees:60000,established:1964,results:98,studentTeacherRatio:"24:1",address:"Thiruvallam, Trivandrum",highlights:"Top-ranked ICSE school"});
S({name:"Trivandrum International School",city:"Trivandrum",state:"Kerala",board:"IB",type:"Co-ed",fees:400000,established:2003,results:98,studentTeacherRatio:"12:1",address:"Korani, Trivandrum",highlights:"IB World School + IGCSE"});
S({name:"Holy Angels' Convent",city:"Trivandrum",state:"Kerala",board:"ICSE",type:"Girls",fees:45000,results:97,studentTeacherRatio:"26:1",address:"Nanthancode, Trivandrum",highlights:"Reputed girls' convent school"});
S({name:"Sarvodaya Vidyalaya",city:"Trivandrum",state:"Kerala",board:"CBSE",type:"Co-ed",fees:50000,results:97,studentTeacherRatio:"24:1",address:"Nalanchira, Trivandrum",highlights:"Well-regarded CBSE school"});
S({name:"St. Thomas Central School",city:"Trivandrum",state:"Kerala",board:"CBSE",type:"Co-ed",fees:48000,results:96,studentTeacherRatio:"26:1",address:"Mukkolakkal, Trivandrum",highlights:"Popular CBSE school"});
S({name:"Bhavan's Vidya Mandir Girinagar",city:"Trivandrum",state:"Kerala",board:"CBSE",type:"Co-ed",fees:45000,results:96,studentTeacherRatio:"26:1",address:"Girinagar, Trivandrum",highlights:"Bharatiya Vidya Bhavan school"});
S({name:"Arya Central School",city:"Trivandrum",state:"Kerala",board:"CBSE",type:"Co-ed",fees:42000,results:95,studentTeacherRatio:"28:1",address:"Pattom, Trivandrum",highlights:"Established CBSE school"});
S({name:"Kendriya Vidyalaya Pattom",city:"Trivandrum",state:"Kerala",board:"CBSE",type:"Co-ed",fees:28000,established:1964,results:96,studentTeacherRatio:"32:1",address:"Pattom, Trivandrum",highlights:"Historic central government school"});

if (typeof module !== 'undefined' && module.exports) module.exports = BATCH3_SCHOOLS;
