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
    best-study-abroad-destinations-indian-students-2026
    best-travel-esim-international-indians-2026
    best-forex-card-international-travel-india-2026
    nri-investment-guide-india-2026
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
