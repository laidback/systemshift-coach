# ADR-003: LifeBot Query Anonymisation — Technical Boundary

**Date:** 2026-03-18  
**Status:** Proposed  
**Author:** ArchBot  
**Context:** Follow-up to ADR-002. Lukas raised: "prompt discipline for anonymisation — how could this be prevented technically? e.g. spawn a naive subagent for search?"

---

## Problem

ADR-002 flagged that LifeBot must anonymise web search queries (no personal names). Relying on prompt discipline alone is weak — the model can slip, especially under complex multi-step tasks.

**Risk:** LifeBot sends "Lukas Ciszewski train to Schweinfurt Thursday" to Brave Search. That query is logged externally.

---

## Options

### Option A — Prompt discipline only (ADR-002 baseline)
Instruct LifeBot in SOUL.md to anonymise. Simple. Fragile.

**Risk:** High. LLMs don't reliably maintain this under load.

### Option B — Naive search subagent (Lukas's suggestion)
LifeBot spawns a minimal subagent with web_search access but **no personal context** (no USER.md, no memory, no session history). LifeBot passes only the sanitised query. Subagent returns results. Personal data never touches the search layer.

**Risk:** Low on privacy. Adds latency (~1-2s). Subagent spawning is supported in OpenClaw.

### Option C — Query sanitisation wrapper (skill/tool)
A thin skill that strips personal identifiers before passing to web_search. Regex + LLM-based PII scrubber. More deterministic than prompt-only.

**Risk:** Moderate complexity. PII scrubbing is never 100%.

### Option D — Allow-list query patterns
LifeBot only searches pre-approved query templates: `{city} {city} {transport} {date}`. Anything outside the pattern requires explicit user confirmation.

**Risk:** Inflexible. Breaks for general research.

---

## Decision

**Option B — Naive search subagent** is the right call.

Architectural separation is more reliable than prompt rules. LifeBot constructs the anonymised query (that's a reasoning step, not a tool call — lower risk), then delegates execution to a context-free subagent. The subagent has: `web_search` only, no USER.md, no memory, no Telegram access.

This is a clean isolation pattern. Cost: marginal latency, minimal build.

---

## Implementation

```
LifeBot (has personal context)
  └─ constructs anonymised query string
  └─ spawns search-subagent (runtime=subagent, task="search: {query}")
       └─ search-subagent: web_search only, no personal context
       └─ returns structured result
  └─ LifeBot uses result, never logs raw query externally
```

No new agent needed — use `sessions_spawn` with a minimal task prompt. No workspace, no skills, no memory. Tools: `web_search` only (via subagent allowlist if supported, else trust the isolation).

---

## Consequences

✅ Personal data never reaches Brave Search API  
✅ Clean architectural separation — easy to audit  
✅ Works today with existing OpenClaw subagent support  
⚠️ Adds ~1-2s latency per search  
⚠️ LifeBot still needs to construct a good anonymised query (reasoning step)  
⚠️ Subagent spawning adds token cost (small)  

---

## Next

- TechBot: update LifeBot SOUL.md with search subagent pattern
- TechBot: test the pattern with a real train lookup task
- ReviewBot sign-off before merge
