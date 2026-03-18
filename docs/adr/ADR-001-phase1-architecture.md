# ADR-001: SystemShift.coach — Phase 1 Architecture

**Date:** 2026-03-18  
**Status:** Accepted  
**Author:** ArchBot

---

## Context

Lukas Ciszewski launches a parallel coaching business targeting IT professionals under the brand **SystemShift.coach** (domain owned). Lukas is a trained systemic coach with 20+ years IT experience. Needs a web presence, LinkedIn positioning, and a private coaching assistant bot — with zero infrastructure overhead in phase 1.

---

## Decision

### Static site
- **Stack:** Astro, minimal dark design, single-page EN (DE phase 2)
- **Deployment:** Local/repo only in phase 1. Vercel when ready.
- **Booking CTA:** Placeholder `mailto:` — Cal.com when ready.
- **Repo:** `github.com/laidback/systemshift-coach`

### Offer
- 1:1 sessions: 60 min / 130€
- 6-session package: 130€/session
- Language: German + English

### CoachBot (LaidbackCoachBot)
- Private Telegram bot for Lukas only (whitelist: single user ID)
- OpenClaw workspace: `workspace-coach`, accountId: `coachbot`
- Phase 1 features: session prep, notes capture, reflection prompt, resource bank, basic client notes
- SOUL: minimal, sharp — mirrors Lukas's coaching style

---

## Consequences

✅ Zero infrastructure overhead — static site, no CMS, no backend  
✅ Fast to launch — repo is built and runnable (`npm run dev` → localhost:4321)  
✅ CoachBot is private by design — no client-facing complexity until validated  
⚠️ No live deployment until Lukas triggers Vercel setup  
⚠️ CoachBot token needs refresh before bot is live  

---

## Next decisions needed

- ADR-002: LinkedIn strategy (separate doc)
- ADR-003: CoachBot feature expansion (post-validation)
- Deployment trigger: Lukas decision on Vercel go-live
