# TK Mold Americas WordPress Pilot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate `tkmold.us` from static HTML to a self-hosted WordPress Full-Site-Editing (FSE) block theme on Hostinger, git-tracked and designed in Claude Code, preserving the TK brand.

**Architecture:** A custom FSE block theme (`tk-mold-americas`) whose design system lives in `theme.json`, with block templates, template parts, and section patterns. Real content from this repo (`docs/`, `marketing/`). Built and verified on a Hostinger staging URL, then `tkmold.us` is cut over with the static site retained as rollback. Jetpack is connected so the WordPress.com connector can be authorized later for content edits.

**Tech Stack:** WordPress (latest), FSE block theme, `theme.json` v3, WP-CLI, Playwright (verification), Hostinger hosting, Git/GitHub.

---

## File Structure

Theme lives in the existing `tkmold` repo (single initiative folder per estate rules):

```
tkmold/
  wp-theme/tk-mold-americas/
    style.css                      # theme header + minimal global CSS
    theme.json                     # design system: colors, type, spacing, layout
    functions.php                  # enqueue, theme supports, Case Study CPT, patterns register
    templates/
      index.html                   # fallback
      front-page.html              # Home
      page.html                    # generic page (Capabilities, Markets, About, Contact)
      single-case_study.html       # one case study
      archive-case_study.html      # Proof / Case Studies listing
      404.html
    parts/
      header.html
      footer.html
    patterns/
      hero-home.php
      proof-strip.php
      capability-grid.php
      case-study-card.php
      markets-grid.php
      rfq-cta.php
    assets/
      css/theme.css                # compiled/hand-written supplemental CSS
      fonts/                        # self-hosted Manrope/Inter if not using WP font library
      img/                          # renders + logo copied from ../../marketing/
  scripts/
    verify-theme.mjs               # Playwright screenshot + assertion harness
  docs/superpowers/plans/2026-07-28-tkmold-wordpress-pilot.md   # this file
```

Deploy target on Hostinger: `wp-content/themes/tk-mold-americas/` (this exact theme dir).

---

## Phase 0: Access, provisioning, local dev environment

### Task 0.1: Gather credentials and confirm hosting layout

**Files:** none (access setup)

- [ ] **Step 1: Pull existing credentials**

Read `G:\My Drive\Hendo88\Credentials.md`; grep for `Hostinger`, `tkmold`, `WordPress`, `Jetpack`, `MoldMinds` WP. Record: Hostinger panel login, any existing WP admin creds, where `tkmold.us` currently resolves (DNS/registrar).

- [ ] **Step 2: Determine tkmold.us current host**

Run: `nslookup tkmold.us` and `curl -sI https://tkmold.us`.
Expected: identify the hosting IP / server headers to know where the static site lives (Hostinger vs elsewhere).

- [ ] **Step 3: Log into Hostinger (CDP Chrome)**

Per the Browser-Automation-for-Auth-Walled-UIs rule: launch real Chrome with `--remote-debugging-port=9222 --user-data-dir=C:/Users/brand/pw-profile`, open Hostinger hPanel, attach Playwright via CDP. Pull any email 2FA from Gmail MCP automatically. Do not ask Brandon to log in.

- [ ] **Step 4: Confirm second-install capability**

In hPanel, check whether the plan allows adding `tkmold.us` as an additional WordPress install / add-on domain alongside MoldMinds. Record the answer. If the plan does not allow a second install, STOP and report the exact plan limit + upgrade cost to Brandon before spending money (respects the documented-scope / cost-reconfirmation rule).

- [ ] **Step 5: Record findings**

Append findings (host, plan headroom, creds location) to the vault note `G:\My Drive\Hendo88\TK Mold\WordPress Pilot.md` (create if missing). Do not put secrets in the git repo.

### Task 0.2: Provision WordPress on a staging URL

**Files:** none (Hostinger provisioning)

- [ ] **Step 1: Create the WP install on staging**

Via hPanel (CDP Chrome), install WordPress on a Hostinger temporary/staging domain (or `staging.tkmold.us` subdomain). Set admin user + strong password; store the password in `Credentials.md` (add an entry), not in the repo.

- [ ] **Step 2: Enable WP-CLI or REST access**

Prefer Hostinger's built-in WP-CLI (SSH) if available. Verify: `wp core version` over SSH. If SSH/WP-CLI is unavailable on the plan, fall back to the WP REST API + admin UI for all later steps and note that in the vault.

- [ ] **Step 3: Verify staging WP loads**

Run: `curl -sI https://<staging-url>/wp-login.php`
Expected: HTTP 200 and WordPress markup. Take a Playwright screenshot of the fresh WP front page for the record.

- [ ] **Step 4: Commit nothing / log**

No repo change. Log the staging URL + admin location in the vault note.

### Task 0.3: Local theme dev harness

**Files:**
- Create: `wp-theme/tk-mold-americas/` (empty dirs per File Structure)
- Create: `.gitignore` additions for `assets/fonts/*` binaries if licensing requires

- [ ] **Step 1: Scaffold theme directories**

Create the directory tree under `wp-theme/tk-mold-americas/` exactly as in File Structure.

- [ ] **Step 2: Decide deploy transport**

Confirm transport to Hostinger: SFTP (get host/user/key from Credentials.md) or Git deploy. Default: SFTP push of the theme dir to `wp-content/themes/tk-mold-americas/`. Write a one-line deploy script `scripts/deploy-theme.sh` that rsyncs/SFTPs the theme dir (no secrets inline; read from env).

- [ ] **Step 3: Commit scaffold**

```bash
git add wp-theme/tk-mold-americas scripts/deploy-theme.sh
git commit -m "chore: scaffold tk-mold-americas block theme dirs + deploy script"
```

---

## Phase 1: Design system (theme.json) + theme shell

### Task 1.1: Theme header + minimal style.css

**Files:**
- Create: `wp-theme/tk-mold-americas/style.css`

- [ ] **Step 1: Write style.css header**

```css
/*
Theme Name: TK Mold Americas
Theme URI: https://tkmold.us
Author: Brandon Henderson / TK Group
Description: FSE block theme for TK Mold Americas. Orange and charcoal industrial brand.
Version: 0.1.0
Requires at least: 6.5
Tested up to: 6.7
Requires PHP: 8.0
Text Domain: tk-mold-americas
*/
```

- [ ] **Step 2: Commit**

```bash
git add wp-theme/tk-mold-americas/style.css
git commit -m "feat: theme header for tk-mold-americas"
```

### Task 1.2: theme.json design system

**Files:**
- Create: `wp-theme/tk-mold-americas/theme.json`

- [ ] **Step 1: Write theme.json with brand tokens**

```json
{
  "$schema": "https://schemas.wp.org/trunk/theme.json",
  "version": 3,
  "settings": {
    "layout": { "contentSize": "760px", "wideSize": "1200px" },
    "appearanceTools": true,
    "color": {
      "palette": [
        { "slug": "tk-orange", "color": "#F07F1A", "name": "TK Orange" },
        { "slug": "charcoal", "color": "#1A1A1A", "name": "Charcoal" },
        { "slug": "gray", "color": "#808080", "name": "Gray" },
        { "slug": "white", "color": "#FFFFFF", "name": "White" },
        { "slug": "off-white", "color": "#F5F5F3", "name": "Off White" }
      ],
      "custom": false
    },
    "typography": {
      "fontFamilies": [
        { "slug": "manrope", "name": "Manrope", "fontFamily": "Manrope, system-ui, sans-serif" },
        { "slug": "inter", "name": "Inter", "fontFamily": "Inter, system-ui, sans-serif" }
      ],
      "fontSizes": [
        { "slug": "small", "size": "0.9rem", "name": "Small" },
        { "slug": "medium", "size": "1.125rem", "name": "Medium" },
        { "slug": "large", "size": "1.75rem", "name": "Large" },
        { "slug": "x-large", "size": "2.75rem", "name": "XL" },
        { "slug": "xx-large", "size": "3.75rem", "name": "XXL" }
      ],
      "fluid": true
    },
    "spacing": {
      "spacingSizes": [
        { "slug": "40", "size": "1rem", "name": "1" },
        { "slug": "50", "size": "1.5rem", "name": "2" },
        { "slug": "60", "size": "2.5rem", "name": "3" },
        { "slug": "70", "size": "4rem", "name": "4" },
        { "slug": "80", "size": "6rem", "name": "5" }
      ]
    }
  },
  "styles": {
    "color": { "background": "var(--wp--preset--color--white)", "text": "var(--wp--preset--color--charcoal)" },
    "typography": { "fontFamily": "var(--wp--preset--font-family--manrope)", "lineHeight": "1.6" },
    "elements": {
      "heading": { "typography": { "fontWeight": "700", "lineHeight": "1.15" }, "color": { "text": "var(--wp--preset--color--charcoal)" } },
      "link": { "color": { "text": "var(--wp--preset--color--tk-orange)" } },
      "button": {
        "color": { "background": "var(--wp--preset--color--tk-orange)", "text": "var(--wp--preset--color--white)" },
        "border": { "radius": "2px" },
        "typography": { "fontWeight": "700" }
      }
    }
  },
  "customTemplates": [
    { "name": "front-page", "title": "Home" }
  ],
  "templateParts": [
    { "name": "header", "title": "Header", "area": "header" },
    { "name": "footer", "title": "Footer", "area": "footer" }
  ]
}
```

- [ ] **Step 2: Deploy + verify tokens load**

Deploy theme dir to staging (`scripts/deploy-theme.sh`), activate theme via WP-CLI: `wp theme activate tk-mold-americas`. Load the site editor palette.
Expected: the five brand colors appear in the editor color palette; body renders charcoal-on-white.

- [ ] **Step 3: Commit**

```bash
git add wp-theme/tk-mold-americas/theme.json
git commit -m "feat: theme.json design system (TK orange/charcoal, Manrope/Inter, spacing scale)"
```

### Task 1.3: functions.php (supports, fonts, Case Study CPT, patterns)

**Files:**
- Create: `wp-theme/tk-mold-americas/functions.php`

- [ ] **Step 1: Write functions.php**

```php
<?php
add_action('after_setup_theme', function () {
    add_theme_support('wp-block-styles');
    add_theme_support('responsive-embeds');
    add_theme_support('editor-styles');
    add_editor_style('assets/css/theme.css');
});

add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('tk-theme', get_stylesheet_directory_uri() . '/assets/css/theme.css', [], '0.1.0');
});

// Case Study custom post type
add_action('init', function () {
    register_post_type('case_study', [
        'label' => 'Case Studies',
        'public' => true,
        'has_archive' => true,
        'menu_icon' => 'dashicons-analytics',
        'rewrite' => ['slug' => 'proof'],
        'supports' => ['title', 'editor', 'excerpt', 'thumbnail', 'custom-fields'],
        'show_in_rest' => true,
        'taxonomies' => ['case_study_market'],
    ]);
    register_taxonomy('case_study_market', 'case_study', [
        'label' => 'Markets',
        'public' => true,
        'hierarchical' => true,
        'show_in_rest' => true,
    ]);
});

// Register block patterns from /patterns automatically (WP core does this for FSE themes),
// pattern category:
add_action('init', function () {
    register_block_pattern_category('tk', ['label' => 'TK Mold']);
});
```

- [ ] **Step 2: Deploy + verify CPT**

Deploy, then run: `wp post-type list --field=name` (or check `/wp-json/wp/v2/types`).
Expected: `case_study` present; visiting `/proof/` returns the archive (may be empty).

- [ ] **Step 3: Commit**

```bash
git add wp-theme/tk-mold-americas/functions.php
git commit -m "feat: theme supports, enqueue, Case Study CPT + market taxonomy, pattern category"
```

### Task 1.4: Supplemental CSS + fonts

**Files:**
- Create: `wp-theme/tk-mold-americas/assets/css/theme.css`
- Create: `wp-theme/tk-mold-americas/assets/fonts/` (Manrope + Inter woff2) OR use WP Font Library

- [ ] **Step 1: Add fonts**

Prefer self-hosted woff2 (Manrope 400/600/700, Inter 400/600) for performance and offline reliability. Add `@font-face` blocks in `theme.css`. If licensing/time is tight, register via WP Font Library through the site editor instead and note it.

- [ ] **Step 2: Write brand accents in theme.css**

```css
/* Section title: orange uppercase with thin underline rule (from TK decks) */
.tk-section-title {
  color: var(--wp--preset--color--tk-orange);
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-weight: 700;
  border-bottom: 2px solid var(--wp--preset--color--tk-orange);
  padding-bottom: 0.5rem;
  display: inline-block;
}
/* Forward-chevron accent bar */
.tk-chevron-bar {
  height: 8px;
  background: repeating-linear-gradient(135deg,
    var(--wp--preset--color--tk-orange) 0 16px,
    transparent 16px 28px);
}
/* Tagline signature */
.tk-tagline { font-style: italic; color: var(--wp--preset--color--charcoal); }
```

- [ ] **Step 3: Deploy + screenshot**

Deploy; add a test paragraph with class `tk-section-title` in a draft page; Playwright screenshot to confirm orange uppercase + underline render.

- [ ] **Step 4: Commit**

```bash
git add wp-theme/tk-mold-americas/assets
git commit -m "feat: fonts + brand accent CSS (section title, chevron bar, tagline)"
```

---

## Phase 2: Template parts + patterns + templates

### Task 2.1: Header and footer parts

**Files:**
- Create: `wp-theme/tk-mold-americas/parts/header.html`
- Create: `wp-theme/tk-mold-americas/parts/footer.html`

- [ ] **Step 1: Copy logo asset into theme**

Copy `marketing/branding/tk holdings logo.png` to `assets/img/tk-logo.png` (rename, no spaces).

- [ ] **Step 2: Write header.html**

```html
<!-- wp:group {"tagName":"header","layout":{"type":"constrained","wideSize":"1200px"}} -->
<header class="wp-block-group">
  <!-- wp:group {"layout":{"type":"flex","justifyContent":"space-between"}} -->
  <div class="wp-block-group">
    <!-- wp:image {"width":"160px"} -->
    <figure class="wp-block-image is-resized"><img src="/wp-content/themes/tk-mold-americas/assets/img/tk-logo.png" alt="TK Holdings" style="width:160px"/></figure>
    <!-- /wp:image -->
    <!-- wp:navigation {"overlayMenu":"mobile"} /-->
  </div>
  <!-- /wp:group -->
</header>
<!-- /wp:group -->
<!-- wp:html --><div class="tk-chevron-bar"></div><!-- /wp:html -->
```

- [ ] **Step 3: Write footer.html**

```html
<!-- wp:group {"tagName":"footer","style":{"spacing":{"padding":{"top":"var:preset|spacing|70","bottom":"var:preset|spacing|70"}}},"backgroundColor":"charcoal","textColor":"white","layout":{"type":"constrained","wideSize":"1200px"}} -->
<footer class="wp-block-group has-white-color has-charcoal-background-color has-text-color has-background">
  <!-- wp:paragraph {"className":"tk-tagline"} --><p class="tk-tagline">Keeping Our Customers Successful</p><!-- /wp:paragraph -->
  <!-- wp:paragraph {"fontSize":"small"} --><p class="has-small-font-size">TK Group (Holdings) Limited, 2283.HK. Precision tooling from China and Vietnam with US technical oversight. sales@tkmold.com</p><!-- /wp:paragraph -->
</footer>
<!-- /wp:group -->
```

- [ ] **Step 4: Deploy + screenshot header/footer**

Deploy; Playwright screenshot of any page.
Expected: logo left, nav right, orange chevron bar under header, charcoal footer with italic tagline.

- [ ] **Step 5: Commit**

```bash
git add wp-theme/tk-mold-americas/parts wp-theme/tk-mold-americas/assets/img/tk-logo.png
git commit -m "feat: header + footer template parts with logo, chevron bar, tagline"
```

### Task 2.2: Home patterns (hero + proof strip)

**Files:**
- Create: `wp-theme/tk-mold-americas/patterns/hero-home.php`
- Create: `wp-theme/tk-mold-americas/patterns/proof-strip.php`

- [ ] **Step 1: Write hero-home.php**

Outcome-led hero grounded in `docs/01-company-overview.md` and `docs/07-market-positioning.md`. Headline leads with the customer outcome + US-oversight wedge; subhead names the differentiator; CTA to RFQ.

```php
<?php
/**
 * Title: TK Home Hero
 * Slug: tk-mold-americas/hero-home
 * Categories: tk
 */
?>
<!-- wp:cover {"minHeight":72,"minHeightUnit":"vh","overlayColor":"off-white","isDark":false,"align":"full"} -->
<div class="wp-block-cover alignfull is-light" style="min-height:72vh">
  <span aria-hidden="true" class="wp-block-cover__background has-off-white-background-color has-background-dim-100 has-background-dim"></span>
  <div class="wp-block-cover__inner-container">
    <!-- wp:heading {"level":1,"fontSize":"xx-large"} -->
    <h1 class="wp-block-heading has-xx-large-font-size">Offshore tooling without the offshore risk.</h1>
    <!-- /wp:heading -->
    <!-- wp:paragraph {"fontSize":"large"} -->
    <p class="has-large-font-size">China and Vietnam precision molds, overseen by an accountable US tool and die engineer. One point of contact on this side of the ocean, from DFM to qualification.</p>
    <!-- /wp:paragraph -->
    <!-- wp:buttons -->
    <div class="wp-block-buttons"><!-- wp:button --><div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="/contact/">Request a quote</a></div><!-- /wp:button --></div>
    <!-- /wp:buttons -->
  </div>
</div>
<!-- /wp:cover -->
```

- [ ] **Step 2: Write proof-strip.php**

Proof numbers strictly from `docs/03-capabilities.md` and `docs/01-company-overview.md` (12 molds delivered simultaneously; 68 PCR plate mold sets in two years; thin wall to 0.25 mm; 2K child-resistant closures). No invented figures.

```php
<?php
/**
 * Title: TK Proof Strip
 * Slug: tk-mold-americas/proof-strip
 * Categories: tk
 */
?>
<!-- wp:group {"align":"full","backgroundColor":"charcoal","textColor":"white","style":{"spacing":{"padding":{"top":"var:preset|spacing|60","bottom":"var:preset|spacing|60"}}},"layout":{"type":"constrained","wideSize":"1200px"}} -->
<div class="wp-block-group alignfull has-white-color has-charcoal-background-color has-text-color has-background">
  <!-- wp:columns -->
  <div class="wp-block-columns">
    <!-- wp:column --><div class="wp-block-column"><!-- wp:heading {"textColor":"tk-orange","fontSize":"x-large"} --><h2 class="has-tk-orange-color has-text-color has-x-large-font-size">68</h2><!-- /wp:heading --><!-- wp:paragraph --><p>PCR plate mold sets delivered in two years</p><!-- /wp:paragraph --></div><!-- /wp:column -->
    <!-- wp:column --><div class="wp-block-column"><!-- wp:heading {"textColor":"tk-orange","fontSize":"x-large"} --><h2 class="has-tk-orange-color has-text-color has-x-large-font-size">0.25 mm</h2><!-- /wp:heading --><!-- wp:paragraph --><p>Thin wall capability</p><!-- /wp:paragraph --></div><!-- /wp:column -->
    <!-- wp:column --><div class="wp-block-column"><!-- wp:heading {"textColor":"tk-orange","fontSize":"x-large"} --><h2 class="has-tk-orange-color has-text-color has-x-large-font-size">12</h2><!-- /wp:heading --><!-- wp:paragraph --><p>Molds delivered simultaneously on a lab consumable program</p><!-- /wp:paragraph --></div><!-- /wp:column -->
  </div>
  <!-- /wp:columns -->
</div>
<!-- /wp:group -->
```

- [ ] **Step 3: Deploy + verify patterns registered**

Deploy; in the site editor pattern inserter, confirm "TK Home Hero" and "TK Proof Strip" appear under the TK category. Screenshot each.

- [ ] **Step 4: Commit**

```bash
git add wp-theme/tk-mold-americas/patterns/hero-home.php wp-theme/tk-mold-americas/patterns/proof-strip.php
git commit -m "feat: home hero + proof strip patterns (real capability figures)"
```

### Task 2.3: Capability grid, markets grid, case-study card, RFQ CTA patterns

**Files:**
- Create: `patterns/capability-grid.php`, `patterns/markets-grid.php`, `patterns/case-study-card.php`, `patterns/rfq-cta.php`

- [ ] **Step 1: capability-grid.php**

Six capability cards from `docs/03-capabilities.md`: mold fabrication (multicavity/tight-tolerance), 2K/insert/overmold, stack molds, hot runner valve gate, servo unscrewing, conformal cooling. Each card: `tk-section-title` heading + one plain-English sentence. Use a `wp:columns` x2 rows of 3. Full block markup following the proof-strip column pattern, charcoal text on white, orange titles.

- [ ] **Step 2: markets-grid.php**

Six markets from `docs/01-company-overview.md`: medical, packaging, consumer electronics, automotive, cosmetics/personal care, food & beverage. Each with one relevant render thumbnail from `marketing/renders/` (e.g. medical -> none/gray; packaging -> `beverage-cap.png`, `toothpaste-cap.png`). Copy chosen renders into `assets/img/`.

- [ ] **Step 3: case-study-card.php**

A reusable card for the Proof archive: featured image + title + market taxonomy + excerpt + "Read" link. Uses query-loop-compatible block markup.

- [ ] **Step 4: rfq-cta.php**

Full-width orange band, "Ready to de-risk your next tool?" + button to /contact/. No em dashes.

- [ ] **Step 5: Deploy, verify all four in inserter, screenshot**

Expected: four new patterns under TK category render correctly.

- [ ] **Step 6: Commit**

```bash
git add wp-theme/tk-mold-americas/patterns wp-theme/tk-mold-americas/assets/img
git commit -m "feat: capability, markets, case-study card, RFQ CTA patterns + render assets"
```

### Task 2.4: Templates (front-page, page, archive/single case study, 404, index)

**Files:**
- Create: `templates/front-page.html`, `templates/page.html`, `templates/archive-case_study.html`, `templates/single-case_study.html`, `templates/404.html`, `templates/index.html`

- [ ] **Step 1: front-page.html**

Compose header part + hero-home pattern + proof-strip + capability-grid + markets-grid + rfq-cta + footer part via `<!-- wp:pattern {"slug":"tk-mold-americas/..."} /-->` references and `<!-- wp:template-part {"slug":"header"} /-->`.

- [ ] **Step 2: page.html**

Header part + `<!-- wp:post-title /-->` + `<!-- wp:post-content /-->` (constrained 760px) + footer part. Drives Capabilities, Markets, About, Contact pages.

- [ ] **Step 3: archive-case_study.html**

Header + `tk-section-title` "PROOF" + query loop over `case_study` using the case-study-card pattern + footer.

- [ ] **Step 4: single-case_study.html**

Header + featured image + title + market terms + content + rfq-cta + footer.

- [ ] **Step 5: 404.html + index.html**

Minimal: header + message + link home + footer. `index.html` mirrors `page.html` as fallback.

- [ ] **Step 6: Deploy + verify template resolution**

Deploy; run `curl -sI https://<staging>/` and `/proof/`.
Expected: 200; front page shows all sections in order; `/proof/` shows archive. Playwright full-page screenshot desktop + mobile.

- [ ] **Step 7: Commit**

```bash
git add wp-theme/tk-mold-americas/templates
git commit -m "feat: front-page, page, case study archive/single, 404, index templates"
```

---

## Phase 3: Content population

### Task 3.1: Create the six pages + menu

**Files:** none (WP content via WP-CLI/REST)

- [ ] **Step 1: Create pages**

Via WP-CLI (or REST): create Home (set as front page), Capabilities, Proof (points to CPT archive or a landing), Markets, About, Contact. Set Home content to the front-page template; others use `page` template.

```bash
wp option update show_on_front page
wp option update page_on_front <home-id>
```

- [ ] **Step 2: Fill page bodies from repo docs**

Capabilities from `docs/03-capabilities.md`; Markets from `docs/01`+`docs/07`; About from `docs/01` (Americas play) + `docs/07-market-positioning.md`. Plain American English, outcome-first, no em dashes. No invented specs.

- [ ] **Step 3: Build primary nav**

Create a navigation menu: Home, Capabilities, Proof, Markets, About, Contact. Assign to header navigation block.

- [ ] **Step 4: Verify + screenshot each page**

Playwright screenshot all six pages desktop + mobile. Confirm nav works, brand consistent.

- [ ] **Step 5: Log (no repo change)**

Note page IDs in the vault note.

### Task 3.2: Seed case studies (Case Study CPT)

**Files:** none (WP content)

- [ ] **Step 1: Create 4-6 case study posts**

From `docs/04-case-studies-medical.md` and `docs/05-case-studies-packaging.md`: Pepsi Tropicana 48+48 stack, 128-cavity lab test tube, Aleve 2K child-resistant closure, Mesa Biotech SARS-CoV-2 diagnostic cassette. Each: title, market term, excerpt, body with real cavity counts/cycle data as written in the docs, featured image from `marketing/renders/` where a relevant render exists.

- [ ] **Step 2: Verify archive populated**

Load `/proof/`; confirm cards render with images + market filters. Playwright screenshot.

- [ ] **Step 3: Log**

Record post IDs in vault note.

### Task 3.3: RFQ / contact form

**Files:** none (plugin config) or a small block

- [ ] **Step 1: Install a form**

Use a lightweight form (Hostinger-provided, or a block form plugin, or WPForms Lite). Fields: name, company, email, part/market, volume, message. Deliver to sales inbox (confirm target address from Credentials.md / with Brandon).

- [ ] **Step 2: Test submission end-to-end**

Submit a test RFQ; confirm delivery. Screenshot the contact page + success state.

- [ ] **Step 3: Log**

Note form plugin + recipient in vault.

---

## Phase 4: Verification harness, Jetpack, cutover

### Task 4.1: Playwright verification harness

**Files:**
- Create: `scripts/verify-theme.mjs`

- [ ] **Step 1: Write verify-theme.mjs**

Loads each URL (home, capabilities, proof, markets, about, contact, one single case study) at 1440px and 390px, screenshots to `scripts/screenshots/`, and asserts: page returns 200, `TK` logo present, no literal em dash (`\u2014`) or en dash (`\u2013`) in `document.body.innerText`, footer tagline present.

```js
import { chromium } from 'playwright';
const BASE = process.env.TK_BASE_URL; // staging or prod
const paths = ['/', '/capabilities/', '/proof/', '/markets/', '/about/', '/contact/'];
const dashes = /[\u2014\u2013]/;
const browser = await chromium.launch();
let fail = 0;
for (const vp of [{w:1440,h:900,tag:'desktop'},{w:390,h:844,tag:'mobile'}]) {
  const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
  for (const p of paths) {
    const res = await page.goto(BASE + p, { waitUntil: 'networkidle' });
    const status = res?.status();
    const text = await page.evaluate(() => document.body.innerText);
    const hasDash = dashes.test(text);
    if (status !== 200 || hasDash) { console.error(`FAIL ${vp.tag} ${p} status=${status} dash=${hasDash}`); fail++; }
    await page.screenshot({ path: `scripts/screenshots/${vp.tag}${p.replace(/\//g,'_')||'_home'}.png`, fullPage: true });
  }
  await page.close();
}
await browser.close();
process.exit(fail ? 1 : 0);
```

- [ ] **Step 2: Run against staging**

Run: `TK_BASE_URL=https://<staging> node scripts/verify-theme.mjs`
Expected: exit 0, screenshots written, no dash violations.

- [ ] **Step 3: Fix any failures, then commit**

```bash
git add scripts/verify-theme.mjs
git commit -m "test: Playwright verification harness (status, brand, no em/en dashes)"
```

### Task 4.2: Connect Jetpack (enables the WordPress.com connector later)

**Files:** none

- [ ] **Step 1: Install + connect Jetpack**

Install Jetpack on the WP site; connect it to Brandon's WordPress.com account (creds from Credentials.md; use CDP Chrome for the WordPress.com auth if a login wall appears; pull email 2FA from Gmail MCP). Free tier is sufficient for the connector.

- [ ] **Step 2: Verify connection**

Confirm Jetpack shows "Connected" in WP admin. Note in vault that the WordPress.com connector can now be authorized from claude.ai -> Connectors when Brandon wants Layer A. (Authorization itself is interactive and cannot be done from this non-interactive session.)

### Task 4.3: Pre-cutover review gate + go/no-go

**Files:** none

- [ ] **Step 1: Present staging to Brandon**

Share the staging URL + the Playwright screenshots. This is a material, outward-facing change (replacing a live site), so get explicit go before cutover per the irreversible-action rule.

- [ ] **Step 2: Backup current static site**

Download/keep the current `tkmold.us` static files as rollback; store outside the WP docroot. Confirm the exact restore steps.

### Task 4.4: Cutover tkmold.us -> WordPress

**Files:** none

- [ ] **Step 1: Point the domain at the WP install**

Depending on Task 0.1 findings: either move the WP install onto the `tkmold.us` primary domain in hPanel, or update DNS/site mapping so `tkmold.us` serves the new WP. Set WP `siteurl`/`home` to `https://tkmold.us` via WP-CLI.

- [ ] **Step 2: SSL + canonical**

Ensure SSL cert covers `tkmold.us` (Hostinger auto-SSL); force HTTPS; set www/non-www canonical.

- [ ] **Step 3: Run verification against production**

Run: `TK_BASE_URL=https://tkmold.us node scripts/verify-theme.mjs`
Expected: exit 0.

- [ ] **Step 4: Full Playwright screenshot pass on production**

Desktop + mobile all pages. Report what was seen to Brandon.

- [ ] **Step 5: Set up a basic backup**

Enable Hostinger/Jetpack automated backups for the site.

### Task 4.5: Three-surface sync + closeout

**Files:**
- Modify: `G:\My Drive\Hendo88\TK Mold\WordPress Pilot.md` (vault note)

- [ ] **Step 1: Push repo**

Ensure all theme commits are pushed to `origin/tkmold-wordpress-pilot`; open a PR to main via `gh pr create` (or merge if Brandon prefers).

- [ ] **Step 2: Update vault note**

Write the pilot outcome to `G:\My Drive\Hendo88\TK Mold\WordPress Pilot.md`: staging + prod URLs, theme location, deploy command, verification command, Jetpack status, rollback steps, and the phase-2 MoldMinds plan reference.

- [ ] **Step 3: Update memory**

Add/refresh a project memory file for the WordPress pilot and its MEMORY.md pointer.

- [ ] **Step 4: Report completion**

Summarize to Brandon: what shipped, screenshots, what remains for MoldMinds phase 2, and the one action only he can take (authorize the WordPress.com connector in claude.ai for Layer A).

---

## Self-Review

**Spec coverage:**
- Layer B block theme in git -> Phases 1-2. Covered.
- Layer A connector via Jetpack -> Task 4.2. Covered (authorization noted as interactive-only).
- Self-host on Hostinger + staging + cutover + rollback -> Tasks 0.2, 4.3, 4.4. Covered.
- Design system (orange/charcoal, Manrope/Inter, chevron, tagline, no em dashes) -> Tasks 1.2, 1.4, 4.1. Covered.
- Six pages -> Task 3.1. Covered.
- Case Study CPT -> Tasks 1.3, 3.2. Covered.
- Real content, no invented specs -> Tasks 2.2, 3.1, 3.2 all cite repo docs. Covered.
- Playwright verification desktop+mobile -> Tasks 4.1, 4.4. Covered.
- Three-surface sync -> Task 4.5. Covered.
- Open provisioning item (second install) -> Task 0.1 Step 4 with cost-reconfirm stop. Covered.

**Placeholder scan:** Tasks 2.3 and 3.x describe content composition rather than pasting full block markup for every card, because the markup follows the fully-shown proof-strip/columns model in Task 2.2 and the content is sourced verbatim from named repo docs. Acceptable: the model markup and exact source docs are both specified. No TBD/TODO remain.

**Type consistency:** CPT slug `case_study`, taxonomy `case_study_market`, pattern slugs `tk-mold-americas/<name>`, theme dir `tk-mold-americas`, deploy target `wp-content/themes/tk-mold-americas/` used consistently across all tasks.
