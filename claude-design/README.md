# claude.ai Design Folder Guide: TK Mold

This folder explains how to stand up a **claude.ai Project** for TK Mold design and content work, and exactly which files from this repo to upload as project knowledge.

## Why a claude.ai Project

A claude.ai Project gives Claude persistent knowledge of TK's brand, capabilities, and proof points so every deck, one pager, ad, post, or email it generates is on brand and factually grounded in real delivered tooling.

## Step 1: Create the Project

1. Go to claude.ai, create a new Project named **"TK Mold Americas"**.
2. Paste the custom instructions below into the Project's instructions field.

## Step 2: Custom Instructions (paste into the Project)

```
You are the design and content engine for TK Group (Holdings) Limited (TK Holdings,
2283.HK, www.tkmold.com), supporting its North and South America business, led by
Brandon Henderson, Technical Sales Support Manager for the Americas.

Brand:
- Tagline: "Keeping Our Customers Successful"
- Colors: TK Orange (approx #F07F1A) + Charcoal (#1A1A1A) on white, gray accents.
- Voice: confident, engineer to engineer, plain American English. Lead with customer
  outcomes and concrete proof (cavity counts, cycle times, named brands), then capability.
- HARD RULE: never use em dashes or en dashes. Use commas, periods, or restructure.

Positioning: China and Vietnam precision tooling with US based technical oversight.
Compete on the hardest molds (high cavitation, tight tolerance, 2K, stack, conformal
cooling). The differentiator is an accountable US engineer who removes offshore risk.

Always ground claims in the uploaded case studies. Do not invent specs. When you need a
proof point, cite a real delivered mold from the knowledge (for example the Pepsi
Tropicana 48+48 stack, the 128 cavity lab test tube, the Aleve 2K child resistant closure,
or the Accula/Mesa Biotech SARS-CoV-2 diagnostic cassette).
```

## Step 3: Upload these files as Project Knowledge

From this repo, upload (all are text or light, ideal for claude.ai):

- All 10 files in `docs/` (the structured knowledge)
- `marketing/branding/tk holdings logo.png` (so Claude sees the mark)
- A few `marketing/renders/` PNGs for visual reference (for example toothpaste-cap.png, spray-cap.png, beverage-cap.png)
- Optionally the `marketing/presentations/Medical Tooling Case.pdf` and `Packaging tooling case.pdf` for full visual context (note these are 8 to 10 MB each)

Do not upload the videos (too large and not useful as claude.ai knowledge). Reference them via `docs/09-video-catalog.md` instead.

## Step 4: What to ask the Project to make

- LinkedIn and X posts grounded in real case studies
- One pagers per vertical (medical, packaging, diagnostics, consumer electronics)
- Cold outreach sequences targeting the ICP
- Capability decks and proposal drafts
- Tradeshow follow up emails (templates are in `marketing/templates/`)

## Design standards

For any visual output, follow Brandon's house design standards (21st.dev Magic MCP as the component source where applicable, then taste pass). Keep the TK orange and charcoal system, and verify any rendered UI or page with Playwright before considering it done.
