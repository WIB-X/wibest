#!/usr/bin/perl
# Remove stale Article/FAQPage JSON-LD inherited from the hospital template
# on cloned blog shells, then re-run bake-blog.pl logic to inject correct ones.
# Strategy: strip ALL Article + FAQPage JSON-LD blocks and the
# data-static-baked marker, then let bake-blog.pl rebake the page fully.
use strict;
use warnings;
use utf8;
binmode STDOUT, ':utf8';

sub read_file  { open my $fh,'<:utf8',$_[0] or die "$_[0]: $!"; local $/; my $c=<$fh>; close $fh; $c }
sub write_file { my ($f,$c)=@_; open my $fh,'>:utf8',$f or die "$f: $!"; print $fh $c; close $fh }

my @slugs = qw(
    best-engineering-colleges-india-2025 best-medical-colleges-india-2025
    best-mba-colleges-india-2025 best-law-colleges-india-2025
    best-arts-colleges-india-2025 college-admission-tips-india-2025
    best-design-colleges-india-2025 best-cbse-schools-india-2025
    cbse-vs-icse-vs-ib-which-board-better school-admission-guide-india-2025
    kendriya-vidyalaya-admission-guide-2025 best-boarding-schools-india-2025
    best-hospitals-india-2025 health-insurance-india-guide-2025
    cancer-treatment-india-cost-guide-2025 ayushman-bharat-pmjay-eligibility-guide
    diabetes-management-india-guide-2025 best-street-food-india-city-guide
    best-places-visit-india-june-july best-budget-restaurants-india-cities
    india-solo-travel-guide-2025 best-fine-dining-restaurants-india-2025
    best-mutual-funds-india-2025 best-cities-to-live-india-2025
    best-restaurants-bangalore-2025
);

my $fixed = 0;
for my $slug (@slugs) {
    my $path = "blog/$slug/index.html";
    unless (-f $path) { print "  — missing: $slug\n"; next; }
    my $html = read_file($path);

    # Only act on pages carrying the stale hospital headline
    next unless $html =~ /"headline":"Best Hospitals in Bengaluru/;

    # Strip every Article and FAQPage JSON-LD block (escaped \x40type or @type)
    my $n = () = $html =~ s{<script type="application/ld\+json">\{[^<]*?"(?:\\x40|@)type"\s*:\s*"(?:Article|FAQPage)"[^<]*?</script>\n?}{}g;

    # Remove baked marker so bake-blog.pl reprocesses and injects fresh JSON-LD
    $html =~ s/ data-static-baked="true"//;

    write_file($path, $html);
    $fixed++;
    print "  ✓ stripped stale JSON-LD ($n blocks): $slug\n";
}
print "\n✅ Stripped on $fixed pages. Now run: perl bake-blog.pl\n";
