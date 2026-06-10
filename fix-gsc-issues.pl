#!/usr/bin/perl
use strict;
use warnings;
use utf8;
binmode STDOUT, ':utf8';

sub read_file  { my $f=shift; open my $fh,'<:utf8',$f or die "Cannot read $f: $!"; local $/; my $c=<$fh>; close $fh; $c }
sub write_file { my ($f,$c)=@_; open my $fh,'>:utf8',$f or die "Cannot write $f: $!"; print $fh $c; close $fh }

my ($fixed, $skipped) = (0, 0);

# ── FIX 1: Add noindex to all vernacular blog pages ──────────────────────────
# 60 pages across te/ta/kn/ml/hi/bn — all are JS shells with no translated content
# Google marks them as "Duplicate, Google chose different canonical" because of empty body

my @vernacular_dirs = ('te', 'ta', 'kn', 'ml', 'hi', 'bn');

for my $lang (@vernacular_dirs) {
    my $blog_dir = "$lang/blog";
    next unless -d $blog_dir;

    opendir(my $dh, $blog_dir) or next;
    my @slugs = grep { !/^\./ && -d "$blog_dir/$_" } readdir($dh);
    closedir($dh);

    for my $slug (@slugs) {
        my $path = "$blog_dir/$slug/index.html";
        next unless -f $path;

        my $html = read_file($path);

        # Already has a STATIC noindex meta in <head> (not inside <script>) — skip
        # We must check before the first <script> tag to avoid matching JS strings
        my $head_portion = '';
        if ($html =~ /^(.*?)<script/s) { $head_portion = $1; }
        if ($head_portion =~ /<meta[^>]+name="robots"[^>]*>/i) {
            $skipped++;
            next;
        }

        # Add noindex right after charset meta
        $html =~ s{(<meta charset="UTF-8">)}{$1\n<meta name="robots" content="noindex, follow">};

        # Also add hreflang pointing to the English equivalent
        # Derive English slug: remove "-te", "-ta", "-kn", "-ml", "-hi", "-bn" suffix
        (my $en_slug = $slug) =~ s/-(?:te|ta|kn|ml|hi|bn)$//;
        # If canonical doesn't already have hreflang en, inject it
        unless ($html =~ /hreflang="en"/) {
            $html =~ s{(<link rel="canonical"[^>]+>)}{$1\n<link rel="alternate" hreflang="en" href="https://wibest.in/blog/$en_slug/">};
        }

        write_file($path, $html);
        $fixed++;
        print "  ✓ noindex added: $lang/blog/$slug\n";
    }
}

print "\n✅ Fix 1 done. Fixed=$fixed | Skipped=$skipped\n\n";

# ── FIX 2: Add noindex to all *-detail.html template files ───────────────────
# These are JS-only shells that Google sees as Soft 404 pages

my @detail_files = qw(
    cars-detail.html
    college-detail.html
    electronics-detail.html
    hospital-detail.html
    school-detail.html
);

my $detail_fixed = 0;
for my $file (@detail_files) {
    next unless -f $file;
    my $html = read_file($file);

    if ($html =~ /name="robots".*noindex/i) {
        print "  — Already noindex: $file\n";
        next;
    }

    # Inject noindex + nofollow right after charset
    $html =~ s{(<meta charset="UTF-8">)}{$1\n<meta name="robots" content="noindex, nofollow">};

    write_file($file, $html);
    $detail_fixed++;
    print "  ✓ noindex added: $file\n";
}
print "\n✅ Fix 2 done. Fixed=$detail_fixed detail files\n\n";

# ── FIX 3: Add noindex to vernacular ROOT pages (/bn/, /te/ etc.) ─────────────
# /bn/ is "Crawled not indexed" — thin landing page with no real content

my $root_fixed = 0;
for my $lang (@vernacular_dirs) {
    my $path = "$lang/index.html";
    next unless -f $path;
    my $html = read_file($path);

    if ($html =~ /name="robots"/) {
        print "  — Already has robots: $lang/index.html\n";
        next;
    }

    $html =~ s{(<meta charset="UTF-8">)}{$1\n<meta name="robots" content="noindex, follow">};
    write_file($path, $html);
    $root_fixed++;
    print "  ✓ noindex added: $lang/index.html\n";
}
print "\n✅ Fix 3 done. Fixed=$root_fixed vernacular root pages\n\n";

print "=== ALL FIXES APPLIED ===\n";
print "Vernacular blog pages noindexed: $fixed\n";
print "Detail template files noindexed: $detail_fixed\n";
print "Vernacular root pages noindexed: $root_fixed\n";
