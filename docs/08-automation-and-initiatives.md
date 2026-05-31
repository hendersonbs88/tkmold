# TK Mold Initiatives and Automation

> Inventory of the systems and content engines that run the TK Americas effort. This documents what exists so the repo reflects the full initiative, not just static collateral.

## Content and Social

### X / Twitter (@brandontkmold)
- Browser automation poster (no API dependency), runs on the Content Forge VPS.
- Posts roughly 3 times per day on weekdays.
- Post types: LinkedIn repurpose, quick take, news reaction.
- Workflow definitions are staged in this repo at `marketing/x-automation/` (5 JSON workflow variants: base, Claude, with images, multi source, 411 strategy).
- Em dash sanitizer is applied at the code level before any publish.

### LinkedIn (@moldminds88 company presence)
- Automated industry news syndication via VPS cron.
- Note: the public TK and MoldMinds social presence is deliberate. Brandon's role on the partnership is structured so MoldMinds is public facing while his TK position stays walled appropriately. Keep the MoldMinds and TK boundary in mind for anything published.

## Sales and RFQ Operations

### RFQ Email Automation
- Outlook inbox scan, Claude based extraction, write to Google Sheets.
- Runs daily via Task Scheduler.

### RFQ Processor
- SQLite database tracking all quotes and their status.

### Prospector System (LinkedIn Sales Navigator)
- Autonomous discovery, enrichment, and outreach pipeline.
- Sends a capped batch of personalized Sales Navigator invites on weekdays, plus session warming, with failure alerts.
- Targets the ICP defined in `02-ideal-customer-profile.md`.

### TK Mail Infrastructure
- TK email is Net263 hosted Microsoft Exchange. Used for RFQ flow and customer correspondence.

## CRM and Pipeline

- TK Mold CRM and prospect pipeline are tracked in Google Sheets (CRM-TK Mold, TK Mold Prospect Pipeline).
- Active and historical accounts in the record include Aptar, Biomerics, Argul (Argentina), CGR (Mexico), Novation Industries, Plastic Molding Technology, Modern Mold and Tool, JL Clark, Fordham Plastics, and legacy P&G work.

## Reporting

- Monthly TK USA technical support review decks (see the TK Technical Support Monthly Presentation series).
- Monthly order statistics reporting for TK North America.

## Partnership Structure (context)

- TK and MoldMinds operate in partnership tied to the Jaeco acquisition track. The relationship and the proposed restructure are documented in `marketing/business-plan/` and `marketing/proposals/`.
- Standing commercial rules for MoldMinds facing quotes (for reference, not TK direct): 20 percent markup on supplier lines, mirror supplier payment terms verbatim. TK direct pricing follows TK's own terms with no added markup.

## How This Repo Fits

This repository is the consolidated knowledge base and asset library for the TK Americas initiative. The `docs/` markdown is the structured, AI ready knowledge. The `marketing/` tree is the raw collateral (decks, case PDFs, renders, logos, trial videos, templates). The `claude-design/` folder is the curated subset to upload into a claude.ai project for design and content work.
