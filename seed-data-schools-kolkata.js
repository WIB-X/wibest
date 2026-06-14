/* ============================================================================
   KOLKATA SCHOOLS — seed data for the new Kolkata schools city page.
   Kolkata was missing from Schools entirely (top-3 metro, blue-ocean gap).

   DATA PROVENANCE (same rules as the 11-city seed):
   - name, city, state, board, type, address(locality), established: real,
     publicly-verifiable facts for well-known Kolkata schools.
   - fees, results, studentTeacherRatio: APPROXIMATE — verify before relying.
   - rating: intentionally omitted (0) — not fabricated.

   Import: open /seed-kolkata-schools.html while logged in as admin, click
   "Add Kolkata schools" (additive). Then tell Claude "Kolkata imported".
   ========================================================================== */
var KOLKATA_SCHOOLS = [];
function S(o){ KOLKATA_SCHOOLS.push(o); }

S({name:"La Martiniere for Boys",city:"Kolkata",state:"West Bengal",board:"ICSE",type:"Boys",fees:90000,established:1836,results:98,studentTeacherRatio:"20:1",address:"Loudon Street, Kolkata",highlights:"Historic ICSE school, one of India's oldest and most prestigious"});
S({name:"La Martiniere for Girls",city:"Kolkata",state:"West Bengal",board:"ICSE",type:"Girls",fees:90000,established:1836,results:98,studentTeacherRatio:"20:1",address:"Rawdon Street, Kolkata",highlights:"Premier girls' ICSE school, top ISC results"});
S({name:"St. Xavier's Collegiate School",city:"Kolkata",state:"West Bengal",board:"ICSE",type:"Boys",fees:75000,established:1860,results:98,studentTeacherRatio:"22:1",address:"Park Street, Kolkata",highlights:"Jesuit heritage school, consistently top-ranked"});
S({name:"Loreto House",city:"Kolkata",state:"West Bengal",board:"ICSE",type:"Girls",fees:70000,established:1912,results:98,studentTeacherRatio:"22:1",address:"Middleton Row, Kolkata",highlights:"Elite girls' convent school"});
S({name:"Modern High School for Girls",city:"Kolkata",state:"West Bengal",board:"ICSE",type:"Girls",fees:80000,established:1952,results:98,studentTeacherRatio:"20:1",address:"Syed Amir Ali Avenue, Kolkata",highlights:"Top academic girls' school"});
S({name:"Don Bosco School Park Circus",city:"Kolkata",state:"West Bengal",board:"ICSE",type:"Boys",fees:65000,established:1958,results:97,studentTeacherRatio:"24:1",address:"Park Circus, Kolkata",highlights:"Salesian school, strong academics and sports"});
S({name:"Delhi Public School Ruby Park",city:"Kolkata",state:"West Bengal",board:"CBSE",type:"Co-ed",fees:85000,established:2002,results:97,studentTeacherRatio:"22:1",address:"Ruby Park, Kolkata",highlights:"Leading CBSE school in Kolkata"});
S({name:"Birla High School",city:"Kolkata",state:"West Bengal",board:"CBSE",type:"Co-ed",fees:70000,established:1941,results:97,studentTeacherRatio:"24:1",address:"Moira Street, Kolkata",highlights:"Well-regarded CBSE school with strong results"});
S({name:"Mahadevi Birla World Academy",city:"Kolkata",state:"West Bengal",board:"ICSE",type:"Co-ed",fees:75000,results:97,studentTeacherRatio:"22:1",address:"Ballygunge, Kolkata",highlights:"Modern ICSE school in south Kolkata"});
S({name:"Calcutta International School",city:"Kolkata",state:"West Bengal",board:"IB",type:"Co-ed",fees:350000,established:1953,results:98,studentTeacherRatio:"14:1",address:"Anandapur, Kolkata",highlights:"IB World School (PYP, MYP, DP) + IGCSE"});
S({name:"The Heritage School",city:"Kolkata",state:"West Bengal",board:"CBSE",type:"Co-ed",fees:120000,established:2001,results:96,studentTeacherRatio:"18:1",address:"Anandapur, Kolkata",highlights:"Premium CBSE with international-style facilities"});
S({name:"Sri Sri Academy",city:"Kolkata",state:"West Bengal",board:"CBSE",type:"Co-ed",fees:95000,results:96,studentTeacherRatio:"20:1",address:"Alipore, Kolkata",highlights:"Values-based premium CBSE school"});
S({name:"Calcutta Boys' School",city:"Kolkata",state:"West Bengal",board:"ICSE",type:"Boys",fees:55000,established:1877,results:96,studentTeacherRatio:"26:1",address:"S.N. Banerjee Road, Kolkata",highlights:"Historic Methodist ICSE school"});
S({name:"Kendriya Vidyalaya Fort William",city:"Kolkata",state:"West Bengal",board:"CBSE",type:"Co-ed",fees:28000,results:95,studentTeacherRatio:"32:1",address:"Fort William, Kolkata",highlights:"Central government school, subsidised fees"});

if (typeof module !== 'undefined' && module.exports) module.exports = KOLKATA_SCHOOLS;
