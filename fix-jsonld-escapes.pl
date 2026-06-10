#!/usr/bin/perl
# One-off: replace literal \x40 with @ inside JSON-LD across all HTML files.
# bake-blog.pl previously wrote "\x40type" instead of "@type" — invalid JSON
# that Google's structured-data parser rejects.
use strict;
use warnings;
use File::Find;

my $fixed = 0;
find(sub {
    return unless /\.html$/;
    return if $File::Find::name =~ /node_modules/;
    open my $in, '<:raw', $_ or return;
    local $/; my $c = <$in>; close $in;
    my $n = ($c =~ s/\\x40/\@/g);
    if ($n) {
        open my $out, '>:raw', $_ or die "$File::Find::name: $!";
        print $out $c; close $out;
        $fixed++;
    }
}, '.');
print "Files fixed: $fixed\n";
