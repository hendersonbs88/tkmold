# TK Mold: Americas Initiative Knowledge Base

Consolidated knowledge base, use cases, and marketing assets for **TK Group (Holdings) Limited** (2283.HK / 東江控股 / www.tkmold.com) and its North and South America business development effort, led by Brandon Henderson, Technical Sales Support Manager for the Americas.

This repo gathers everything in one spot: structured markdown knowledge for AI and content work, plus the raw collateral (decks, case studies, product renders, logos, trial videos, templates).

## Quick Start

- **Read the company in 5 minutes:** [docs/01-company-overview.md](docs/01-company-overview.md)
- **Who to sell to:** [docs/02-ideal-customer-profile.md](docs/02-ideal-customer-profile.md)
- **What TK can build:** [docs/03-capabilities.md](docs/03-capabilities.md)
- **Proof (88 delivered molds):** [docs/04-case-studies-medical.md](docs/04-case-studies-medical.md) and [docs/05-case-studies-packaging.md](docs/05-case-studies-packaging.md)
- **Brand and colors:** [docs/06-brand-and-visual-identity.md](docs/06-brand-and-visual-identity.md)
- **Why TK wins in the Americas:** [docs/07-market-positioning.md](docs/07-market-positioning.md)
- **Systems and automation:** [docs/08-automation-and-initiatives.md](docs/08-automation-and-initiatives.md)
- **Trial video library:** [docs/09-video-catalog.md](docs/09-video-catalog.md)
- **Everything, indexed:** [docs/10-asset-manifest.md](docs/10-asset-manifest.md)

## Repo Layout

```
tkmold/
  README.md                  this file
  docs/                      synthesized markdown knowledge (the core deliverable)
  marketing/
    branding/                TK logo, scripts reference
    presentations/           full TK deck library + case PDFs
    renders/                 17 product render PNGs (English named)
    linkedin-assets/         3 LinkedIn cover options
    x-automation/            5 X autoposter workflow JSONs
    proposals/               TK partnership restructure proposal
    business-plan/           US business plan, partnership doc
    templates/               outreach email + tradeshow templates
    videos/                  28 mold trial videos (1.8 GB, NOT in git, see below)
  claude-design/             curated guide for building a claude.ai project
```

## About the videos (important)

The 28 mold trial videos total about 1.8 GB and several individual files exceed GitHub's 100 MB per file limit. They are:
- Physically gathered in `marketing/videos/` in this local folder (your "one spot")
- Cataloged in [docs/09-video-catalog.md](docs/09-video-catalog.md)
- Kept on Google Drive at `TK Mold/Case Sharing Potential Customers/Mold trial video-Packaging/`
- **Excluded from git** via `.gitignore` so the push does not fail

To get the videos into the repo, pick one (ask Brandon's call):
1. **Git LFS** for video files (note: free GitHub LFS is 1 GB storage and 1 GB/month bandwidth, so 1.8 GB will need a paid data pack).
2. **Host on YouTube unlisted** and link from the catalog (best for sharing and for embedding in outreach).
3. **Keep on Drive** and link from the catalog (zero cost, current default).

## Source of truth

Markdown in `docs/` was synthesized from the official TK decks (Medical Tooling Case, Packaging Tooling Case, TK Precision Mold Presentation 2025), the internal TK Mold brief, and the US business plan. All case studies are delivered tooling, transcribed from the decks. No em dashes are used anywhere, per brand and house style.
