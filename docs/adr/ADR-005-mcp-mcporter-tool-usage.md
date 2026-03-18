# ADR-005 — MCP Server & mcporter Tool Usage Policy

**Status:** Accepted  
**Date:** 2026-03-18  
**Author:** ShaperBot + Lukas Ciszewski  
**Scope:** All OpenClaw agents + IDE tooling (Copilot, Junie)

---

## Context

The system uses both MCP (Model Context Protocol) servers and mcporter (OpenClaw's MCP client/proxy CLI). A question arose: who needs a DB MCP server, and when should MCP servers be added vs. direct tool calls?

---

## Decision

### Rule 1 — OpenClaw agents do NOT need MCP servers for DB access

Agents use **mcporter** as the abstraction layer. mcporter handles MCP transport internally. Agents call:
```bash
mcporter call <server>.<tool> param=value
```
No MCP server needs to be exposed or managed by the agent. This covers: memelord (SQLite), Turso, and any future DB-backed tools.

### Rule 2 — MCP servers ARE needed for IDE assistants

When **GitHub Copilot** (VS Code) or **JetBrains Junie** need live DB context (schema awareness, query assistance, migration support during coding), a DB MCP server must be configured and exposed to the IDE.

| Consumer | Needs MCP server? | Notes |
|---|---|---|
| OpenClaw agents | ❌ No | mcporter handles it |
| GitHub Copilot (VS Code) | ✅ Yes — if DB context needed | MCP support since early 2025 |
| JetBrains Junie | ✅ Yes — if DB context needed | MCP-aware |
| Claude Desktop | ✅ Yes — for ad-hoc querying | Optional, convenience |
| shiftctl / scripts | ❌ No | Direct CLI or mcporter |

### Rule 3 — Add DB MCP server only when IDE workflow requires it

Do not pre-provision MCP servers speculatively. Add when:
- Copilot or Junie is actively used for work touching the schema
- Ad-hoc DB querying outside agent sessions becomes a regular need

Current status: **not needed**. Defer until Copilot/Junie enters the systemshift dev workflow.

### Rule 4 — HTTP tools vs MCP for external APIs

For external APIs (e.g. db-rest for train lookups, weather APIs):
- Prefer **direct HTTP tool calls** (web_fetch, exec curl) for simple request/response
- Only wrap in an MCP skill/mcporter server if the API is used frequently across multiple agents or requires auth management

db-rest (trains) → direct HTTP tool call, not an MCP server. (See TASK-016.)

---

## Consequences

- Agents stay lean — no MCP server management overhead
- IDE tooling gets MCP when the workflow demands it — not before
- Tool selection rule: agent task → mcporter; IDE context → MCP server; external API → HTTP direct

---

## Related

- TASK-016 — LifeBot web access (db-rest train lookup via HTTP, not MCP)
- ADR-002 — LifeBot web access architecture
- ADR-004 — Session state checkpointing
