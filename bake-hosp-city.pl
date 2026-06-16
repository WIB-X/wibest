#!/usr/bin/perl
# Bake static hospital cards into /hospitals/<city>/index.html city pages.
# Mirrors the inline render script's .hcard markup exactly; the page's
# inline JS replaces the grid via innerHTML at runtime (no user-facing dup).
use strict; use warnings; use utf8;
binmode STDOUT, ':utf8';

sub rf { open my $fh,'<:utf8',$_[0] or die "$_[0]: $!"; local $/; <$fh> }
sub wf { my ($f,$c)=@_; open my $fh,'>:utf8',$f or die "$f: $!"; print $fh $c }
sub esc { my $s=shift//''; $s=~s/&/&amp;/g; $s=~s/</&lt;/g; $s=~s/>/&gt;/g; $s=~s/"/&quot;/g; $s }

sub parse {
    my ($raw) = @_;
    my @e;
    while ($raw =~ /\{([^{}]*(?:\[[^\]]*\][^{}]*)*)\}/gs) {
        my $b = $1; my %h;
        while ($b =~ /(\w+)\s*:\s*"((?:[^"\\]|\\.)*)"/g) { $h{$1} = $2 }
        while ($b =~ /(\w+)\s*:\s*([\d.]+)\s*[,}]?/g)    { $h{$1} //= $2 }
        while ($b =~ /(\w+)\s*:\s*\[((?:[^\[\]])*)\]/g) {
            my ($k,$i) = ($1,$2);
            my @v = $i =~ /"((?:[^"\\]|\\.)*)"/g;
            $h{$k} = \@v;
        }
        push @e, \%h if $h{n};
    }
    @e;
}

my ($baked,$skip) = (0,0);
for my $path (glob("hospitals/*/index.html")) {
    my $html = rf($path);
    next unless $html =~ /<div class="hosp-grid" id="hospGrid"><\/div>/;
    my ($slug) = $path =~ m{hospitals/([^/]+)/};
    my $df = "data/hospitals/$slug.js";
    unless (-f $df) { print "  skip (no data): $path\n"; $skip++; next }
    my @rows = parse(rf($df));
    @rows = sort { ($b->{r}//0) <=> ($a->{r}//0) } @rows;
    unless (@rows) { print "  skip (no rows): $path\n"; $skip++; next }

    my $cards = join '', map {
        my $h = $_;
        my @sp = @{ $h->{s} // [] };
        @sp = @sp[0..2] if @sp > 3;
        my $specs = join '', map { '<span class="sp-tag">'.esc($_).'</span>' } @sp;
        my $maps = 'https://www.google.com/maps/search/?api=1&query='
                 . esc("$h->{n}, " . ($h->{addr}//'') . ", " . ($h->{c}//''));
        my $web   = $h->{w}     ? '<a href="'.esc($h->{w}).'" target="_blank" rel="noopener" class="btn-web">Website</a>' : '';
        my $phone = $h->{phone} ? '<a href="tel:'.esc($h->{phone}).'" class="btn-phone">Call</a>' : '';
        '<div class="hcard">'
        . '<div class="hcard-name">'.esc($h->{n}).'</div>'
        . ($h->{r} ? '<div class="hcard-rating">&#9733; '.$h->{r}.'</div>' : '')
        . '<div class="hcard-meta">'.esc($h->{t}//'').($h->{b} ? ' &middot; '.$h->{b}.' beds' : '').'</div>'
        . '<div class="hcard-addr">'.esc($h->{addr}//'').'</div>'
        . '<div class="hcard-specs">'.$specs.'</div>'
        . '<div class="hcard-actions">'.$web.$phone.'<a href="'.$maps.'" target="_blank" rel="noopener" class="btn-map">Map</a></div>'
        . '</div>'
    } @rows;

    $html =~ s{<div class="hosp-grid" id="hospGrid"></div>}{<div class="hosp-grid" id="hospGrid">$cards</div>};
    wf($path, $html);
    $baked++;
}
print "\nHospital city pages: baked=$baked skipped=$skip\n";
