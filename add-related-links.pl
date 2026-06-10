#!/usr/bin/perl
# Add a contextual "Related tools & guides" block to every baked blog post,
# linking to calculators and listing pages based on topic keywords.
# Idempotent: skips posts that already contain class="wib-related".
use strict;
use warnings;
binmode STDOUT, ':utf8';

sub rf { open my $fh,'<:utf8',$_[0] or die "$_[0]: $!"; local $/; <$fh> }
sub wf { my ($f,$c)=@_; open my $fh,'>:utf8',$f or die "$f: $!"; print $fh $c }

# topic => [regex on slug+title, [label, href] ...]
my @rules = (
    [ qr/hospital|cancer|diabetes|ayushman|health-insurance|health-checkup|therapy|treatment/, [
        ['Hospital Cost Estimator', '/hospitals/cost-estimator/'],
        ['Compare Hospitals by City', '/hospitals/'],
        ['Health Insurance Guide 2025', '/blog/health-insurance-india-guide-2025/'],
    ]],
    [ qr/college|admission|engineering-colleges|medical-colleges|mba|law-colleges|coaching|neet|jee|board-exam|education-loan/, [
        ['College Admission Planner', '/colleges/admission-planner/'],
        ['Education ROI Calculator', '/calculators/education-roi/'],
        ['Compare Colleges by City', '/colleges/'],
    ]],
    [ qr/school|cbse|icse|kendriya/, [
        ['School Admission Planner', '/schools/admission-planner/'],
        ['Compare Schools by City', '/schools/'],
        ['CBSE vs ICSE vs IB', '/blog/cbse-vs-icse-vs-ib-which-board-better/'],
    ]],
    [ qr/credit-card|savings|mutual-fund|tax|80c|ppf|elss|nps|pension|fd-|loan|salary/, [
        ['SIP Calculator', '/calculators/sip/'],
        ['Income Tax Calculator', '/calculators/tax/'],
        ['EMI Calculator', '/calculators/emi/'],
        ['FD Calculator', '/calculators/fd/'],
    ]],
    [ qr/car-|cars-|suv|sedan|nexon|brezza|punch|thar|electric-car|tiago/, [
        ['Car vs Bike Cost Calculator', '/calculators/car-vs-bike/'],
        ['EMI Calculator', '/calculators/emi/'],
        ['Compare Cars', '/cars/'],
    ]],
    [ qr/bike|scooter|ev-scooter/, [
        ['Car vs Bike Cost Calculator', '/calculators/car-vs-bike/'],
        ['Best Electric Scooters', '/blog/best-electric-scooter-india/'],
        ['EMI Calculator', '/calculators/emi/'],
    ]],
    [ qr/phone|iphone|samsung|oneplus|earbuds|laptop|tv-|monitor|smartwatch|camera|power-bank|gan-charger|bluetooth/, [
        ['Phone Upgrade Calculator', '/calculators/phone-upgrade/'],
        ['Compare Electronics', '/electronics/'],
        ['Best Phones Under Rs 20,000', '/blog/best-phone-under-20000-india/'],
    ]],
    [ qr/travel|trip|hill-station|goa|kerala|kodaikanal|ladakh|beach|honeymoon|hotels|resorts|homestays|solo-travel|places|vacation/, [
        ['Holiday Budget Planner', '/decide/holiday/'],
        ['Weekend Trip Picker', '/decide/weekend-trip/'],
        ['Best Places to Visit in India', '/blog/best-places-visit-india-june-july/'],
    ]],
    [ qr/restaurant|street-food|biryani|dining|cafes/, [
        ['Compare Restaurants by City', '/restaurants/'],
        ['Best Street Food Cities', '/blog/best-street-food-india-city-guide/'],
        ['Best Fine Dining in India', '/blog/best-fine-dining-restaurants-india-2025/'],
    ]],
    [ qr/insurance/, [
        ['Insurance Decision Helper', '/decide/insurance/'],
        ['Best Term Insurance', '/blog/best-term-insurance-india/'],
        ['Best Health Insurance for Families', '/blog/best-health-insurance-family-india/'],
    ]],
    [ qr/city|cities|live|bangalore-vs|weekend-trips/, [
        ['Where Should I Live? (Quiz)', '/decide/where-to-live/'],
        ['India City Living Index 2026', '/reports/india-city-living-index-2026/'],
        ['India Salary Index 2026', '/reports/india-salary-index-2026/'],
    ]],
    # appliance/home fallback
    [ qr/ev-charging|water-bottle|macbook|mamaearth|./, [
        ['Compare Electronics', '/electronics/'],
        ['All Calculators', '/calculators/'],
        ['Browse the Blog', '/blog/'],
    ]],
    [ qr/ac-|air-purifier|washing|refrigerator|water-purifier|fan|geyser|microwave|vacuum|mattress|air-fryer|air-cooler|solar|broadband|dth|mobile-plan/, [
        ['Compare Electronics & Appliances', '/electronics/'],
        ['EMI Calculator', '/calculators/emi/'],
        ['Best AC Under Rs 30,000', '/blog/best-ac-under-30000-india-2026/'],
    ]],
);

my ($added, $skipped, $nomatch) = (0,0,0);
for my $path (glob("blog/*/index.html")) {
    my ($slug) = $path =~ m{blog/([^/]+)/};
    my $html = rf($path);
    if ($html =~ /wib-related/) { $skipped++; next; }
    # only touch baked posts (they have the back-to-blog footer link)
    unless ($html =~ /Back to Blog/) { $skipped++; next; }

    my $links;
    for my $r (@rules) {
        if ($slug =~ $r->[0]) { $links = $r->[1]; last; }
    }
    unless ($links) { $nomatch++; print "  — no rule: $slug\n"; next; }

    # avoid self-links
    my @use = grep { $_->[1] !~ m{/blog/\Q$slug\E/} } @$links;
    my $items = join '', map {
        '<a href="'.$_->[1].'" style="display:inline-block;padding:8px 14px;margin:4px 6px 4px 0;background:var(--tag-bg);border:1px solid var(--border);border-radius:8px;font-size:13px;text-decoration:none;color:var(--text-primary)">'.$_->[0].' &rsaquo;</a>'
    } @use;
    my $block = '<div class="wib-related" style="margin-top:32px;padding:20px 24px;background:var(--bg-card);border:1px solid var(--border);border-radius:12px"><div style="font-family:Outfit,sans-serif;font-size:15px;font-weight:700;margin-bottom:10px">Related tools &amp; guides</div>'.$items.'</div>'."\n";

    # insert before the back-to-blog footer div
    if ($html =~ s{(<div style="margin-top:40px;padding-top:24px;border-top:1px solid var\(--border\)">\s*<a href="/blog")}{$block$1}) {
        wf($path, $html);
        $added++;
    } else {
        print "  ⚠ no anchor point: $slug\n";
    }
}
print "\n✅ Related blocks added=$added | skipped=$skipped | no-rule=$nomatch\n";
