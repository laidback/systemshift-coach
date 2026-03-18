# SystemShift.coach — Concept & Vision

**Brand:** SystemShift.coach  
**Owner:** Lukas Ciszewski  
**Domain:** systemshift.coach (owned)  
**Date:** 2026-03-18

---

## The Idea

A coaching practice targeting IT professionals — engineers, tech leads, CTOs — navigating burnout, career transitions, identity traps, and leadership challenges.

"Systemic" means looking at the whole system: work, relationships, organisation, identity. Not just productivity hacks.

**The differentiator:** Lukas has 20+ years lived experience in the systems his clients are inside. That's rare in coaching.

---

## Positioning

> "The system isn't broken. You're just running the wrong one."

Target clients:
- Senior engineers and tech leads feeling the ceiling
- Engineering managers in transition (IC → lead → director)
- CTOs and founders carrying too much, alone
- Anyone in IT whose work has become their entire identity

---

## Offer (Phase 1)

| Format | Duration | Price |
|--------|----------|-------|
| Single session | 60 min | 130€ |
| 6-session package | 60 min each | 130€/session |

Language: German or English  
Format: Video call

---

## Product Architecture

```
systemshift.coach (static Astro site)
├── Single page: hero, problem, method, offer, about, CTA
├── Dark minimal design
├── Language: EN (DE toggle — phase 2)
├── Booking: Cal.com (phase 2)
└── Repo: github.com/laidback/systemshift-coach

LinkedIn (Lukas personal brand)
├── Profile rewrite: "Systemic Coach for IT Professionals"
├── 2x/week content: stories, reframes, systems thinking
└── Lead gen: discovery call via DM

LaidbackCoachBot (private Telegram bot)
├── Lukas-only access
├── Session prep, notes, reflection prompts
├── Resource bank, basic client notes
└── SOUL: minimal, sharp — mirrors coaching style
```

---

## Phase Roadmap

**Phase 1 (now)**
- [x] Astro site built, local dev ready
- [x] CoachBot configured in OpenClaw
- [ ] CoachBot token live (pending)
- [ ] LinkedIn profile rewrite
- [ ] Cal.com setup (Lukas)

**Phase 2**
- [ ] DE/EN language toggle on site
- [ ] Vercel deployment
- [ ] Cal.com booking integration
- [ ] Content seeding (LinkedIn)
- [ ] 5 discovery conversations

**Phase 3 (post-validation)**
- [ ] Group cohort or async offer
- [ ] CoachBot client-facing features (if demand)

---

## ADR Index

| ADR | Title | Status |
|-----|-------|--------|
| [ADR-001](adr/ADR-001-phase1-architecture.md) | Phase 1 Architecture | Accepted |
| [ADR-002](adr/ADR-002-lifebot-web-access.md) | LifeBot Web Access | Proposed |
