# ADR-004 — Session State Management & Checkpointing Policy

**Status:** Accepted  
**Date:** 2026-03-18  
**Author:** ShaperBot (challenged and accepted by Lukas Ciszewski)  
**Scope:** All OpenClaw agents (laidbackbot, techbot, lifebot, reviewbot, archbot, shaperbot, coachbot)

---

## Context

OpenClaw agent sessions are ephemeral. On restart, all in-memory state is lost:
- Conversation context (reasoning, decisions made mid-session)
- In-flight task progress (e.g. TechBot mid-build)
- A2A messages in-flight (not yet delivered if session dies)

Three risk tiers were identified:

| Risk | Description | Severity |
|------|-------------|----------|
| In-flight task state | TechBot mid-build, ArchBot mid-ADR | ⚠️ High |
| Active task state | In-memory only, not written to TASKS.md | ⚠️ High |
| A2A messages in-flight | Session queue in-memory, lost if session dies mid-send | ⚠️ Medium |

TechBot's coding sessions are highest risk — if restarted mid-build, it resumes from last git commit, not last action.

---

## Decision

**All agents MUST checkpoint before yielding or when pre-empted.**

### Rule 1 — Task state to TASKS.md

Before any agent yields control (completes, pauses, or is about to restart), it MUST update its task entry in `/home/laid/.openclaw/workspace-tech/TASKS.md`:
- Set status to `in-progress` with a `**Progress:**` note
- Write what was done, what remains, what the next step is
- Include any blockers or open questions

### Rule 2 — Insight/decision to memelord

Any non-trivial decision or insight reached mid-session that isn't captured in a file MUST be stored to memelord before yielding:
```bash
cd <workspace> && /home/laid/.npm-global/bin/mcporter call memelord.memory_report type=insight lesson="<decision or state>"
```

### Rule 3 — Code commits before yield

TechBot specifically: any in-progress code change must be committed (WIP commit acceptable) before yielding. Never leave uncommitted changes as the only record of progress.

```
git add . && git commit -m "wip: <description of current state>"
```

### Rule 4 — A2A fire-and-move-on

`sessions_send` timeout ≠ failure. Agents must NOT retry A2A in a loop. Send once, move on. If delivery confirmation is critical, write intent to TASKS.md first, then send.

### Rule 5 — Pre-restart checklist

Before a full gateway restart, the initiating agent (or human) should:
1. Check TASKS.md for any `in-progress` tasks — confirm they have a progress note
2. Ask active agents to checkpoint (via A2A)
3. Proceed with restart only after confirmation or timeout

---

## Consequences

- Agents produce more frequent, smaller TASKS.md updates
- TechBot makes WIP commits — cleaner audit trail
- Session restarts become low-risk: all durable state is on disk or in memelord
- A2A reliability improves: intent written before send, not after

---

## Global Rule

This is a **global rule** — applies to all agents without exception. Each agent's AGENTS.md must include a checkpointing section referencing this ADR.

---

## Related

- TASK-016 — LifeBot web access
- TASK-017 — systemshift-coach repo structure
- ADR-002 — LifeBot web access (query anonymisation)
