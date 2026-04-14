var EXPANSION_COLLEGES=[
// Jaipur
{name:"MNIT Jaipur",city:"Jaipur",stream:"Engineering",type:"Government",fees:150000,google_rating:4.4,accreditation:"NAAC A+",courses:["B.Tech CS","B.Tech ECE","B.Tech Mech","M.Tech","PhD"],avg_package:1200000,placement_percent:88},
{name:"JECRC University",city:"Jaipur",stream:"Engineering",type:"Private",fees:200000,google_rating:4.1,accreditation:"NAAC A",courses:["B.Tech CS","B.Tech IT","BBA","MBA"],avg_package:600000,placement_percent:78},
{name:"Rajasthan University",city:"Jaipur",stream:"Multi-discipline",type:"Government",fees:15000,google_rating:4.0,accreditation:"NAAC A",courses:["BA","BSc","B.Com","MA","MSc","PhD"],avg_package:350000,placement_percent:55},
{name:"SMS Medical College Jaipur",city:"Jaipur",stream:"Medical",type:"Government",fees:75000,google_rating:4.5,accreditation:"MCI",courses:["MBBS","MD","MS","Nursing"],avg_package:1000000,placement_percent:100},
// Lucknow
{name:"IIT Lucknow (IIIT-L)",city:"Lucknow",stream:"Engineering",type:"Government",fees:200000,google_rating:4.3,accreditation:"NAAC A",courses:["B.Tech CS","B.Tech IT","M.Tech"],avg_package:1100000,placement_percent:85},
{name:"Lucknow University",city:"Lucknow",stream:"Multi-discipline",type:"Government",fees:12000,google_rating:4.1,accreditation:"NAAC A",courses:["BA","BSc","B.Com","LLB","MBA","PhD"],avg_package:400000,placement_percent:58},
{name:"King George's Medical University",city:"Lucknow",stream:"Medical",type:"Government",fees:80000,google_rating:4.6,accreditation:"NAAC A++",courses:["MBBS","MD","MS","BDS","Nursing"],avg_package:1200000,placement_percent:100},
{name:"Babasaheb Bhimrao Ambedkar University",city:"Lucknow",stream:"Multi-discipline",type:"Government",fees:20000,google_rating:4.0,accreditation:"NAAC A",courses:["BA","BSc","B.Tech","MBA","MCA","PhD"],avg_package:350000,placement_percent:55},
// Chandigarh
{name:"Punjab Engineering College (PEC)",city:"Chandigarh",stream:"Engineering",type:"Government",fees:130000,google_rating:4.4,accreditation:"NAAC A+",courses:["B.Tech CS","B.Tech ECE","B.Tech Mech","M.Tech"],avg_package:1100000,placement_percent:87},
{name:"Panjab University",city:"Chandigarh",stream:"Multi-discipline",type:"Government",fees:15000,google_rating:4.3,accreditation:"NAAC A",courses:["BA","BSc","B.Com","BCA","MBA","LLB","PhD"],avg_package:450000,placement_percent:60},
{name:"Government Medical College Chandigarh",city:"Chandigarh",stream:"Medical",type:"Government",fees:60000,google_rating:4.5,accreditation:"MCI",courses:["MBBS","MD","MS"],avg_package:1000000,placement_percent:100},
{name:"University Institute of Engineering & Technology (UIET)",city:"Chandigarh",stream:"Engineering",type:"Government",fees:100000,google_rating:4.2,accreditation:"NAAC A",courses:["B.Tech CS","B.Tech IT","B.Tech ECE","M.Tech"],avg_package:800000,placement_percent:82},
// Kochi
{name:"Cochin University of Science and Technology (CUSAT)",city:"Kochi",stream:"Engineering",type:"Government",fees:50000,google_rating:4.3,accreditation:"NAAC A",courses:["B.Tech CS","B.Tech IT","MSc","MBA","LLB","PhD"],avg_package:700000,placement_percent:78},
{name:"Rajagiri College of Social Sciences",city:"Kochi",stream:"Management",type:"Private",fees:350000,google_rating:4.4,accreditation:"NAAC A++",courses:["MBA","BBA","B.Com","MSW"],avg_package:800000,placement_percent:85},
{name:"Government Medical College Kochi",city:"Kochi",stream:"Medical",type:"Government",fees:50000,google_rating:4.4,accreditation:"MCI",courses:["MBBS","MD","MS","Nursing"],avg_package:1000000,placement_percent:100},
{name:"National University of Advanced Legal Studies (NUALS)",city:"Kochi",stream:"Law",type:"Government",fees:150000,google_rating:4.3,accreditation:"NAAC A",courses:["BA LLB","LLM","PhD"],avg_package:800000,placement_percent:80},
// Bhopal
{name:"MANIT Bhopal",city:"Bhopal",stream:"Engineering",type:"Government",fees:120000,google_rating:4.3,accreditation:"NAAC A",courses:["B.Tech CS","B.Tech ECE","B.Tech Mech","M.Tech","PhD"],avg_package:900000,placement_percent:85},
{name:"NLIU Bhopal",city:"Bhopal",stream:"Law",type:"Government",fees:200000,google_rating:4.5,accreditation:"NAAC A",courses:["BA LLB","LLM","PhD"],avg_package:1100000,placement_percent:88},
{name:"AIIMS Bhopal",city:"Bhopal",stream:"Medical",type:"Government",fees:20000,google_rating:4.7,accreditation:"Institute of National Importance",courses:["MBBS","MD","MS","PhD","Nursing"],avg_package:1500000,placement_percent:100},
{name:"Barkatullah University",city:"Bhopal",stream:"Multi-discipline",type:"Government",fees:10000,google_rating:4.0,accreditation:"NAAC B+",courses:["BA","BSc","B.Com","MBA","MCA","PhD"],avg_package:300000,placement_percent:50},
// Indore
{name:"IIT Indore",city:"Indore",stream:"Engineering",type:"Government",fees:200000,google_rating:4.6,accreditation:"Institute of National Importance",courses:["B.Tech","M.Tech","MSc","PhD"],avg_package:1600000,placement_percent:92},
{name:"IIM Indore",city:"Indore",stream:"Management",type:"Government",fees:2100000,google_rating:4.7,accreditation:"AACSB",courses:["MBA","PhD","Executive MBA"],avg_package:2800000,placement_percent:100},
{name:"Devi Ahilya Vishwavidyalaya",city:"Indore",stream:"Multi-discipline",type:"Government",fees:12000,google_rating:4.0,accreditation:"NAAC A+",courses:["BA","BSc","B.Com","B.Tech","MBA","PhD"],avg_package:350000,placement_percent:55},
{name:"Mahatma Gandhi Memorial Medical College",city:"Indore",stream:"Medical",type:"Government",fees:60000,google_rating:4.3,accreditation:"MCI",courses:["MBBS","MD","MS"],avg_package:1000000,placement_percent:100},
// Coimbatore
{name:"PSG College of Technology",city:"Coimbatore",stream:"Engineering",type:"Private",fees:120000,google_rating:4.5,accreditation:"NAAC A++",courses:["B.Tech CS","B.Tech ECE","B.Tech Mech","M.Tech","MBA"],avg_package:800000,placement_percent:88},
{name:"Amrita Vishwa Vidyapeetham Coimbatore",city:"Coimbatore",stream:"Engineering",type:"Private",fees:250000,google_rating:4.3,accreditation:"NAAC A++",courses:["B.Tech","M.Tech","MBA","PhD"],avg_package:700000,placement_percent:85},
{name:"Coimbatore Medical College",city:"Coimbatore",stream:"Medical",type:"Government",fees:50000,google_rating:4.2,accreditation:"MCI",courses:["MBBS","MD","MS"],avg_package:900000,placement_percent:100},
{name:"GRD College of Science",city:"Coimbatore",stream:"Arts & Science",type:"Private",fees:30000,google_rating:4.0,accreditation:"NAAC A",courses:["BSc","BCA","MSc","MCA"],avg_package:350000,placement_percent:65},
// Nagpur
{name:"VNIT Nagpur",city:"Nagpur",stream:"Engineering",type:"Government",fees:150000,google_rating:4.4,accreditation:"NAAC A+",courses:["B.Tech CS","B.Tech ECE","B.Tech Civil","M.Tech","PhD"],avg_package:1000000,placement_percent:87},
{name:"Government Medical College Nagpur",city:"Nagpur",stream:"Medical",type:"Government",fees:60000,google_rating:4.3,accreditation:"MCI",courses:["MBBS","MD","MS"],avg_package:1000000,placement_percent:100},
{name:"Nagpur University (RTMNU)",city:"Nagpur",stream:"Multi-discipline",type:"Government",fees:12000,google_rating:4.0,accreditation:"NAAC A",courses:["BA","BSc","B.Com","B.Tech","MBA","LLB","PhD"],avg_package:350000,placement_percent:55},
{name:"Symbiosis Institute of Management Studies Nagpur",city:"Nagpur",stream:"Management",type:"Private",fees:500000,google_rating:4.2,accreditation:"NAAC A",courses:["MBA","BBA"],avg_package:700000,placement_percent:82},
// Patna
{name:"IIT Patna",city:"Patna",stream:"Engineering",type:"Government",fees:200000,google_rating:4.5,accreditation:"Institute of National Importance",courses:["B.Tech","M.Tech","MSc","PhD"],avg_package:1400000,placement_percent:90},
{name:"Patna Medical College",city:"Patna",stream:"Medical",type:"Government",fees:50000,google_rating:4.2,accreditation:"MCI",courses:["MBBS","MD","MS"],avg_package:900000,placement_percent:100},
{name:"NIT Patna",city:"Patna",stream:"Engineering",type:"Government",fees:130000,google_rating:4.3,accreditation:"NAAC A",courses:["B.Tech CS","B.Tech ECE","B.Tech Civil","M.Tech"],avg_package:800000,placement_percent:82},
{name:"Patna University",city:"Patna",stream:"Multi-discipline",type:"Government",fees:10000,google_rating:4.0,accreditation:"NAAC B+",courses:["BA","BSc","B.Com","MA","MSc","LLB"],avg_package:300000,placement_percent:50},
// Guwahati
{name:"IIT Guwahati",city:"Guwahati",stream:"Engineering",type:"Government",fees:200000,google_rating:4.7,accreditation:"Institute of National Importance",courses:["B.Tech","M.Tech","MSc","MBA","PhD"],avg_package:1800000,placement_percent:93},
{name:"Gauhati University",city:"Guwahati",stream:"Multi-discipline",type:"Government",fees:10000,google_rating:4.1,accreditation:"NAAC A",courses:["BA","BSc","B.Com","MA","MSc","LLB","PhD"],avg_package:350000,placement_percent:55},
{name:"Gauhati Medical College",city:"Guwahati",stream:"Medical",type:"Government",fees:50000,google_rating:4.3,accreditation:"MCI",courses:["MBBS","MD","MS"],avg_package:1000000,placement_percent:100},
{name:"Cotton University",city:"Guwahati",stream:"Arts & Science",type:"Government",fees:8000,google_rating:4.2,accreditation:"NAAC A",courses:["BA","BSc","BCA","MA","MSc"],avg_package:300000,placement_percent:52}
];
