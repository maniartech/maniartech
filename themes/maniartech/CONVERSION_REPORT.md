# Conversion Report — external theme `Infolio` → Taj Mahal theme `maniartech`

Generated 2026-06-30 by prepare-theme-conversion.js.
Work through references/workflows/convert-external-theme.md using this inventory.

## HTML pages to convert into Pongo2 templates

Originals staged in `_source-html/`. For each: decide its role (layout source / general page / list / article / docs / 404), then convert into `templates/`. Delete `_source-html/` when conversion is complete.

- [ ] `_source-html/blog-classic.html` → templates/______.html (role: ______)
- [ ] `_source-html/blog-details.html` → templates/______.html (role: ______)
- [ ] `_source-html/blog-list.html` → templates/______.html (role: ______)
- [ ] `_source-html/blog-list2.html` → templates/______.html (role: ______)
- [ ] `_source-html/docs\index.html` → templates/______.html (role: ______)
- [ ] `_source-html/home-asymmetric-portfolio.html` → templates/______.html (role: ______)
- [ ] `_source-html/home-creative-agency.html` → templates/______.html (role: ______)
- [ ] `_source-html/home-creative-portfolio.html` → templates/______.html (role: ______)
- [ ] `_source-html/home-digital-agency.html` → templates/______.html (role: ______)
- [ ] `_source-html/home-freelancer.html` → templates/______.html (role: ______)
- [ ] `_source-html/home-main.html` → templates/______.html (role: ______)
- [ ] `_source-html/home-minimal-portfolio.html` → templates/______.html (role: ______)
- [ ] `_source-html/home-modern-agency.html` → templates/______.html (role: ______)
- [ ] `_source-html/home-personal-vcard.html` → templates/______.html (role: ______)
- [ ] `_source-html/home-startup-onepage.html` → templates/______.html (role: ______)
- [ ] `_source-html/page-FAQS.html` → templates/______.html (role: ______)
- [ ] `_source-html/page-about.html` → templates/______.html (role: ______)
- [ ] `_source-html/page-about2.html` → templates/______.html (role: ______)
- [ ] `_source-html/page-about3.html` → templates/______.html (role: ______)
- [ ] `_source-html/page-contact.html` → templates/______.html (role: ______)
- [ ] `_source-html/page-contact2.html` → templates/______.html (role: ______)
- [ ] `_source-html/page-contact3.html` → templates/______.html (role: ______)
- [ ] `_source-html/page-error404.html` → templates/______.html (role: ______)
- [ ] `_source-html/page-services-details.html` → templates/______.html (role: ______)
- [ ] `_source-html/page-services.html` → templates/______.html (role: ______)
- [ ] `_source-html/page-services2.html` → templates/______.html (role: ______)
- [ ] `_source-html/page-team-single.html` → templates/______.html (role: ______)
- [ ] `_source-html/page-team.html` → templates/______.html (role: ______)
- [ ] `_source-html/portfolio-caption-cursor.html` → templates/______.html (role: ______)
- [ ] `_source-html/portfolio-gallery.html` → templates/______.html (role: ______)
- [ ] `_source-html/portfolio-masonry.html` → templates/______.html (role: ______)
- [ ] `_source-html/portfolio-metro.html` → templates/______.html (role: ______)
- [ ] `_source-html/portfolio-outline.html` → templates/______.html (role: ______)
- [ ] `_source-html/portfolio-parallax.html` → templates/______.html (role: ______)
- [ ] `_source-html/portfolio-standard.html` → templates/______.html (role: ______)
- [ ] `_source-html/portfolio-sticky.html` → templates/______.html (role: ______)
- [ ] `_source-html/project1.html` → templates/______.html (role: ______)
- [ ] `_source-html/project2.html` → templates/______.html (role: ______)
- [ ] `_source-html/project3.html` → templates/______.html (role: ______)
- [ ] `_source-html/project4.html` → templates/______.html (role: ______)
- [ ] `_source-html/project5.html` → templates/______.html (role: ______)
- [ ] `_source-html/project6.html` → templates/______.html (role: ______)
- [ ] `_source-html/showcase-carousel.html` → templates/______.html (role: ______)
- [ ] `_source-html/showcase-fullscreen.html` → templates/______.html (role: ______)
- [ ] `_source-html/showcase-half-slider.html` → templates/______.html (role: ______)
- [ ] `_source-html/showcase-interactive-center.html` → templates/______.html (role: ______)
- [ ] `_source-html/showcase-interactive-full.html` → templates/______.html (role: ______)
- [ ] `_source-html/showcase-interactive-vertical.html` → templates/______.html (role: ______)

## CSS/JS staged in _review/ — CURATE, do not bulk-copy (82)

These are NOT yet wired into the theme. Purchased themes over-bundle; lib/ tree-shakes, so bring in ONLY what the site uses. For each file decide:

- **keep → lib/**: a stylesheet/script you'll actually use AND can feed esbuild as source (CSS/SCSS, or JS with imports). Move it to `lib/`, reference with `{% lib %}`. Prefer real source over the shipped .min file.
- **keep → assets/**: a genuinely standalone, pre-built dependency you cannot/should not re-process. Move to `assets/`, reference with `{% assets %}`. Use sparingly — this preserves whatever bloat it contains.
- **drop**: unused plugins/widgets the purchased theme bundled but the site doesn't need. Leave in `_review/` and delete the dir at the end.

| File (in _review/) | Size KB | Vendor/minified? |
|---|---|---|
| `assets\css\plugins\bootstrap.min.css` | 158.9 | yes — likely bloat |
| `docs\css\bootstrap.min.css` | 158.9 | yes — likely bloat |
| `assets\js\jquery-3.6.0.min.js` | 87.4 | yes — likely bloat |
| `docs\js\jquery-3.6.0.min.js` | 87.4 | yes — likely bloat |
| `assets\js\gsap.min.js` | 69.7 | yes — likely bloat |
| `assets\css\plugins\fontawesome-all.min.css` | 57.9 | yes — likely bloat |
| `docs\css\fontawesome-all.min.css` | 57.9 | yes — likely bloat |
| `assets\js\ScrollTrigger.min.js` | 40.3 | yes — likely bloat |
| `assets\css\plugins\animate.min.css` | 16.6 | yes — likely bloat |
| `assets\css\plugins\themify-icons.css` | 16.1 | yes — likely bloat |
| `assets\css\plugins\swiper.min.css` | 13.3 | yes — likely bloat |
| `assets\js\jquery-migrate-3.4.0.min.js` | 13.1 | yes — likely bloat |
| `assets\js\ScrollSmoother.min.js` | 11.9 | yes — likely bloat |
| `assets\css\plugins\pe-icon-7-stroke.css` | 9.5 | yes — likely bloat |
| `assets\css\plugins\magnific-popup.css` | 6.8 | yes — likely bloat |
| `docs\js\sticky-kit.min.js` | 3.2 | yes — likely bloat |
| `assets\css\plugins\YouTubePopUp.css` | 3.1 | yes — likely bloat |
| `assets\css\plugins\justifiedGallery.min.css` | 2.8 | yes — likely bloat |
| `assets\js\charming.min.js` | 0.5 | yes — likely bloat |
| `assets\js\plugins.js` | 478.5 | no |
| `assets\css\style.css` | 183.5 | no |
| `assets\js\demo.js` | 103.8 | no |
| `docs\js\bootstrap5.js` | 77 | no |
| `assets\js\scripts.js` | 42.6 | no |
| `assets\scss\utility\_responsive.scss` | 25 | no |
| `assets\scss\components\_helper.scss` | 20.9 | no |
| `assets\css\components\_helper.css` | 19.7 | no |
| `assets\scss\layout\_portfolio.scss` | 18.2 | no |
| `docs\css\helper.css` | 18.2 | no |
| `assets\scss\layout\_blog.scss` | 15.6 | no |
| `assets\css\layout\_slider.css` | 13.4 | no |
| `assets\scss\layout\_slider.scss` | 12.3 | no |
| `assets\scss\components\_menu.scss` | 11.6 | no |
| `docs\css\pe-icon-7-stroke.css` | 9.5 | no |
| `assets\scss\layout\_header.scss` | 8 | no |
| `assets\scss\layout\_services.scss` | 7.9 | no |
| `assets\scss\components\_typography.scss` | 7.4 | no |
| `assets\scss\layout\_brand.scss` | 7.4 | no |
| `assets\scss\layout\_team.scss` | 7.4 | no |
| `assets\scss\components\_extra.scss` | 7.1 | no |
| `assets\css\components\_cursor.css` | 5.6 | no |
| `assets\scss\layout\_testimonials.scss` | 5.4 | no |
| `assets\css\satoshi.css` | 4.8 | no |
| `assets\scss\layout\_contact.scss` | 4.4 | no |
| `assets\scss\layout\_about.scss` | 4.3 | no |
| `assets\scss\layout\_hero.scss` | 4.2 | no |
| `assets\scss\layout\_interactive.scss` | 4.2 | no |
| `assets\js\map.js` | 3.8 | no |
| `assets\scss\components\_buttons.scss` | 3.7 | no |
| `docs\css\style.css` | 3.6 | no |
| `assets\scss\components\_cursor.scss` | 3.1 | no |
| `assets\js\countdown.js` | 2.1 | no |
| `assets\scss\components\_overlay.scss` | 2.1 | no |
| `assets\scss\layout\_video.scss` | 1.7 | no |
| `assets\scss\style.scss` | 1.6 | no |
| `assets\scss\layout\_footer.scss` | 1.5 | no |
| `assets\scss\layout\_features.scss` | 1.4 | no |
| `docs\js\scroll-it.js` | 1.4 | no |
| `assets\scss\components\_preloader.scss` | 1.3 | no |
| `assets\scss\components\_title.scss` | 1.3 | no |
| `assets\css\plugins.css` | 1.2 | no |
| `assets\css\components\_title.css` | 1.1 | no |
| `assets\scss\layout\_awards.scss` | 1.1 | no |
| `assets\scss\layout\_price.scss` | 1 | no |
| `docs\js\scripts.js` | 0.7 | no |
| `assets\css\base.css` | 0.6 | no |
| `assets\js\hscroll.js` | 0.6 | no |
| `assets\scss\layout\_process.scss` | 0.3 | no |
| `assets\scss\utility\_variables.scss` | 0.3 | no |
| `assets\css\layout\_process.css` | 0.2 | no |
| `assets\js\smoother-script.js` | 0.2 | no |
| `assets\css\components\_buttons.css` | 0.1 | no |
| `assets\css\layout\_shop.css` | 0.1 | no |
| `assets\css\utility\_variables.css` | 0.1 | no |
| `assets\scss\layout\_shop.scss` | 0.1 | no |
| `assets\scss\components\_modal.scss` | 0 | no |
| `assets\scss\layout\_career.scss` | 0 | no |
| `assets\scss\layout\_clients.scss` | 0 | no |
| `assets\scss\layout\_counter.scss` | 0 | no |
| `assets\scss\utility\_animation.scss` | 0 | no |
| `assets\scss\utility\_mixin.scss` | 0 | no |
| `assets\scss\utility\_theme-dark.scss` | 0 | no |

## Files copied to assets/ (need no processing: images, fonts, media) (379)

- `assets/assets\fonts\FontAwesome.otf`
- `assets/assets\fonts\Pe-icon-7-stroke.eot`
- `assets/assets\fonts\Pe-icon-7-stroke.ttf`
- `assets/assets\fonts\Pe-icon-7-stroke.woff`
- `assets/assets\fonts\Satoshi\Satoshi-Black.eot`
- `assets/assets\fonts\Satoshi\Satoshi-Black.ttf`
- `assets/assets\fonts\Satoshi\Satoshi-Black.woff`
- `assets/assets\fonts\Satoshi\Satoshi-Black.woff2`
- `assets/assets\fonts\Satoshi\Satoshi-BlackItalic.eot`
- `assets/assets\fonts\Satoshi\Satoshi-BlackItalic.ttf`
- `assets/assets\fonts\Satoshi\Satoshi-BlackItalic.woff`
- `assets/assets\fonts\Satoshi\Satoshi-BlackItalic.woff2`
- `assets/assets\fonts\Satoshi\Satoshi-Bold.eot`
- `assets/assets\fonts\Satoshi\Satoshi-Bold.ttf`
- `assets/assets\fonts\Satoshi\Satoshi-Bold.woff`
- `assets/assets\fonts\Satoshi\Satoshi-Bold.woff2`
- `assets/assets\fonts\Satoshi\Satoshi-BoldItalic.eot`
- `assets/assets\fonts\Satoshi\Satoshi-BoldItalic.ttf`
- `assets/assets\fonts\Satoshi\Satoshi-BoldItalic.woff`
- `assets/assets\fonts\Satoshi\Satoshi-BoldItalic.woff2`
- `assets/assets\fonts\Satoshi\Satoshi-Italic.eot`
- `assets/assets\fonts\Satoshi\Satoshi-Italic.ttf`
- `assets/assets\fonts\Satoshi\Satoshi-Italic.woff`
- `assets/assets\fonts\Satoshi\Satoshi-Italic.woff2`
- `assets/assets\fonts\Satoshi\Satoshi-Light.eot`
- `assets/assets\fonts\Satoshi\Satoshi-Light.ttf`
- `assets/assets\fonts\Satoshi\Satoshi-Light.woff`
- `assets/assets\fonts\Satoshi\Satoshi-Light.woff2`
- `assets/assets\fonts\Satoshi\Satoshi-LightItalic.eot`
- `assets/assets\fonts\Satoshi\Satoshi-LightItalic.ttf`
- `assets/assets\fonts\Satoshi\Satoshi-LightItalic.woff`
- `assets/assets\fonts\Satoshi\Satoshi-LightItalic.woff2`
- `assets/assets\fonts\Satoshi\Satoshi-Medium.eot`
- `assets/assets\fonts\Satoshi\Satoshi-Medium.ttf`
- `assets/assets\fonts\Satoshi\Satoshi-Medium.woff`
- `assets/assets\fonts\Satoshi\Satoshi-Medium.woff2`
- `assets/assets\fonts\Satoshi\Satoshi-MediumItalic.eot`
- `assets/assets\fonts\Satoshi\Satoshi-MediumItalic.ttf`
- `assets/assets\fonts\Satoshi\Satoshi-MediumItalic.woff`
- `assets/assets\fonts\Satoshi\Satoshi-MediumItalic.woff2`
- `assets/assets\fonts\Satoshi\Satoshi-Regular.eot`
- `assets/assets\fonts\Satoshi\Satoshi-Regular.ttf`
- `assets/assets\fonts\Satoshi\Satoshi-Regular.woff`
- `assets/assets\fonts\Satoshi\Satoshi-Regular.woff2`
- `assets/assets\fonts\Satoshi\Satoshi-Variable.eot`
- `assets/assets\fonts\Satoshi\Satoshi-Variable.ttf`
- `assets/assets\fonts\Satoshi\Satoshi-Variable.woff`
- `assets/assets\fonts\Satoshi\Satoshi-Variable.woff2`
- `assets/assets\fonts\Satoshi\Satoshi-VariableItalic.eot`
- `assets/assets\fonts\Satoshi\Satoshi-VariableItalic.ttf`
- `assets/assets\fonts\Satoshi\Satoshi-VariableItalic.woff`
- `assets/assets\fonts\Satoshi\Satoshi-VariableItalic.woff2`
- `assets/assets\fonts\fa-brands-400.eot`
- `assets/assets\fonts\fa-brands-400.ttf`
- `assets/assets\fonts\fa-brands-400.woff`
- `assets/assets\fonts\fa-brands-400.woff2`
- `assets/assets\fonts\fa-regular-400.eot`
- `assets/assets\fonts\fa-regular-400.ttf`
- `assets/assets\fonts\fa-regular-400.woff`
- `assets/assets\fonts\fa-regular-400.woff2`
- `assets/assets\fonts\fa-solid-900.eot`
- `assets/assets\fonts\fa-solid-900.ttf`
- `assets/assets\fonts\fa-solid-900.woff`
- `assets/assets\fonts\fa-solid-900.woff2`
- `assets/assets\fonts\fontawesome-webfont.eot`
- `assets/assets\fonts\fontawesome-webfont.ttf`
- `assets/assets\fonts\fontawesome-webfont.woff`
- `assets/assets\fonts\fontawesome-webfont.woff2`
- `assets/assets\fonts\themify.eot`
- `assets/assets\fonts\themify.ttf`
- `assets/assets\fonts\themify.woff`
- `assets/assets\imgs\404.png`
- `assets/assets\imgs\arrow-right.png`
- `assets/assets\imgs\background\0.jpg`
- `assets/assets\imgs\background\1.jpg`
- `assets/assets\imgs\background\2.jpg`
- `assets/assets\imgs\background\3.jpg`
- `assets/assets\imgs\background\4.jpg`
- `assets/assets\imgs\background\5.jpg`
- `assets/assets\imgs\background\6.jpg`
- `assets/assets\imgs\background\7.jpg`
- `assets/assets\imgs\background\8.jpg`
- `assets/assets\imgs\blog\0.jpg`
- `assets/assets\imgs\blog\1.jpg`
- `assets/assets\imgs\blog\author.png`
- `assets/assets\imgs\blog\b1.jpg`
- `assets/assets\imgs\blog\b2.jpg`
- `assets/assets\imgs\blog\b3.jpg`
- `assets/assets\imgs\blog\b\1.jpg`
- `assets/assets\imgs\blog\b\10.jpg`
- `assets/assets\imgs\blog\b\11.jpg`
- `assets/assets\imgs\blog\b\12.jpg`
- `assets/assets\imgs\blog\b\2.jpg`
- `assets/assets\imgs\blog\b\3.jpg`
- `assets/assets\imgs\blog\b\4.jpg`
- `assets/assets\imgs\blog\b\5.jpg`
- `assets/assets\imgs\blog\b\6.jpg`
- `assets/assets\imgs\blog\b\7.jpg`
- `assets/assets\imgs\blog\b\8.jpg`
- `assets/assets\imgs\blog\b\9.jpg`
- `assets/assets\imgs\blog\blog1.jpg`
- `assets/assets\imgs\blog\blog2.jpg`
- `assets/assets\imgs\blog\blog3.jpg`
- `assets/assets\imgs\blog\blog4.jpg`
- `assets/assets\imgs\blog\blog5.jpg`
- `assets/assets\imgs\blog\c1.jpg`
- `assets/assets\imgs\blog\c2.jpg`
- `assets/assets\imgs\blog\c3.jpg`
- `assets/assets\imgs\blog\c4.jpg`
- `assets/assets\imgs\blog\c5.jpg`
- `assets/assets\imgs\blog\c6.jpg`
- `assets/assets\imgs\brands\01.png`
- `assets/assets\imgs\brands\02.png`
- `assets/assets\imgs\brands\03.png`
- `assets/assets\imgs\brands\04.png`
- `assets/assets\imgs\brands\05.png`
- `assets/assets\imgs\brands\06.png`
- `assets/assets\imgs\brands\07.png`
- `assets/assets\imgs\brands\08.png`
- `assets/assets\imgs\brands\1.png`
- `assets/assets\imgs\brands\2.png`
- `assets/assets\imgs\brands\3.png`
- `assets/assets\imgs\brands\4.png`
- `assets/assets\imgs\brands\5.png`
- `assets/assets\imgs\brands\6.png`
- `assets/assets\imgs\brands\7.png`
- `assets/assets\imgs\brands\8.png`
- `assets/assets\imgs\brands\b1.png`
- `assets/assets\imgs\brands\b2.png`
- `assets/assets\imgs\brands\b3.png`
- `assets/assets\imgs\brands\b4.png`
- `assets/assets\imgs\brands\b5.png`
- `assets/assets\imgs\brands\b6.png`
- `assets/assets\imgs\brands\b7.png`
- `assets/assets\imgs\brands\b8.png`
- `assets/assets\imgs\brands\c1.png`
- `assets/assets\imgs\brands\c2.svg`
- `assets/assets\imgs\brands\c3.svg`
- `assets/assets\imgs\brands\c4.svg`
- `assets/assets\imgs\brands\c5.svg`
- `assets/assets\imgs\favicon.ico`
- `assets/assets\imgs\header\1.jpg`
- `assets/assets\imgs\header\2.jpg`
- `assets/assets\imgs\header\3.jpg`
- `assets/assets\imgs\header\4.jpg`
- `assets/assets\imgs\header\5.jpg`
- `assets/assets\imgs\header\6.jpg`
- `assets/assets\imgs\header\b5.jpg`
- `assets/assets\imgs\header\b8.jpg`
- `assets/assets\imgs\header\bg-4.png`
- `assets/assets\imgs\header\bg1.jpg`
- `assets/assets\imgs\header\full\1.jpg`
- `assets/assets\imgs\header\full\2.jpg`
- `assets/assets\imgs\header\full\3.jpg`
- `assets/assets\imgs\header\full\4.jpg`
- `assets/assets\imgs\icon-img\shape03.png`
- `assets/assets\imgs\icon-img\shape1.png`
- `assets/assets\imgs\icon-img\shape2.png`
- `assets/assets\imgs\icon-img\shape3.png`
- `assets/assets\imgs\icon-img\shape4.png`
- `assets/assets\imgs\icon-img\shape5.png`
- `assets/assets\imgs\icon-img\shape6.png`
- `assets/assets\imgs\intro\01.jpg`
- `assets/assets\imgs\intro\02.jpg`
- `assets/assets\imgs\intro\03.jpg`
- `assets/assets\imgs\intro\04.jpg`
- `assets/assets\imgs\intro\1.jpg`
- `assets/assets\imgs\intro\2.jpg`
- `assets/assets\imgs\intro\freelancer-intro.jpg`
- `assets/assets\imgs\intro\freelancer.png`
- `assets/assets\imgs\intro\vcard0.png`
- `assets/assets\imgs\logo-dark.png`
- `assets/assets\imgs\logo-light.png`
- `assets/assets\imgs\map.png`
- `assets/assets\imgs\noise.png`
- `assets/assets\imgs\patterns\1.png`
- `assets/assets\imgs\patterns\1.svg`
- `assets/assets\imgs\patterns\abstact-BG.png`
- `assets/assets\imgs\patterns\asx7.png`
- `assets/assets\imgs\patterns\bg-lines-1.svg`
- `assets/assets\imgs\patterns\bg-pattern.png`
- `assets/assets\imgs\patterns\dots.png`
- `assets/assets\imgs\patterns\dots2.png`
- `assets/assets\imgs\patterns\graph.png`
- `assets/assets\imgs\patterns\home-hero-lines-2.svg`
- `assets/assets\imgs\patterns\home-inspiration-lines.svg`
- `assets/assets\imgs\patterns\lines.png`
- `assets/assets\imgs\patterns\lines1.png`
- `assets/assets\imgs\patterns\noise.png`
- `assets/assets\imgs\patterns\noise1.png`
- `assets/assets\imgs\patterns\patt.svg`
- `assets/assets\imgs\patterns\pattern.png`
- `assets/assets\imgs\patterns\pattern.svg`
- `assets/assets\imgs\patterns\pattern2.png`
- `assets/assets\imgs\patterns\pattern3.png`
- `assets/assets\imgs\resume\s1.png`
- `assets/assets\imgs\resume\s2.png`
- `assets/assets\imgs\resume\s3.png`
- `assets/assets\imgs\resume\s4.png`
- `assets/assets\imgs\resume\s5.png`
- `assets/assets\imgs\resume\s6.png`
- `assets/assets\imgs\serv-icons\0.png`
- `assets/assets\imgs\serv-icons\01-dark.svg`
- `assets/assets\imgs\serv-icons\02-dark.svg`
- `assets/assets\imgs\serv-icons\03-dark.svg`
- `assets/assets\imgs\serv-icons\04-dark.svg`
- `assets/assets\imgs\serv-icons\05-dark.svg`
- `assets/assets\imgs\serv-icons\1.png`
- `assets/assets\imgs\serv-icons\2.png`
- `assets/assets\imgs\serv-icons\3.png`
- `assets/assets\imgs\serv-icons\4.png`
- `assets/assets\imgs\serv-icons\5.png`
- `assets/assets\imgs\serv-icons\6.png`
- `assets/assets\imgs\serv-img\1.jpg`
- `assets/assets\imgs\serv-img\2.jpg`
- `assets/assets\imgs\serv-img\3.jpg`
- `assets/assets\imgs\serv-img\4.jpg`
- `assets/assets\imgs\social-media\behance.png`
- `assets/assets\imgs\social-media\facebook.png`
- `assets/assets\imgs\social-media\linkedin.png`
- `assets/assets\imgs\social-media\twitter.png`
- `assets/assets\imgs\svg-img\arrow-right.svg`
- `assets/assets\imgs\svg-img\contact_globe.png`
- `assets/assets\imgs\svg-img\contact_globe.svg`
- `assets/assets\imgs\team\1.jpg`
- `assets/assets\imgs\team\2.jpg`
- `assets/assets\imgs\team\3.jpg`
- `assets/assets\imgs\team\4.jpg`
- `assets/assets\imgs\team\t1.jpg`
- `assets/assets\imgs\team\t2.jpg`
- `assets/assets\imgs\team\t3.jpg`
- `assets/assets\imgs\team\t4.jpg`
- `assets/assets\imgs\team\t5.jpg`
- `assets/assets\imgs\testim\1.jpg`
- `assets/assets\imgs\testim\2.jpg`
- `assets/assets\imgs\testim\3.jpg`
- `assets/assets\imgs\testim\4.jpg`
- `assets/assets\imgs\testim\t1.jpg`
- `assets/assets\imgs\testim\t2.jpg`
- `assets/assets\imgs\testim\t3.jpg`
- `assets/assets\imgs\testim\t4.jpg`
- `assets/assets\imgs\works\1\1.jpg`
- `assets/assets\imgs\works\1\2.jpg`
- `assets/assets\imgs\works\1\3.jpg`
- `assets/assets\imgs\works\1\4.jpg`
- `assets/assets\imgs\works\1\5.jpg`
- `assets/assets\imgs\works\1\6.jpg`
- `assets/assets\imgs\works\1\h1.jpg`
- `assets/assets\imgs\works\1\h2.png`
- `assets/assets\imgs\works\1\q1.jpg`
- `assets/assets\imgs\works\1\q2.jpg`
- `assets/assets\imgs\works\1\q3.jpg`
- `assets/assets\imgs\works\1\q4.jpg`
- `assets/assets\imgs\works\1\q5.jpg`
- `assets/assets\imgs\works\1\q6.jpg`
- `assets/assets\imgs\works\1\q7.jpg`
- `assets/assets\imgs\works\1\q8.jpg`
- `assets/assets\imgs\works\1\q9.jpg`
- `assets/assets\imgs\works\1\v2.jpg`
- `assets/assets\imgs\works\1\v3.jpg`
- `assets/assets\imgs\works\2\0.png`
- `assets/assets\imgs\works\2\1.jpg`
- `assets/assets\imgs\works\2\2.jpg`
- `assets/assets\imgs\works\2\3.jpg`
- `assets/assets\imgs\works\2\4.jpg`
- `assets/assets\imgs\works\2\5.jpg`
- `assets/assets\imgs\works\2\7.jpg`
- `assets/assets\imgs\works\2\9.jpg`
- `assets/assets\imgs\works\3\0.jpg`
- `assets/assets\imgs\works\3\1.jpg`
- `assets/assets\imgs\works\3\2.jpg`
- `assets/assets\imgs\works\3\3.jpg`
- `assets/assets\imgs\works\3\4.jpg`
- `assets/assets\imgs\works\4\1.jpg`
- `assets/assets\imgs\works\4\2.jpg`
- `assets/assets\imgs\works\4\3.jpg`
- `assets/assets\imgs\works\4\4.jpg`
- `assets/assets\imgs\works\4\h1.jpg`
- `assets/assets\imgs\works\4\h2.jpg`
- `assets/assets\imgs\works\4\h3.jpg`
- `assets/assets\imgs\works\4\h4.jpg`
- `assets/assets\imgs\works\5\1.jpg`
- `assets/assets\imgs\works\5\2.jpg`
- `assets/assets\imgs\works\5\3.jpg`
- `assets/assets\imgs\works\5\4.jpg`
- `assets/assets\imgs\works\full\1.jpg`
- `assets/assets\imgs\works\full\2.jpg`
- `assets/assets\imgs\works\full\3.jpg`
- `assets/assets\imgs\works\full\4.jpg`
- `assets/assets\imgs\works\full\5.jpg`
- `assets/assets\imgs\works\full\6.jpg`
- `assets/assets\imgs\works\full\7.jpg`
- `assets/assets\imgs\works\full\8.jpg`
- `assets/assets\imgs\works\full\9.jpg`
- `assets/assets\imgs\works\full\vid.png`
- `assets/assets\imgs\works\projects\0\0.jpg`
- `assets/assets\imgs\works\projects\0\1.jpg`
- `assets/assets\imgs\works\projects\0\2.jpg`
- `assets/assets\imgs\works\projects\0\3.jpg`
- `assets/assets\imgs\works\projects\0\4.jpg`
- `assets/assets\imgs\works\projects\0\5.jpg`
- `assets/assets\imgs\works\projects\0\6.jpg`
- `assets/assets\imgs\works\projects\0\7.jpg`
- `assets/assets\imgs\works\projects\0\8.jpg`
- `assets/assets\imgs\works\projects\1\1.jpg`
- `assets/assets\imgs\works\projects\1\2.jpg`
- `assets/assets\imgs\works\projects\1\3.jpg`
- `assets/assets\imgs\works\projects\1\4.jpg`
- `assets/assets\imgs\works\projects\1\5.jpg`
- `assets/assets\imgs\works\projects\1\6.jpg`
- `assets/assets\imgs\works\projects\2\1.jpg`
- `assets/assets\imgs\works\projects\2\2.jpg`
- `assets/assets\imgs\works\projects\2\3.jpg`
- `assets/assets\imgs\works\projects\2\4.jpg`
- `assets/assets\imgs\works\projects\2\5.jpg`
- `assets/assets\imgs\works\projects\2\6.jpg`
- `assets/assets\imgs\works\projects\2\7.jpg`
- `assets/assets\imgs\works\projects\2\8.jpg`
- `assets/assets\imgs\works\projects\3\1.jpg`
- `assets/assets\imgs\works\projects\3\2.jpg`
- `assets/assets\imgs\works\projects\3\3.jpg`
- `assets/assets\imgs\works\projects\3\4.jpg`
- `assets/assets\imgs\works\projects\3\5.jpg`
- `assets/assets\imgs\works\projects\3\6.jpg`
- `assets/assets\imgs\works\projects\3\7.jpg`
- `assets/assets\imgs\works\projects\4\1.jpg`
- `assets/assets\imgs\works\projects\4\2.jpg`
- `assets/assets\imgs\works\projects\4\3.jpg`
- `assets/assets\imgs\works\projects\5\1.jpg`
- `assets/assets\imgs\works\projects\5\2.jpg`
- `assets/assets\imgs\works\projects\5\3.jpg`
- `assets/assets\imgs\works\projects\5\4.jpg`
- `assets/assets\imgs\works\projects\5\5.jpg`
- `assets/assets\imgs\works\projects\5\6.jpg`
- `assets/assets\imgs\works\projects\5\v.jpg`
- `assets/assets\imgs\works\stand\1.jpg`
- `assets/assets\imgs\works\stand\2.jpg`
- `assets/assets\imgs\works\stand\3.jpg`
- `assets/assets\imgs\works\stand\4.jpg`
- `assets/assets\imgs\works\stand\5.jpg`
- `assets/assets\imgs\works\stand\6.jpg`
- `assets/assets\imgs\works\stand\7.jpg`
- `assets/assets\imgs\works\stand\8.jpg`
- `assets/assets\imgs\works\stand\9.jpg`
- `assets/docs\fonts\FontAwesome.otf`
- `assets/docs\fonts\Pe-icon-7-stroke.eot`
- `assets/docs\fonts\Pe-icon-7-stroke.ttf`
- `assets/docs\fonts\Pe-icon-7-stroke.woff`
- `assets/docs\fonts\fa-brands-400.eot`
- `assets/docs\fonts\fa-brands-400.ttf`
- `assets/docs\fonts\fa-brands-400.woff`
- `assets/docs\fonts\fa-brands-400.woff2`
- `assets/docs\fonts\fa-regular-400.eot`
- `assets/docs\fonts\fa-regular-400.ttf`
- `assets/docs\fonts\fa-regular-400.woff`
- `assets/docs\fonts\fa-regular-400.woff2`
- `assets/docs\fonts\fa-solid-900.eot`
- `assets/docs\fonts\fa-solid-900.ttf`
- `assets/docs\fonts\fa-solid-900.woff`
- `assets/docs\fonts\fa-solid-900.woff2`
- `assets/docs\fonts\fontawesome-webfont.eot`
- `assets/docs\fonts\fontawesome-webfont.ttf`
- `assets/docs\fonts\fontawesome-webfont.woff`
- `assets/docs\fonts\fontawesome-webfont.woff2`
- `assets/docs\fonts\ionicons.eot`
- `assets/docs\fonts\ionicons.ttf`
- `assets/docs\fonts\ionicons.woff`
- `assets/docs\images\1.png`
- `assets/docs\images\2.png`
- `assets/docs\images\3.png`
- `assets/docs\images\4.png`
- `assets/docs\images\5.png`
- `assets/docs\images\6.png`
- `assets/docs\images\7.png`
- `assets/docs\images\check-mark.png`
- `assets/docs\images\favicon.ico`
- `assets/docs\images\logo-light.png`
- `assets/docs\images\logo.png`
- `assets/docs\images\verified.png`

## Skipped (unrecognized types — review manually) (1)

- `(source)/contact.php`

## Reminders

- The point of lib/ is tree-shaking: put ONLY what's used there; don't carry over the purchased all-in-one bundle.
- `{% lib %}` on .scss compiles to .css; on .js emits a `.taj-bundle.js` URL; tree-shaking needs analyzable source, not a pre-minified blob.
- `{% assets %}` has NO theme inheritance; files must exist in this theme's assets/.
- When curation is done, `_review/` should be empty (or deleted) — nothing ships from it.
