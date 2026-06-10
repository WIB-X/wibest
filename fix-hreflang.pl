#!/usr/bin/perl
# Remove vernacular hreflang tags (hi/ta/te/kn/ml/bn) from English pages.
# The vernacular dirs are noindexed + robots-blocked, so the hreflang tags
# send Google contradictory signals; many also point at the WRONG post
# (template-clone artifact).
use strict;
use warnings;

my @files = grep { chomp; !m{^(te|ta|kn|ml|hi|bn)/} } `git ls-files "*.html"`;
my $fixed = 0;
for my $f (@files) {
    open my $in, '<:raw', $f or next;
    local $/; my $c = <$in>; close $in;
    my $n = ($c =~ s{<link rel="alternate" hreflang="(?:hi|ta|te|kn|ml|bn)" href="[^"]*">\s*}{}g);
    if ($n) {
        open my $out, '>:raw', $f or die "$f: $!";
        print $out $c; close $out;
        $fixed++;
    }
}
print "Files cleaned: $fixed\n";
