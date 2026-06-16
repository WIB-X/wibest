#!/usr/bin/perl
# Bake static restaurant cards into /restaurants/<city>/index.html city pages.
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
for my $path (glob("restaurants/*/index.html")) {
    my $html = rf($path);
    next unless $html =~ /<div class="grid" id="restGrid"><\/div>/;
    my ($city) = $html =~ /window\.WIB_REST_CITY\s*=\s*"([^"]+)"/;
    my ($slug) = $path =~ m{restaurants/([^/]+)/};
    my $df = "data/restaurants/$slug.js";
    unless ($city && -f $df) { print "  skip (no city/data): $path\n"; $skip++; next }
    my @rows = grep { ($_->{c}//'') eq $city } parse(rf($df));
    @rows = sort { ($b->{r}//0) <=> ($a->{r}//0) } @rows;
    unless (@rows) { print "  skip (no rows): $path\n"; $skip++; next }
    my $i = 0;
    my $cards = join '', map {
        $i++;
        my $r = $_;
        my $bud = ($r->{b}//2)==1 ? '&#8377;' : ($r->{b}//2)==2 ? '&#8377;&#8377;' : '&#8377;&#8377;&#8377;';
        my @cu = @{ $r->{cu} // [] };
        @cu = @cu[0..3] if @cu > 4;
        my $cuh = join '', map { '<span class="cu-tag">'.esc($_).'</span>' } @cu;
        '<div class="rcard">'
        . '<div class="rcard-top"><div class="rcard-name">'.esc($r->{n}).'</div>'.($r->{r} ? '<div class="rcard-rating">&#9733; '.$r->{r}.'</div>' : '').'</div>'
        . '<div class="rcard-meta">'.$bud.' &middot; '.esc($r->{a}//'').'</div>'
        . '<div class="rcard-cuisines">'.$cuh.'</div>'
        . '</div>'
    } @rows;
    $html =~ s{<div class="grid" id="restGrid"></div>}{<div class="grid" id="restGrid">$cards</div>};
    wf($path, $html);
    $baked++;
}
print "baked=$baked skipped=$skip\n";
