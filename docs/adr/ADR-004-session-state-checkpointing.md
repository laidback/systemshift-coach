# ADR-004: Session State Management and Checkpointing Policy

**Status:** Accepted  
**Date:** 2026-03-18  
**Deciders:** Lukas Ciszewski  
**Context:** OpenClaw multi-agent system (LaidbackBot, TechBot, CoachBot, LifeBot, ArchBot, ShaperBot, ReviewBot)

---

## Context

OpenClaw agents run as stateful sessions. When a session is restarted (gateway restart, token refresh, manual restart), in-memory state is lost. This includes:

- In-flight task state (what an agent was mid-doing)
- Active working memory (intermediate results, decisions not yet written)
- A2A messages in-flight (not yet delivered or acknowledged)

A restart without checkpointing means an agent resumes with no knowledge of what it was doing. For TechBot mid-build, this means starting from last commit. For CoachBot mid-draft, the draft is gone. For A2A coordination, messages may be silently dropped.

---

## Decision

**All agents MUST checkpoint before yielding control or when a restart is anticipated.**

This is a **global rule** across all agents in the OpenClaw fleet.

### Checkpointing targets (in priority order):

1. **memelord** — store insights, decisions, and context summaries as memory entries
2. **TASKS.md** (per workspace) — write current task state, progress, and next step before any yield or restart
3. **File system** — partial outputs (drafts, configs, code) must be written to disk before a long pause or handoff

### Specific agent rules:

| Agent | Highest risk | Mitigation |
|---|---|---|
| TechBot | Mid-build coding session | Write progress + last known state to TASKS.md; commit WIP if in a repo |
| CoachBot | Mid-draft content | Write draft to file in systemshift repo before yielding |
| LaidbackBot | A2A coordination state | Log dispatched tasks and pending responses to TASKS.md |
| LifeBot | Calendar/email mid-task | Write intent + status before any long-running op |
| All agents | In-flight A2A messages | Treat timeout as delivery (not failure); re-check state on resume |

### Pre-restart protocol (when restart is known):

1. Write current task + status to workspace `TASKS.md`
2. Store key context to memelord
3. Commit any file changes to git (where applicable)
4. Signal LaidbackBot via A2A that a restart is imminent

### On resume:

1. Read `TASKS.md` on startup
2. Query memelord for recent context if task is unclear
3. Resume from last known checkpoint

---

## Consequences

- **Positive:** Task continuity across restarts; reduced lost-work incidents; clearer handoff state
- **Positive:** TASKS.md becomes a lightweight coordination surface for LaidbackBot
- **Negative:** Small overhead — agents must write state before yielding (acceptable tradeoff)
- **Risk:** Agents that don't implement this remain fragile. TechBot coding sessions are the highest ongoing risk.

---

## Related

- ADR-001: Phase 1 Architecture
- AGENTS.md (per workspace): task durability rules
- memelord: primary cross-session memory store
