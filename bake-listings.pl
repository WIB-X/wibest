#!/usr/bin/perl
# Injects static introductory paragraphs into thin city listing pages
# so Google sees real content even before Firebase loads.
use strict; use warnings; use utf8;
binmode STDOUT, ':utf8';

sub read_file  { my $f=shift; open my $fh,'<:utf8',$f or die "$f: $!"; local $/; <$fh> }
sub write_file { my ($f,$c)=@_; open my $fh,'>:utf8',$f or die "$f: $!"; print $fh $c }

# Static intro paragraphs keyed by section/city
my %intros = (
  'colleges/bangalore' => '<div class="static-intro" style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:24px;margin-bottom:24px"><h2 style="font-size:20px;font-weight:700;margin-bottom:12px">Top Colleges in Bengaluru — Overview</h2><p style="color:var(--text-secondary);line-height:1.7;margin-bottom:12px">Bengaluru (Bangalore) is South India\'s education powerhouse. Indian Institute of Science (IISc) is among Asia\'s top 10 research universities. Indian Institute of Management Bangalore (IIMB) consistently ranks among India\'s top 2 business schools. The city has 40+ engineering colleges, 15+ medical colleges, and dozens of arts and science institutions.</p><p style="color:var(--text-secondary);line-height:1.7;margin-bottom:12px">Top engineering colleges: IISc (research), RV College of Engineering, BMS College of Engineering, MS Ramaiah, PES University, and Manipal University\'s Bengaluru campus. Top MBA: IIMB (flagship), IIMB\'s Executive programmes, Symbiosis, and Christ University. Top medical: St John\'s Medical College, Ramaiah Medical College, and Vydehi Institute. Top arts and science: Christ University, St Joseph\'s College, Jyoti Nivas, and National College.</p><p style="color:var(--text-secondary);line-height:1.7">Fee ranges vary widely — government colleges (RV, BMS, MSRIT) charge ₹50,000–₹2,00,000/year for engineering; private colleges charge ₹1,50,000–₹4,00,000/year. Medical colleges: government quota ₹30,000–₹1,00,000/year; private management quota ₹15–₹25 lakh/year.</p></div>',

  'colleges/hyderabad' => '<div class="static-intro" style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:24px;margin-bottom:24px"><h2 style="font-size:20px;font-weight:700;margin-bottom:12px">Top Colleges in Hyderabad — Overview</h2><p style="color:var(--text-secondary);line-height:1.7;margin-bottom:12px">Hyderabad hosts some of India\'s top institutions — University of Hyderabad (national ranking #7 for research), IIT Hyderabad, IIIT Hyderabad (India\'s premier IT-focused university), and Osmania University (one of India\'s oldest). BITS Pilani Hyderabad Campus is one of the most sought-after engineering colleges in India.</p><p style="color:var(--text-secondary);line-height:1.7">Top engineering: IIT Hyderabad, IIIT Hyderabad, BITS Pilani Hyderabad, CBIT, MVSR, VNR Vignana Jyothi. Top medical: Osmania Medical College, Gandhi Medical College, Nizam\'s Institute (NIMS). Top MBA: ISB Hyderabad (India\'s best 1-year MBA), IIMH, Osmania MBA.</p></div>',

  'colleges/delhi' => '<div class="static-intro" style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:24px;margin-bottom:24px"><h2 style="font-size:20px;font-weight:700;margin-bottom:12px">Top Colleges in Delhi — Overview</h2><p style="color:var(--text-secondary);line-height:1.7;margin-bottom:12px">Delhi-NCR has India\'s highest concentration of premier institutions. AIIMS Delhi is the best medical institution in India. IIT Delhi and IIT Roorkee (Roorkee, near Delhi) are top engineering colleges. Delhi University\'s colleges (St. Stephen\'s, Hindu, SRCC, Lady Shri Ram) are India\'s most prestigious for undergraduate arts, science, and commerce.</p><p style="color:var(--text-secondary);line-height:1.7">Top engineering: IIT Delhi, DTU (Delhi Technological University), NSIT (Netaji Subhas). Top medical: AIIMS Delhi, Maulana Azad Medical College, Lady Hardinge. Top MBA: IIM Lucknow (nearby), MDI Gurgaon, FMS Delhi (best government MBA value). Top arts/science: St. Stephen\'s, Miranda House, SRCC, Jesus and Mary College.</p></div>',

  'schools/bangalore' => '<div class="static-intro" style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:24px;margin-bottom:24px"><h2 style="font-size:20px;font-weight:700;margin-bottom:12px">Best Schools in Bengaluru — Overview</h2><p style="color:var(--text-secondary);line-height:1.7;margin-bottom:12px">Bengaluru has one of India\'s most diverse school ecosystems. From CBSE and ICSE to IB and IGCSE, the city offers every board option. International schools cluster in Whitefield, Sarjapur Road, and North Bengaluru for the city\'s large expat and IT professional community. State board schools are strongest in South Bengaluru.</p><p style="color:var(--text-secondary);line-height:1.7;margin-bottom:12px">Top CBSE schools: National Public School (NPS), Delhi Public School (multiple campuses), Vidyashilp Academy, Ryan International, Greenwood High. Top ICSE: Bishop Cotton Boys\' (India\'s oldest continuously running school, founded 1865), St Joseph\'s Boys\' High School, Clarence High School. Top IB: Inventure Academy, Indus International, Candor International.</p><p style="color:var(--text-secondary);line-height:1.7">Fee ranges: Budget CBSE ₹1,500–₹4,000/month. Mid-range CBSE/ICSE ₹4,000–₹10,000/month. Premium schools ₹10,000–₹25,000/month. International (IB) schools ₹20,000–₹80,000/month.</p></div>',

  'hospitals/delhi' => '<div class="static-intro" style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:24px;margin-bottom:24px"><h2 style="font-size:20px;font-weight:700;margin-bottom:12px">Best Hospitals in Delhi — Overview</h2><p style="color:var(--text-secondary);line-height:1.7;margin-bottom:12px">Delhi-NCR has India\'s highest concentration of super-specialty hospitals. AIIMS Delhi is globally ranked among Asia\'s top 20 hospitals. Private hospital chains — Apollo, Max, Fortis, and BLK-Max — offer JCI-accredited care that attracts international medical tourists from South Asia, Middle East, and Africa.</p><p style="color:var(--text-secondary);line-height:1.7">Government: AIIMS Delhi (world-class, nearly free), Safdarjung (largest capacity), GTB Hospital, RML Hospital. Private: Apollo Sarita Vihar (best for international patients), Max Saket (kidney transplant leader), Fortis Escorts Heart Institute (cardiac), Sir Ganga Ram (gastroenterology). Cost comparison: CABG surgery ₹20,000–₹50,000 at government vs ₹3–5 lakh at private hospitals.</p></div>',

  'restaurants/bangalore' => '<div class="static-intro" style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:24px;margin-bottom:24px"><h2 style="font-size:20px;font-weight:700;margin-bottom:12px">Best Restaurants in Bengaluru — Overview</h2><p style="color:var(--text-secondary);line-height:1.7;margin-bottom:12px">Bengaluru\'s restaurant scene is India\'s most cosmopolitan outside Mumbai. The city has every cuisine — from authentic South Indian filter coffee and idli at MTR (est. 1924) and CTR (Central Tiffin Room, Malleswaram) to global fine dining on Indiranagar\'s 100 Feet Road and Koramangala\'s food street.</p><p style="color:var(--text-secondary);line-height:1.7">Must-try: MTR (Mavalli Tiffin Rooms) for authentic Udupi breakfast, Brahmin\'s Coffee Bar for idli-vada, Nagarjuna for Andhra meals on a banana leaf. Modern dining: Toit Brewpub (Indiranagar), Arbor Brewing Company, Farzi Cafe, The Permit Room. Lunch thali: Hotel Janata for South Indian meals, Rameshwaram Cafe for Mangalorean cuisine.</p></div>',

  'restaurants/hyderabad' => '<div class="static-intro" style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:24px;margin-bottom:24px"><h2 style="font-size:20px;font-weight:700;margin-bottom:12px">Best Restaurants in Hyderabad — Overview</h2><p style="color:var(--text-secondary);line-height:1.7;margin-bottom:12px">Hyderabad\'s food culture is one of India\'s richest — Mughal heritage meets Andhra spice in a cuisine that\'s globally recognised. Hyderabadi biryani (Dum Pukht style) is acknowledged as India\'s finest biryani by most food critics. The city\'s old city (Charminar area) and Banjara Hills-Jubilee Hills corridor offer the full range from street food to fine dining.</p><p style="color:var(--text-secondary);line-height:1.7">Biryani: Bawarchi (original), Paradise (iconic chain), Café Bahar, Shah Ghouse (best for Dum Biryani at ₹200–₹350/plate). Street food: Charminar area for Irani chai, Osmania biscuits, Haleem (Ramzan season). Fine dining: Flechazo (Banjara Hills), Ohri\'s (multiple concepts), Novotel\'s Dakshin for South Indian.</p></div>',

  'restaurants/mumbai' => '<div class="static-intro" style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:24px;margin-bottom:24px"><h2 style="font-size:20px;font-weight:700;margin-bottom:12px">Best Restaurants in Mumbai — Overview</h2><p style="color:var(--text-secondary);line-height:1.7;margin-bottom:12px">Mumbai is India\'s food capital. The city has 50,000+ restaurants ranging from ₹30 vada pav at Ashok Vada Pav (Kirti College) to ₹15,000/head at Avartana or Tasting Room. Every Indian cuisine is represented — from Parsi dhansak to Malvani seafood, Punjabi butter chicken to South Indian filter coffee.</p><p style="color:var(--text-secondary);line-height:1.7">Street food essentials: Vada Pav (Ashok Vada Pav, Kirti College), Pav Bhaji (Juhu Beach, Chowpatty), Bhel Puri and Sev Puri at Chowpatty, Prawn Koliwada (Mahim fishermen\'s colony). Upscale: Trishna (seafood, Kala Ghoda), Bastian (Bandra), The Table (Colaba), Gajalee (Vile Parle). Lunch thali: Masala Zone, Thackers (Dadar), Soam (Babulnath).</p></div>',
);

# Also generate generic intros for other cities
my @sections = ('colleges', 'schools', 'hospitals', 'restaurants');
my @generic_cities = ('ahmedabad','chennai','jaipur','kolkata','lucknow','pune','surat','bhopal','indore','nagpur','chandigarh','kochi','visakhapatnam','coimbatore','patna');
my %city_names = (ahmedabad=>'Ahmedabad',bangalore=>'Bengaluru',chennai=>'Chennai',delhi=>'Delhi',hyderabad=>'Hyderabad',jaipur=>'Jaipur',kolkata=>'Kolkata',lucknow=>'Lucknow',mumbai=>'Mumbai',pune=>'Pune',surat=>'Surat',bhopal=>'Bhopal',indore=>'Indore',nagpur=>'Nagpur',chandigarh=>'Chandigarh',kochi=>'Kochi',visakhapatnam=>'Visakhapatnam',coimbatore=>'Coimbatore',patna=>'Patna');

for my $section (@sections) {
    for my $city (@generic_cities) {
        my $key = "$section/$city";
        next if exists $intros{$key};
        my $cn = $city_names{$city} || ucfirst($city);
        my $stype = $section eq 'colleges' ? 'Colleges' : $section eq 'schools' ? 'Schools' : $section eq 'hospitals' ? 'Hospitals' : 'Restaurants';
        my $sdesc = '';
        if ($section eq 'colleges') {
            $sdesc = "Find and compare the best engineering, medical, MBA, arts, and science colleges in $cn. Our listings cover NIRF-ranked institutions, placement records, fee structures, and admission requirements.";
        } elsif ($section eq 'schools') {
            $sdesc = "Compare the top CBSE, ICSE, and state board schools in $cn. Our listings cover academic results, fee structures, infrastructure, extracurricular activities, and admission processes.";
        } elsif ($section eq 'hospitals') {
            $sdesc = "Find the best hospitals in $cn for cardiac care, cancer treatment, orthopaedics, maternity, and general healthcare. Compare facilities, accreditations, and specialist availability.";
        } else {
            $sdesc = "Discover the best restaurants in $cn — from street food and local cuisine to fine dining. Compare cuisines, price ranges, locations, and ratings.";
        }
        $intros{$key} = qq(<div class="static-intro" style="background:var(--bg-card);border:1px solid var(--border);border-radius:12px;padding:24px;margin-bottom:24px"><h2 style="font-size:20px;font-weight:700;margin-bottom:12px">Best $stype in $cn</h2><p style="color:var(--text-secondary);line-height:1.7">$sdesc</p></div>);
    }
}

my ($updated, $skipped) = (0, 0);

for my $key (sort keys %intros) {
    my $path = "$key/index.html";
    next unless -f $path;
    my $html = read_file($path);
    if ($html =~ /static-intro/) { $skipped++; next; }

    # Find a good injection point — after <h1> or after breadcrumb or before first Firebase script
    my $intro = $intros{$key};
    if ($html =~ s{(<h1[^>]*>.*?</h1>)}{$1\n$intro}s) {
        write_file($path, $html);
        $updated++;
        print "  ✓ $key\n";
    } elsif ($html =~ s{(<div[^>]+class="[^"]*wrap[^"]*"[^>]*>)}{$1\n$intro}s) {
        write_file($path, $html);
        $updated++;
        print "  ✓ $key (via wrap)\n";
    } else {
        print "  ⚠ Could not inject: $key\n";
    }
}

print "\n✅ Done. Updated=$updated | Skipped=$skipped\n";
