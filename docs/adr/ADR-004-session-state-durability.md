# ADR-004: Session State Durability & Checkpointing Policy

**Date:** 2026-03-18  
**Status:** Accepted  
**Author:** ArchBot

---

## Context

OpenClaw agents run as stateful LLM sessions. On restart, all in-memory session context is lost. Currently no agent enforces checkpointing before yielding or mid-task. This creates three failure modes:

1. **In-flight task state** — TechBot mid-build loses working memory on restart; resumes from last git commit, potentially re-doing work or losing context on what was next.
2. **Active task state** — Any agent mid-task (multi-step plan, research, content creation) loses all progress if session ends.
3. **A2A messages in-flight** — `sessions_send` to a cold agent queues and delivers on activation, but the *sending* agent has no record it was sent; on restart, it may re-send or lose the thread.

**Audit finding:** No AGENTS.md across any workspace enforces checkpointing. memelord is documented as the memory layer but checkpoint discipline is not mandated. This is a system-wide gap.

---

## Decision

### Global rule — mandatory for all agents

**Before any yield, task boundary, or anticipated session end: write state to TASKS.md and/or memelord.**

Specifically:

1. **TASKS.md is the task ledger** — every agent working on a multi-step task must update TASKS.md with current status before yielding. Status format: `in-progress`, `blocked`, `done` + one-line context note.

2. **memelord is the knowledge layer** — insights, decisions, design patterns, API contracts go to memelord. Not task status (that's TASKS.md).

3. **A2A send = fire and forget** — `sessions_send` timeout is not an error. Agents must not retry blindly. If confirmation is needed, write the pending send to TASKS.md: `"sent A2A to TechBot re: X — awaiting reply"`.

4. **TechBot checkpoint rule** — before ending any coding session: commit all WIP to git with a `wip:` prefix commit, update TASKS.md with what was done and what's next. Never leave work uncommitted.

5. **Long tasks must self-checkpoint** — any task expected to span >1 session must be broken into subtasks in TASKS.md before starting. Each subtask completable in a single session.

---

## TASKS.md Location

| Agent | TASKS.md path |
|-------|--------------|
| TechBot | `/home/laid/.openclaw/workspace-tech/TASKS.md` |
| ArchBot | `/home/laid/.openclaw/workspace-arch/TASKS.md` |
| LifeBot | `/home/laid/.openclaw/workspace-life/TASKS.md` |
| ReviewBot | `/home/laid/.openclaw/workspace-review/TASKS.md` |
| ShaperBot | `/home/laid/.openclaw/workspace-shaper/TASKS.md` |
| CoachBot | `/home/laid/.openclaw/workspace-coach/TASKS.md` |

All agents read `workspace-tech/TASKS.md` as the shared cross-agent task board.  
Each agent also maintains their own workspace TASKS.md for agent-specific work.

---

## A2A Durability Pattern

```
Agent A wants to send to Agent B (cold):
  1. Write to A's TASKS.md: "pending: sent X to AgentB [timestamp]"
  2. sessions_send (fire and forget — timeout is OK)
  3. On next activation: check TASKS.md for unconfirmed A2A sends
  4. If AgentB never responded: re-send once, then escalate to LaidbackBot
```

---

## Implementation

1. **This ADR** — committed to systemshift-coach repo ✅
2. **All AGENTS.md files** — TechBot to add checkpoint section to every workspace AGENTS.md
3. **TASKS.md files** — create in any workspace that doesn't have one
4. **TechBot self-applies first** — highest risk agent, first to implement

---

## Consequences

✅ No silent task loss on session restart  
✅ Any agent can resume from TASKS.md after cold start  
✅ A2A send failures become visible and recoverable  
✅ git history + TASKS.md = full audit trail for TechBot work  
⚠️ Adds discipline overhead — agents must remember to checkpoint  
⚠️ TASKS.md can become stale if not maintained — needs periodic review  
⚠️ Does not solve mid-sentence interruption (token-level loss) — only task-level

---

## Out of Scope

- Message delivery guarantees (OpenClaw does not provide them — by design)
- Session replay / conversation history persistence (separate concern)
- Real-time task state sync between agents (over-engineering for current scale)
