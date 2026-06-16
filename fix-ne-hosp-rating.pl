#!/usr/bin/perl
# Make the inline hospital-card rating conditional in the NE city pages
# (their hospitals have no rating; avoid rendering "star + undefined").
# Turns:  ★ '+h.r+'      into:  '+(h.r?'★ '+h.r:'')+'
use strict; use warnings;
binmode STDOUT, ':raw';
for my $slug (qw(shillong imphal agartala)) {
    my $p = "hospitals/$slug/index.html";
    open my $in, '<:raw', $p or die "$p: $!";
    local $/; my $c = <$in>; close $in;
    my $old = "\xe2\x98\x85 '+h.r+'";              # ★ '+h.r+'
    my $new = "'+(h.r?'\xe2\x98\x85 '+h.r:'')+'";  # '+(h.r?'★ '+h.r:'')+'
    my $n = ($c =~ s/\Q$old\E/$new/g);
    open my $out, '>:raw', $p or die;
    print $out $c; close $out;
    print "$slug: $n replacement(s)\n";
}
