#!/usr/bin/perl
# noindex the schools city pages that have NO school data in Firestore.
# Their grids render empty -> Google flags Soft 404. noindex,follow is the
# honest fix until data is added (then remove the tag). follow keeps the
# board sub-page links crawlable.
use strict; use warnings;

my @no_data = qw(
    ahmedabad bhopal chandigarh kanpur mangalore nagpur
    nashik patna surat vadodara visakhapatnam
);

my $fixed = 0;
for my $city (@no_data) {
    my $path = "schools/$city/index.html";
    unless (-f $path) { print "  missing: $path\n"; next; }
    open my $in, '<:raw', $path or die; local $/; my $c = <$in>; close $in;

    # skip if a static <meta robots> already in <head>
    my ($head) = $c =~ /^(.*?)<body/s;
    if ($head =~ /<meta\s+name="robots"/i) { print "  already noindex: $city\n"; next; }

    $c =~ s{(<meta charset="UTF-8">)}{$1\n<meta name="robots" content="noindex, follow">};
    open my $out, '>:raw', $path or die; print $out $c; close $out;
    $fixed++;
    print "  noindex: $city\n";
}
print "\nnoindexed $fixed empty-data school city pages\n";
