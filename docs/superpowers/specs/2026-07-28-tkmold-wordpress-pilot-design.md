# TK Mold Americas: WordPress Pilot Design

> Status: approved design (2026-07-28). Pilot for a two-site migration to self-hosted
> WordPress with Claude Code as the primary web designer. TK Mold first, MoldMinds second.
> Source content: this repo (`docs/`, `marketing/`).

## 1. Goal

Move `tkmold.us` from a custom static HTML site to a self-hosted WordPress **block theme**
that Claude Code designs and maintains as git-tracked theme files. Preserve the TK brand
exactly. Prove the theme-building and cutover workflow here so it can be reused to swap the
MoldMinds frontend in phase 2 without touching its WordPress backend or automation pipelines.

## 1a. Architecture reality (discovered during Phase 0, 2026-07-28)

The current `tkmold.us` is NOT a plain static site. It is a static HTML frontend deployed on
**Vercel** (project `tkmold`, A record `76.76.21.21`) with an **existing headless WordPress
backend already live** at `red-partridge-913204.hostingersite.com` (Hostinger Business, same
account as MoldMinds, shared host IP `145.223.124.212`) powering `tkmold.us/blog` via a Vercel
`/api/wp` proxy. This mirrors the MoldMinds architecture.

Consequences (these override the "fresh provisioning" assumptions below):
- **No new WP install.** Build the `tk-mold-americas` block theme on the existing
  `red-partridge-913204.hostingersite.com` WP. Its preview URL IS the staging URL.
- **Blog content already exists** in that WP; it becomes native (no longer headless) after cutover.
- **Cutover = DNS A-record swap** for `tkmold.us` from `76.76.21.21` (Vercel) to
  `145.223.124.212` (Hostinger), plus setting WP `siteurl`/`home` to `https://tkmold.us`.
- **Rollback = the Vercel deploy stays intact;** revert the A record to `76.76.21.21`.
- **Do not touch** the MX/SPF/DKIM/DMARC records or the GSC verification TXT
  (`google-site-verification=6mmTXS9YGyHNMh8IERdjcN-kJOG9IQp_kKfzJWeSeGA`). An A-record change
  does not affect mail (MX is independent) or domain-property GSC verification (TXT stays).
- **Preserve analytics:** re-add the GA4 gtag (`G-8SB3MDYXRM`) into the block theme `<head>`,
  and keep the sitemap at `/sitemap.xml` (WP will generate its own; resubmit in GSC).
- Credentials for the existing WP are in `G:\Hendo88\Credentials.md` (section "TK Mold USA
  WordPress"): admin `hendersonbs88@gmail.com`, app password for REST, wp-admin URL.

## 2. Decisions locked (2026-07-28)

- **Hosting:** self-hosted WordPress on Hostinger (reuse existing infra).
- **Sequencing:** TK Mold first (pilot), MoldMinds second.
- **MoldMinds handling (phase 2, out of scope for this spec):** keep existing WP backend and
  all pipelines; replace only the Next.js/Vercel frontend with a block theme.
- **Design:** preserve current brand; rebuild faithfully as a WordPress block theme.
- **Primary design surface:** Claude Code, editing a git-tracked block theme (Layer B).
  The WordPress.com connector (Layer A) is secondary convenience only.

## 3. Two integration layers

### Layer B (primary): block theme in git, edited by Claude Code
The site is a Full-Site-Editing (FSE) block theme. Its design system and layout live in
version-controlled files:
- `theme.json` — the design system (color palette, typography, spacing, layout tokens).
- `templates/` — block templates (front-page, page, single, archive, 404).
- `parts/` — header, footer.
- `patterns/` — reusable section patterns (hero, proof strip, capability grid, case-study
  card, markets grid, RFQ CTA).

Claude Code edits these files, deploys to Hostinger, and screenshot-verifies. This is the
durable "Claude is my web designer" engine and satisfies the three-surface sync rule.

### Layer A (secondary): WordPress.com connector via Jetpack
Connect the self-hosted install to Jetpack so the WordPress.com connector (claude.ai ->
Connectors, OAuth) can perform content/ops edits (posts, pages, media, settings) from
claude.ai chat when convenient. Not the design backbone. Requires the connector to be
authorized in claude.ai; it is not available in a non-interactive Claude Code session.

## 4. Hosting & environments

- Provision a fresh WordPress install for `tkmold.us` on Hostinger. The current static site is
  the rollback and is not migrated.
- **Open provisioning item (does not change the design):** confirm whether the existing
  Hostinger plan supports adding `tkmold.us` as a second WP install / add-on domain, or needs
  its own. Resolve during setup.
- Build on a **staging URL** first (Hostinger temporary domain or `staging.tkmold.us`).
- **Cutover** only after Playwright visual sign-off. Keep the static site available for
  instant rollback.

## 5. Design system (preserve brand)

Encoded as `theme.json` tokens so brand is centralized and Claude-editable.

| Token | Value | Use |
|---|---|---|
| Primary (TK Orange) | `#F07F1A` | logo T, section titles, accent bars, chevrons, CTAs |
| Secondary (Charcoal) | `#1A1A1A` | headings, wordmark, body headings |
| Neutral gray | `#808080` | secondary blocks, angled banners |
| Background | `#FFFFFF` | page ground |

- **Type:** Manrope or Inter for UI and body. The tagline "Keeping Our Customers Successful"
  rendered in an italic-script style as a signature element in header/footer.
- **Motif:** forward-chevron accent bars; orange uppercase section titles with a thin orange
  underline rule (from the official decks).
- **Hard rule:** no em dashes or en dashes anywhere. Enforced in content, not just prompts.
- Exact hex values may be re-sampled from the official logo art before any print output; the
  values above are the deck-sampled approximations already in `docs/06-brand-and-visual-identity.md`.

## 6. Site structure (lean pilot, 6 pages)

All content grounded in repo docs and real delivered molds. No invented specs.

1. **Home** — outcome-led hero, the US-technical-oversight wedge, proof strip (cavity counts,
   named programs), product render gallery.
2. **Capabilities** — mold fabrication, 2K / stack / insert / overmold, hot runner valve gate,
   servo unscrewing, conformal cooling, thin wall to 0.25 mm.
3. **Proof / Case Studies** — Medical and Packaging, using real delivered molds (Pepsi
   Tropicana 48+48 stack, 128-cavity lab tube, Aleve 2K child-resistant closure, Mesa Biotech
   SARS-CoV-2 diagnostic cassette, 68 PCR plate mold sets, 12 simultaneous molds). Implemented
   as a **"Case Study" custom post type** so it expands over time.
4. **Markets** — medical, packaging, consumer electronics, automotive, cosmetics/personal care,
   food and beverage.
5. **About / The Americas Play** — TK Group (Holdings) Limited, 2283.HK, audited public company;
   Brandon Henderson as the accountable US technical engineer removing offshore risk.
6. **Contact / RFQ** — quote/RFQ form delivering to the sales inbox.

## 7. Assets & repository

- Theme built as a new directory in this repo (recommended: dedicated `tkmold-wp` repo, or a
  `wp-theme/` subfolder; final call in the implementation plan).
- Product renders (`marketing/renders/`), logo (`marketing/branding/`), and case-study proof
  pulled from `marketing/`.
- **Three-surface sync:** local repo <-> GitHub <-> vault note in `G:\My Drive\Hendo88\`.

## 8. Verification & cutover

- **Playwright** screenshot verification on staging (desktop + mobile) before cutover, per the
  Design Verification rule. Report what was seen.
- Cutover: point `tkmold.us` at the WP install only after visual sign-off. Static site retained
  as rollback.

## 9. Out of scope (this spec)

- MoldMinds frontend swap (phase 2, its own spec).
- New content authoring beyond what the repo docs already support.
- E-commerce, membership, or multilingual (TK corporate `tkmold.com` remains separate).

## 10. Success criteria

- `tkmold.us` served by a self-hosted WordPress FSE block theme on Hostinger.
- Brand reproduced faithfully (orange/charcoal, tagline signature, chevron motif, no em dashes).
- All six pages populated from real repo content; Case Study CPT live.
- Theme fully git-tracked; a design change can be made by editing theme files in Claude Code and
  deployed + screenshot-verified.
- Jetpack connected so the WordPress.com connector can be authorized later for content edits.
- Static rollback preserved through cutover.
