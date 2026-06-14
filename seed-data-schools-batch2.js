/* ============================================================================
   SCHOOLS BATCH 2 — Dehradun, Gurugram, Noida (missing from Schools section)
   Same integrity rules: real names/boards/localities/established; approximate
   fees/results/ratios (verify before relying); ratings intentionally blank.
   Import: /seed-schools-batch2.html (admin, additive, run once).
   ========================================================================== */
var BATCH2_SCHOOLS = [];
function S(o){ BATCH2_SCHOOLS.push(o); }

/* ---- Dehradun (Uttarakhand) — India's boarding-school capital ---- */
S({name:"The Doon School",city:"Dehradun",state:"Uttarakhand",board:"ICSE",type:"Boys",fees:1100000,established:1935,results:99,studentTeacherRatio:"8:1",address:"Mall Road, Dehradun",highlights:"India's most prestigious boys' boarding school; ICSE + IGCSE"});
S({name:"Welham Girls' School",city:"Dehradun",state:"Uttarakhand",board:"ICSE",type:"Girls",fees:900000,established:1957,results:99,studentTeacherRatio:"9:1",address:"Civil Lines, Dehradun",highlights:"Top girls' residential school"});
S({name:"Welham Boys' School",city:"Dehradun",state:"Uttarakhand",board:"ICSE",type:"Boys",fees:900000,established:1937,results:98,studentTeacherRatio:"9:1",address:"Circular Road, Dehradun",highlights:"Premier boys' boarding school"});
S({name:"Ecole Globale International Girls' School",city:"Dehradun",state:"Uttarakhand",board:"CBSE",type:"Girls",fees:850000,established:2006,results:97,studentTeacherRatio:"10:1",address:"Sahaspur, Dehradun",highlights:"Modern girls' boarding school, CBSE + Cambridge"});
S({name:"The Asian School",city:"Dehradun",state:"Uttarakhand",board:"CBSE",type:"Co-ed",fees:600000,established:1995,results:96,studentTeacherRatio:"12:1",address:"Vasant Vihar, Dehradun",highlights:"Co-ed residential CBSE school"});
S({name:"SelaQui International School",city:"Dehradun",state:"Uttarakhand",board:"CBSE",type:"Co-ed",fees:800000,established:2004,results:97,studentTeacherRatio:"10:1",address:"Chakrata Road, SelaQui, Dehradun",highlights:"Co-ed boarding, CBSE + IGCSE"});
S({name:"Brightlands School",city:"Dehradun",state:"Uttarakhand",board:"ICSE",type:"Co-ed",fees:200000,established:1950,results:96,studentTeacherRatio:"16:1",address:"Rajpur Road, Dehradun",highlights:"Established co-ed ICSE day school"});
S({name:"St. Joseph's Academy",city:"Dehradun",state:"Uttarakhand",board:"ICSE",type:"Boys",fees:90000,established:1934,results:96,studentTeacherRatio:"24:1",address:"Rajpur Road, Dehradun",highlights:"Historic boys' day school"});
S({name:"Convent of Jesus and Mary",city:"Dehradun",state:"Uttarakhand",board:"ICSE",type:"Girls",fees:85000,results:97,studentTeacherRatio:"24:1",address:"Convent Road, Dehradun",highlights:"Reputed girls' convent school"});
S({name:"Ann Mary School",city:"Dehradun",state:"Uttarakhand",board:"ICSE",type:"Co-ed",fees:110000,results:96,studentTeacherRatio:"20:1",address:"Jakhan, Rajpur Road, Dehradun",highlights:"Popular co-ed ICSE school"});
S({name:"Col. Brown Cambridge School",city:"Dehradun",state:"Uttarakhand",board:"ICSE",type:"Boys",fees:250000,established:1926,results:95,studentTeacherRatio:"15:1",address:"Rajpur Road, Dehradun",highlights:"Historic boys' boarding + day school"});
S({name:"Cambrian Hall",city:"Dehradun",state:"Uttarakhand",board:"CBSE",type:"Co-ed",fees:80000,results:95,studentTeacherRatio:"24:1",address:"Dalanwala, Dehradun",highlights:"Established CBSE day school"});
S({name:"Kendriya Vidyalaya FRI Dehradun",city:"Dehradun",state:"Uttarakhand",board:"CBSE",type:"Co-ed",fees:28000,results:95,studentTeacherRatio:"32:1",address:"FRI Campus, Dehradun",highlights:"Central government school"});

/* ---- Gurugram (Haryana) ---- */
S({name:"The Shri Ram School Aravali",city:"Gurugram",state:"Haryana",board:"ICSE",type:"Co-ed",fees:550000,established:2006,results:98,studentTeacherRatio:"14:1",address:"Aravali, V37, Gurugram",highlights:"Top-tier co-ed school, ICSE + IB"});
S({name:"Heritage Xperiential Learning School",city:"Gurugram",state:"Haryana",board:"IB",type:"Co-ed",fees:600000,established:2009,results:98,studentTeacherRatio:"12:1",address:"Sector 62, Gurugram",highlights:"Experiential learning, IB + CBSE"});
S({name:"Pathways World School",city:"Gurugram",state:"Haryana",board:"IB",type:"Co-ed",fees:900000,established:2003,results:98,studentTeacherRatio:"10:1",address:"Aravali Retreat, Gurugram",highlights:"IB residential + day school"});
S({name:"Lancers International School",city:"Gurugram",state:"Haryana",board:"IB",type:"Co-ed",fees:700000,results:97,studentTeacherRatio:"12:1",address:"Sector 53, Gurugram",highlights:"IB + IGCSE international school"});
S({name:"Scottish High International School",city:"Gurugram",state:"Haryana",board:"CBSE",type:"Co-ed",fees:350000,established:2006,results:97,studentTeacherRatio:"15:1",address:"Sector 57, Gurugram",highlights:"CBSE + Cambridge IGCSE"});
S({name:"GD Goenka World School",city:"Gurugram",state:"Haryana",board:"IB",type:"Co-ed",fees:800000,results:97,studentTeacherRatio:"10:1",address:"Sohna Road, Gurugram",highlights:"IB residential world school"});
S({name:"Suncity School",city:"Gurugram",state:"Haryana",board:"CBSE",type:"Co-ed",fees:200000,established:2002,results:96,studentTeacherRatio:"20:1",address:"Sector 54, Gurugram",highlights:"Popular CBSE school"});
S({name:"Delhi Public School Sector 45",city:"Gurugram",state:"Haryana",board:"CBSE",type:"Co-ed",fees:180000,results:97,studentTeacherRatio:"22:1",address:"Sector 45, Gurugram",highlights:"Leading CBSE school"});
S({name:"Excelsior American School",city:"Gurugram",state:"Haryana",board:"IGCSE",type:"Co-ed",fees:450000,results:97,studentTeacherRatio:"14:1",address:"Sector 43, Gurugram",highlights:"American curriculum + IGCSE"});
S({name:"Amity International School Sector 46",city:"Gurugram",state:"Haryana",board:"CBSE",type:"Co-ed",fees:160000,results:96,studentTeacherRatio:"24:1",address:"Sector 46, Gurugram",highlights:"Part of Amity group"});
S({name:"DAV Public School Sector 14",city:"Gurugram",state:"Haryana",board:"CBSE",type:"Co-ed",fees:90000,results:95,studentTeacherRatio:"26:1",address:"Sector 14, Gurugram",highlights:"Established DAV chain school"});
S({name:"Blue Bells Model School",city:"Gurugram",state:"Haryana",board:"CBSE",type:"Co-ed",fees:120000,results:95,studentTeacherRatio:"24:1",address:"Sector 4, Gurugram",highlights:"Reputed CBSE school"});
S({name:"Kendriya Vidyalaya Gurugram",city:"Gurugram",state:"Haryana",board:"CBSE",type:"Co-ed",fees:28000,results:95,studentTeacherRatio:"32:1",address:"Sector 14, Gurugram",highlights:"Central government school"});

/* ---- Noida (Uttar Pradesh) ---- */
S({name:"Step by Step School",city:"Noida",state:"Uttar Pradesh",board:"IB",type:"Co-ed",fees:450000,established:2004,results:98,studentTeacherRatio:"12:1",address:"Sector 132, Noida",highlights:"Top co-ed school, IB + CBSE"});
S({name:"Delhi Public School Noida",city:"Noida",state:"Uttar Pradesh",board:"CBSE",type:"Co-ed",fees:160000,established:1984,results:97,studentTeacherRatio:"22:1",address:"Sector 30, Noida",highlights:"Flagship CBSE school"});
S({name:"Genesis Global School",city:"Noida",state:"Uttar Pradesh",board:"IB",type:"Co-ed",fees:500000,results:97,studentTeacherRatio:"12:1",address:"Sector 132, Noida",highlights:"IB + CBSE, residential + day"});
S({name:"Amity International School Sector 44",city:"Noida",state:"Uttar Pradesh",board:"CBSE",type:"Co-ed",fees:140000,results:96,studentTeacherRatio:"24:1",address:"Sector 44, Noida",highlights:"Large Amity group school"});
S({name:"Khaitan Public School",city:"Noida",state:"Uttar Pradesh",board:"CBSE",type:"Co-ed",fees:120000,results:96,studentTeacherRatio:"24:1",address:"Sector 40, Noida",highlights:"Popular CBSE school"});
S({name:"Somerville School",city:"Noida",state:"Uttar Pradesh",board:"CBSE",type:"Co-ed",fees:130000,established:1996,results:96,studentTeacherRatio:"24:1",address:"Sector 22, Noida",highlights:"Well-regarded CBSE school"});
S({name:"Father Agnel School",city:"Noida",state:"Uttar Pradesh",board:"CBSE",type:"Co-ed",fees:90000,results:96,studentTeacherRatio:"26:1",address:"Sector 62, Noida",highlights:"Established CBSE school"});
S({name:"Lotus Valley International School",city:"Noida",state:"Uttar Pradesh",board:"CBSE",type:"Co-ed",fees:170000,results:97,studentTeacherRatio:"22:1",address:"Sector 126, Noida",highlights:"Premium CBSE school"});
S({name:"Apeejay School Noida",city:"Noida",state:"Uttar Pradesh",board:"CBSE",type:"Co-ed",fees:110000,results:95,studentTeacherRatio:"24:1",address:"Sector 16A, Noida",highlights:"Part of Apeejay group"});
S({name:"Cambridge School Noida",city:"Noida",state:"Uttar Pradesh",board:"CBSE",type:"Co-ed",fees:100000,results:95,studentTeacherRatio:"26:1",address:"Sector 27, Noida",highlights:"Established CBSE school"});
S({name:"Mayoor School Noida",city:"Noida",state:"Uttar Pradesh",board:"CBSE",type:"Co-ed",fees:150000,results:96,studentTeacherRatio:"22:1",address:"Sector 126, Noida",highlights:"Modern CBSE school"});
S({name:"Kendriya Vidyalaya Sector 24 Noida",city:"Noida",state:"Uttar Pradesh",board:"CBSE",type:"Co-ed",fees:28000,results:95,studentTeacherRatio:"32:1",address:"Sector 24, Noida",highlights:"Central government school"});

if (typeof module !== 'undefined' && module.exports) module.exports = BATCH2_SCHOOLS;
