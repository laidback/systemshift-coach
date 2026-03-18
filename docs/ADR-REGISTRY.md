# ADR Registry — systemshift-coach

This is the canonical ADR number registry for the `systemshift-coach` repo.

**Before creating a new ADR:** check this file for the next available number. Add a `PENDING` entry immediately — before writing the doc — to prevent collisions.

## ADRs

| # | File | Title | Status | Author | Date |
|---|------|-------|--------|--------|------|
| ADR-001 | ADR-001-phase1-architecture.md | SystemShift.coach — Phase 1 Architecture | Accepted | ArchBot | 2026-03-18 |
| ADR-002 | ADR-002-lifebot-web-access.md | LifeBot Web Access for Real-World Lookups | Proposed | ArchBot | 2026-03-18 |
| ADR-003 | ADR-003-lifebot-search-subagent.md | LifeBot Query Anonymisation — Technical Boundary | Proposed | ArchBot | 2026-03-18 |
| ADR-004 | ADR-004-session-state-checkpointing.md | Session State Management & Checkpointing Policy | Accepted | ShaperBot | 2026-03-18 |
| ADR-004 ⚠️ | ADR-004-session-state-durability.md | Session State Durability & Checkpointing Policy | Accepted | ArchBot | 2026-03-18 |
| ADR-005 | ADR-005-mcp-mcporter-tool-usage.md | MCP Server & mcporter Tool Usage Policy | Accepted | ShaperBot | 2026-03-18 |
| ADR-005 ⚠️ | ADR-005-stack-rebranding-shiftctl.md | Stack Rebranding — Cosmetic (shiftctl) | Accepted | ArchBot | 2026-03-18 |

_Next available ADR number: **ADR-006**_

---

## ⚠️ Known Numbering Conflicts

Two ADR-004s and two ADR-005s exist — created concurrently by different agents before this registry existed.

**Resolution needed (assign to ArchBot or TechBot):**

| Conflict | Files | Recommended action |
|----------|-------|--------------------|
| ADR-004 duplicate | `ADR-004-session-state-durability.md` vs `ADR-004-session-state-checkpointing.md` | Merge into single ADR-004; or renumber durability doc to ADR-006 |
| ADR-005 duplicate | `ADR-005-stack-rebranding-shiftctl.md` vs `ADR-005-mcp-mcporter-tool-usage.md` | Renumber rebranding doc to ADR-007 (it's the later authorship) |

Until resolved, treat both files as valid — the ⚠️ marker tracks the conflict.

---

## Claiming a number

1. Add a row with status `PENDING` and your agent name
2. Write the doc
3. Update status to `Proposed` or `Accepted`

```
| ADR-006 | (pending filename) | My decision title | PENDING | YourBot | 2026-03-xx |
```

---

## Scope note

ADRs in this repo govern **systemshift.coach product decisions**: site architecture, CoachBot features, brand, shiftctl (as product CLI), deployment.

ADRs in `laidback-agents/docs/adr/` govern **agent infrastructure**: OpenClaw config, A2A patterns, all 7 agents. Numbers are independent per repo — same number in both repos is not a conflict.
