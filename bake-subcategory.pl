#!/usr/bin/perl
# Bake static listing cards into hospital/restaurant sub-category pages
# whose grid divs are empty JS shells (GSC "thin content" fix).
# Mirrors hospital-specialty.js / restaurant-cuisine.js filtering & markup.
# JS later replaces the grid via innerHTML, so no duplication for users.
use strict;
use warnings;
use utf8;
binmode STDOUT, ':utf8';

sub read_file  { open my $fh,'<:utf8',$_[0] or die "$_[0]: $!"; local $/; my $c=<$fh>; close $fh; $c }
sub write_file { my ($f,$c)=@_; open my $fh,'>:utf8',$f or die "$f: $!"; print $fh $c; close $fh }
sub esc { my $s = shift // ''; $s =~ s/&/&amp;/g; $s =~ s/</&lt;/g; $s =~ s/>/&gt;/g; $s =~ s/"/&quot;/g; $s }

# ── Parse a data file of JS object literals into hashrefs ────────────────────
sub parse_entries {
    my ($raw) = @_;
    my @entries;
    # Each entry is {...} on its own (possibly spanning lines); split on top-level objects
    while ($raw =~ /\{([^{}]*(?:\[[^\]]*\][^{}]*)*)\}/gs) {
        my $body = $1;
        my %e;
        # string fields
        while ($body =~ /(\w+)\s*:\s*"((?:[^"\\]|\\.)*)"/g) { $e{$1} = $2; }
        # numeric fields (don't clobber strings already captured)
        while ($body =~ /(\w+)\s*:\s*([\d.]+)\s*[,}]?/g) { $e{$1} //= $2; }
        # array-of-strings fields
        while ($body =~ /(\w+)\s*:\s*\[((?:[^\[\]])*)\]/g) {
            my ($k, $inner) = ($1, $2);
            my @vals = $inner =~ /"((?:[^"\\]|\\.)*)"/g;
            $e{$k} = \@vals;
        }
        push @entries, \%e if $e{n};
    }
    return @entries;
}

my ($h_baked, $h_skipped, $r_baked, $r_skipped) = (0,0,0,0);

# ── HOSPITALS ────────────────────────────────────────────────────────────────
my %hosp_cache;
for my $path (glob("hospitals/*/best-*/index.html")) {
    my $html = read_file($path);
    next unless $html =~ /<div class="grid" id="hospGrid"><\/div>/;

    my ($city)  = $html =~ /window\.WIB_HOSP_CITY\s*=\s*"([^"]+)"/;
    my ($specs) = $html =~ /window\.WIB_HOSP_SPECS\s*=\s*\[([^\]]*)\]/;
    unless ($city) { $h_skipped++; next; }
    my @specs = map { lc } ($specs // '') =~ /"((?:[^"\\]|\\.)*)"/g;

    my ($cityslug) = $path =~ m{^hospitals/([^/]+)/};
    my $datafile = "data/hospitals/$cityslug.js";
    unless (-f $datafile) { print "  — no data: $path\n"; $h_skipped++; next; }
    $hosp_cache{$datafile} //= [ parse_entries(read_file($datafile)) ];

    my @rows = grep {
        ($_->{c} // '') eq $city &&
        (!@specs || do {
            my @hs = map { lc } @{ $_->{s} // [] };
            my $hit = 0;
            for my $sp (@specs) { $hit = 1, last if grep { index($_, $sp) >= 0 } @hs; }
            $hit;
        })
    } @{ $hosp_cache{$datafile} };
    @rows = sort { ($b->{r}//0) <=> ($a->{r}//0) } @rows;
    unless (@rows) { $h_skipped++; next; }

    my $i = 0;
    my $cards = join '', map {
        $i++;
        my $h = $_;
        my $emer  = $h->{er} ? '<span class="emer-tag">24x7 Emergency</span>' : '';
        my $specs_html = join '', map { '<span class="sp-tag">'.esc($_).'</span>' } @{ $h->{s} // [] }[0 .. ($#{$h->{s}//[]} > 3 ? 3 : $#{$h->{s}//[]})];
        my $web = $h->{w} ? '<a href="'.esc($h->{w}).'" target="_blank" rel="noopener" class="btn-web">Website</a>' : '';
        '<div class="hcard">'
        . '<div class="hcard-rank">#'.$i.'</div>'
        . '<div class="hcard-top"><div class="hcard-name">'.esc($h->{n}).'</div><div class="hcard-rating">&#9733; '.($h->{r}//'').'</div></div>'
        . '<div class="hcard-meta">'.esc($h->{t}//'').' &middot; '.($h->{b}//0).' beds &middot; est. '.($h->{e}//'').' &middot; '.esc($h->{a}//'').' '.$emer.'</div>'
        . '<div class="hcard-addr">'.esc($h->{addr}//'').'</div>'
        . '<div class="hcard-specs">'.$specs_html.'</div>'
        . '<div class="hcard-actions">'.$web.'</div>'
        . '</div>'
    } @rows;

    $html =~ s{<div class="grid" id="hospGrid"></div>}{<div class="grid" id="hospGrid">$cards</div>};
    # also fill the count stat if present
    my $count = scalar @rows;
    $html =~ s{(<span id="specCount">)[^<]*(</span>)}{$1$count$2};
    write_file($path, $html);
    $h_baked++;
}

# ── RESTAURANTS ──────────────────────────────────────────────────────────────
my %rest_cache;
for my $path (glob("restaurants/*/best-*/index.html")) {
    my $html = read_file($path);
    next unless $html =~ /<div class="grid" id="restGrid"><\/div>/;

    my ($city) = $html =~ /window\.WIB_REST_CITY\s*=\s*"([^"]+)"/;
    my ($cuis) = $html =~ /window\.WIB_REST_CUISINES\s*=\s*\[([^\]]*)\]/;
    my $has_rx = $html =~ /window\.WIB_REST_NAME_RX\s*=/ ? 1 : 0;
    unless ($city) { $r_skipped++; next; }
    my @cuis = map { lc } ($cuis // '') =~ /"((?:[^"\\]|\\.)*)"/g;

    my ($cityslug) = $path =~ m{^restaurants/([^/]+)/};
    my $datafile = "data/restaurants/$cityslug.js";
    unless (-f $datafile) { print "  — no data: $path\n"; $r_skipped++; next; }
    $rest_cache{$datafile} //= [ parse_entries(read_file($datafile)) ];

    my @rows = grep {
        ($_->{c} // '') eq $city &&
        (!@cuis || do {
            my @rc = map { lc } @{ $_->{cu} // [] };
            my $hit = 0;
            for my $cz (@cuis) { $hit = 1, last if grep { index($_, $cz) >= 0 } @rc; }
            $hit;
        })
    } @{ $rest_cache{$datafile} };
    @rows = sort { ($b->{r}//0) <=> ($a->{r}//0) } @rows;
    # pages relying solely on NAME_RX matching can't be replicated — skip if empty
    unless (@rows) { print "  — no rows".($has_rx?" (NAME_RX page)":"").": $path\n"; $r_skipped++; next; }

    my $i = 0;
    my $cards = join '', map {
        $i++;
        my $r = $_;
        my $budget = ($r->{b}//2) == 1 ? '&#8377;' : ($r->{b}//2) == 2 ? '&#8377;&#8377;' : '&#8377;&#8377;&#8377;';
        my $cu_html = join '', map { '<span class="cu-tag">'.esc($_).'</span>' } @{ $r->{cu} // [] }[0 .. ($#{$r->{cu}//[]} > 3 ? 3 : $#{$r->{cu}//[]})];
        my $veg = $r->{v} ? ' &middot; Veg-friendly' : '';
        '<div class="rcard">'
        . '<div class="rcard-rank">#'.$i.'</div>'
        . '<div class="rcard-top"><div class="rcard-name">'.esc($r->{n}).'</div><div class="rcard-rating">&#9733; '.($r->{r}//'').'</div></div>'
        . '<div class="rcard-meta">'.$budget.$veg.' &middot; '.esc($r->{a}//'').'</div>'
        . '<div class="rcard-cuisines">'.$cu_html.'</div>'
        . '</div>'
    } @rows;

    $html =~ s{<div class="grid" id="restGrid"></div>}{<div class="grid" id="restGrid">$cards</div>};
    my $count = scalar @rows;
    $html =~ s{(<span id="cuisineCount">)[^<]*(</span>)}{$1$count$2};
    write_file($path, $html);
    $r_baked++;
}

print "\n✅ Hospitals: baked=$h_baked skipped=$h_skipped | Restaurants: baked=$r_baked skipped=$r_skipped\n";
