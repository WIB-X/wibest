#!/usr/bin/perl
use strict;
use warnings;
use utf8;
sub read_file  { my ($f,%o)=@_; open my $fh,'<',$f or die $!; binmode $fh,':utf8'; local $/; my $c=<$fh>; close $fh; $c }
sub write_file { my ($f,$opts,$c)=@_; open my $fh,'>',$f or die $!; binmode $fh,':utf8'; print $fh $c; close $fh }

binmode STDOUT, ':utf8';

my %posts;

my @seed_files = (
    'seed-data-expansion.js',
    'seed-data-expansion-2.js',
    'seed-data-expansion-3.js',
    'seed-data-batch4a-summer.js',
    'seed-data-batch4b-education.js',
    'seed-data-batch4c-tax.js',
    'seed-data-batch4d-hillstations.js',
    'seed-blog/data-blogs-expansion.js',
    'seed-data-batch5a-missing.js',
    'seed-data-batch5b-missing.js',
    'seed-data-batch5c-missing.js',
    'seed-data-batch5d-missing.js',
);

# ── Parse seed files ──────────────────────────────────────────────────────────
for my $file (@seed_files) {
    next unless -f $file;
    print "Loading $file...\n";

    my $raw = read_file($file, binmode => ':utf8');

    # Find each BLOG_POSTS["slug"] = { ... } entry
    # We look for BLOG_POSTS["slug"] = { and then parse fields
    while ($raw =~ /BLOG_POSTS\["([^"]+)"\]\s*=\s*\{/g) {
        my $slug = $1;
        my $pos = pos($raw) - 1; # position of opening {

        # Extract the full object by counting braces
        my $depth = 0;
        my $start = $pos;
        my $obj = '';
        for (my $i = $pos; $i < length($raw); $i++) {
            my $ch = substr($raw, $i, 1);
            if ($ch eq '`') {
                # Skip template literal
                $i++;
                while ($i < length($raw)) {
                    my $tc = substr($raw, $i, 1);
                    if ($tc eq '\\') { $i += 2; next; }
                    last if $tc eq '`';
                    $i++;
                }
            } elsif ($ch eq '"' || $ch eq "'") {
                # Skip string
                my $q = $ch;
                $i++;
                while ($i < length($raw)) {
                    my $sc = substr($raw, $i, 1);
                    if ($sc eq '\\') { $i += 2; next; }
                    last if $sc eq $q;
                    $i++;
                }
            } elsif ($ch eq '{') {
                $depth++;
            } elsif ($ch eq '}') {
                $depth--;
                if ($depth == 0) {
                    $obj = substr($raw, $start, $i - $start + 1);
                    last;
                }
            }
        }

        next unless $obj;

        # Extract fields
        my %p;
        $p{slug} = $slug;

        # title: "..." or title: `...`
        if ($obj =~ /\btitle\s*:\s*"((?:[^"\\]|\\.)*)"/s)   { $p{title} = $1; }
        elsif ($obj =~ /\btitle\s*:\s*`((?:[^`\\]|\\.)*)`/s) { $p{title} = $1; }

        # summary
        if ($obj =~ /\bsummary\s*:\s*"((?:[^"\\]|\\.)*)"/s)   { $p{summary} = $1; }
        elsif ($obj =~ /\bsummary\s*:\s*`((?:[^`\\]|\\.)*)`/s) { $p{summary} = $1; }

        # category
        if ($obj =~ /\bcategory\s*:\s*"((?:[^"\\]|\\.)*)"/s)   { $p{category} = $1; }

        # author
        if ($obj =~ /\bauthor\s*:\s*"((?:[^"\\]|\\.)*)"/s)   { $p{author} = $1; }

        # date
        if ($obj =~ /\bdate\s*:\s*"((?:[^"\\]|\\.)*)"/s)   { $p{date} = $1; }

        # coverImage
        if ($obj =~ /\bcoverImage\s*:\s*"((?:[^"\\]|\\.)*)"/s)   { $p{coverImage} = $1; }

        # content (template literal)
        if ($obj =~ /\bcontent\s*:\s*`([\s\S]*?)`\s*,?\s*(?:tags|faq|readTime|\})/s) {
            $p{content} = $1;
        }

        # faq array
        my @faqs;
        if ($obj =~ /\bfaq\s*:\s*\[([\s\S]*?)\]\s*[,\}]/s) {
            my $faq_block = $1;
            while ($faq_block =~ /\{\s*q\s*:\s*"((?:[^"\\]|\\.)*)"\s*,\s*a\s*:\s*"((?:[^"\\]|\\.)*)"\s*\}/gs) {
                push @faqs, { q => $1, a => $2 };
            }
        }
        $p{faq} = \@faqs;

        $posts{$slug} = \%p if $p{content};
    }
}

printf "\nLoaded %d posts with content.\n\n", scalar keys %posts;

# ── Inject into HTML files ────────────────────────────────────────────────────
sub esc_html {
    my $s = shift // '';
    $s =~ s/&/&amp;/g;
    $s =~ s/</&lt;/g;
    $s =~ s/>/&gt;/g;
    $s =~ s/"/&quot;/g;
    return $s;
}

sub calc_read_time {
    my $html = shift // '';
    $html =~ s/<[^>]+>/ /g;
    my @words = split /\s+/, $html;
    @words = grep { length($_) > 0 } @words;
    return int(scalar(@words) / 200) + 1;
}

sub build_toc {
    my $html = shift;
    my @headings;
    while ($html =~ /<h([23])[^>]*>(.*?)<\/h[23]>/gi) {
        my ($level, $inner) = ($1, $2);
        (my $text = $inner) =~ s/<[^>]+>//g;
        $text =~ s/^\s+|\s+$//g;
        (my $id = lc $text) =~ s/[^a-z0-9]+/-/g;
        $id =~ s/^-|-$//g;
        push @headings, { level => $level, text => $text, id => $id };
    }
    return ('', $html) if @headings < 2;

    # Add IDs
    $html =~ s{<h([23])([^>]*)>(.*?)<\/h[23]>}{
        my ($lv, $attrs, $inner) = ($1, $2, $3);
        (my $text = $inner) =~ s{<[^>]+>}{}g;
        $text =~ s{^\s+}{}; $text =~ s{\s+$}{};
        (my $id = lc $text) =~ s{[^a-z0-9]+}{-}g;
        $id =~ s{^-}{}; $id =~ s{-$}{};
        "<h$lv$attrs id=\"$id\">$inner<\/h$lv>"
    }geis;

    my $toc = '<nav class="toc" aria-label="Table of Contents"><div class="toc-title">Contents</div><ul>';
    for my $h (@headings) {
        my $cls = $h->{level} eq '3' ? ' class="toc-sub"' : '';
        $toc .= "<li$cls><a href=\"#$h->{id}\">" . esc_html($h->{text}) . "</a></li>";
    }
    $toc .= '</ul></nav>';
    return ($toc, $html);
}

my ($updated, $skipped, $missing) = (0, 0, 0);

for my $slug (sort keys %posts) {
    my $p = $posts{$slug};
    my $html_path = "blog/$slug/index.html";

    unless (-f $html_path) {
        print "  — No HTML: $slug\n";
        $missing++;
        next;
    }

    my $html = read_file($html_path, binmode => ':utf8');

    if ($html =~ /data-static-baked="true"/) {
        $skipped++;
        next;
    }

    my $title      = $p->{title}      // $slug;
    my $summary    = $p->{summary}    // '';
    my $category   = $p->{category}   // 'Guide';
    my $author     = $p->{author}     // 'WIB Editorial';
    my $date       = $p->{date}       // '';
    my $coverImage = $p->{coverImage} // '';
    my $content    = $p->{content}    // '';
    my $read_time  = calc_read_time($content);
    my ($toc, $content_with_ids) = build_toc($content);

    # Build FAQ HTML
    my $faq_html = '';
    if (@{$p->{faq}} >= 2) {
        $faq_html = '<section style="margin-top:36px;padding:24px 28px;background:var(--bg-card);border:1px solid var(--border);border-radius:12px">';
        $faq_html .= '<h2 style="font-family:Outfit,sans-serif;font-size:20px;font-weight:700;margin:0 0 16px">Frequently asked questions</h2>';
        for my $f (@{$p->{faq}}) {
            $faq_html .= '<details style="border-bottom:1px solid var(--border);padding:14px 0">';
            $faq_html .= '<summary style="font-weight:600;cursor:pointer;list-style:none">' . esc_html($f->{q}) . '</summary>';
            $faq_html .= '<p style="margin:10px 0 0;color:var(--text-secondary);font-size:14.5px;line-height:1.7">' . $f->{a} . '</p>';
            $faq_html .= '</details>';
        }
        $faq_html .= '</section>';
    }

    my $img_html = $coverImage
        ? qq(<img src=") . esc_html($coverImage) . qq(" alt=") . esc_html($title) . qq(" loading="lazy" style="width:100%;aspect-ratio:16/9;object-fit:cover;max-height:320px;border-radius:12px;margin-bottom:24px">)
        : '';

    my $summary_html = $summary
        ? qq(<p style="font-size:16px;color:var(--text-secondary);line-height:1.7;margin-bottom:24px;padding-bottom:20px;border-bottom:1px solid var(--border)">) . esc_html($summary) . q(</p>)
        : '';

    my $date_html  = $date   ? qq(<span>&#128197; ) . esc_html($date) . q(</span>) : '';
    my $author_html = $author ? qq(<span>By ) . esc_html($author) . q(</span>) : '';

    my $static_html = <<"STATIC_HTML";
<div class="breadcrumb"><a href="/blog">Blog</a> &rsaquo; ${\ esc_html($title)}</div>
$img_html
<div class="article-category">${\ esc_html($category)}</div>
<h1>${\ esc_html($title)}</h1>
<div class="article-meta"><span>&#9201; $read_time min read</span>$date_html$author_html</div>
$summary_html
$toc
<div class="article-body">$content_with_ids</div>
$faq_html
<div style="margin-top:40px;padding-top:24px;border-top:1px solid var(--border)">
  <a href="/blog" style="display:inline-block;padding:10px 20px;border:1px solid var(--border);border-radius:8px;font-size:13px;text-decoration:none;color:var(--text-primary)">&larr; Back to Blog</a>
</div>
STATIC_HTML

    # Replace the articleContent div
    my $new_div = qq(<div class="article" id="articleContent" data-static-baked="true">\n$static_html\n</div>);

    if ($html =~ s{<div[^>]+id="articleContent"[^>]*>[\s\S]*?</div>(?=\s*<script)}{$new_div}) {
        # replaced
    } elsif ($html =~ s{(<div[^>]+id="articleContent"[^>]*>)}{$1\n$static_html}) {
        # fallback: just prepend
    } else {
        print "  ⚠ Could not find articleContent in: $slug\n";
        $missing++;
        next;
    }

    # Inject Article JSON-LD if not present
    unless ($html =~ /"Article"/) {
        my $title_j = $title; $title_j =~ s/"/\\"/g;
        my $desc_j  = $summary; $desc_j =~ s/"/\\"/g;
        my $date_j  = $date || '2025-01-01';
        my $ctx = 'https://schema.org';
        my $atype = 'Article';
        my $otype = 'Organization';
        my $jsonld = "<script type=\"application/ld+json\">{\"\\x40context\":\"$ctx\",\"\\x40type\":\"$atype\",\"headline\":\"$title_j\",\"description\":\"$desc_j\",\"author\":{\"\\x40type\":\"$otype\",\"name\":\"WIB Editorial\"},\"publisher\":{\"\\x40type\":\"$otype\",\"name\":\"WIB\",\"url\":\"https://wibest.in\"},\"datePublished\":\"$date_j\",\"dateModified\":\"2026-06-06\",\"url\":\"https://wibest.in/blog/$slug/\"}</script>";
        $html =~ s{</head>}{$jsonld\n</head>};
    }

    # Inject FAQ JSON-LD statically if faq present and not already there
    if (@{$p->{faq}} >= 2 && $html !~ /"FAQPage"/) {
        my @faq_items;
        my $qtype = 'Question';
        my $atype2 = 'Answer';
        for my $f (@{$p->{faq}}) {
            (my $q = $f->{q}) =~ s/"/\\"/g;
            (my $a = $f->{a}) =~ s/"/\\"/g;
            push @faq_items, "{\"\\x40type\":\"$qtype\",\"name\":\"$q\",\"acceptedAnswer\":{\"\\x40type\":\"$atype2\",\"text\":\"$a\"}}";
        }
        my $ctx = 'https://schema.org';
        my $ftype = 'FAQPage';
        my $faq_jsonld = '<script type="application/ld+json">{"\\x40context":"' . $ctx . '","\\x40type":"' . $ftype . '","mainEntity":[' . join(',', @faq_items) . ']}</script>';
        $html =~ s{</head>}{$faq_jsonld\n</head>};
    }

    write_file($html_path, { binmode => ':utf8' }, $html);
    $updated++;
    print "  ✓ $slug\n";
}

print "\n✅ Done. Updated=$updated | Skipped=$skipped | Missing HTML=$missing\n";
