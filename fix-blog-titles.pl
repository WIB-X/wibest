#!/usr/bin/perl
# Fix <title>/<meta> tags on blog shells that were cloned from the
# best-hospitals-bangalore template and still carry its title/description.
use strict;
use warnings;
use utf8;
binmode STDOUT, ':utf8';

sub read_file  { open my $fh,'<:utf8',$_[0] or die "$_[0]: $!"; local $/; my $c=<$fh>; close $fh; $c }
sub write_file { my ($f,$c)=@_; open my $fh,'>:utf8',$f or die "$f: $!"; print $fh $c; close $fh }

my @seed_files = (
    'seed-data-batch6a-colleges.js',
    'seed-data-batch6b-schools.js',
    'seed-data-batch6c-hospitals.js',
    'seed-data-batch6d-restaurants-travel.js',
    'seed-data-batch7-unique.js',
    'seed-data-batch8-international.js',
);

sub esc_attr { my $s = shift // ''; $s =~ s/&/&amp;/g; $s =~ s/</&lt;/g; $s =~ s/>/&gt;/g; $s =~ s/"/&quot;/g; $s }

my ($fixed, $skipped) = (0, 0);

for my $file (@seed_files) {
    next unless -f $file;
    my $raw = read_file($file);
    while ($raw =~ /BLOG_POSTS\["([^"]+)"\]\s*=\s*\{/g) {
        my $slug = $1;
        my $pos = pos($raw);
        my $chunk = substr($raw, $pos, 3000); # title/summary are near the top
        my ($title)   = $chunk =~ /\btitle\s*:\s*"((?:[^"\\]|\\.)*)"/s;
        my ($summary) = $chunk =~ /\bsummary\s*:\s*"((?:[^"\\]|\\.)*)"/s;
        next unless $title;
        $summary //= '';
        # trim summary to ~158 chars for meta description
        my $desc = $summary;
        if (length($desc) > 158) { $desc = substr($desc, 0, 155); $desc =~ s/\s+\S*$//; $desc .= '...'; }

        my $path = "blog/$slug/index.html";
        unless (-f $path) { print "  — no html: $slug\n"; next; }
        my $html = read_file($path);

        # Only touch pages still carrying the template's hospital title
        unless ($html =~ /<title>Best Hospitals in Bangalore 2026/) { $skipped++; next; }

        my $t = esc_attr($title) . ' — WIB';
        my $d = esc_attr($desc);
        my $url = "https://wibest.in/blog/$slug/";

        $html =~ s{<title>[^<]*</title>}{<title>$t</title>};
        $html =~ s{<meta name="description" content="[^"]*">}{<meta name="description" content="$d">};
        $html =~ s{<meta property="og:title" content="[^"]*">}{<meta property="og:title" content="$t">};
        $html =~ s{<meta property="og:description" content="[^"]*">}{<meta property="og:description" content="$d">};
        $html =~ s{<meta property="og:url" content="[^"]*">}{<meta property="og:url" content="$url">};
        $html =~ s{<meta name="twitter:title" content="[^"]*">}{<meta name="twitter:title" content="$t">};
        $html =~ s{<meta name="twitter:description" content="[^"]*">}{<meta name="twitter:description" content="$d">};

        write_file($path, $html);
        $fixed++;
        print "  ✓ $slug\n";
    }
}
print "\n✅ Titles fixed=$fixed | already-correct=$skipped\n";
