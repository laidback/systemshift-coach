# SystemShift Stack — Rebrand Investigation

**Date:** 2026-03-18  
**Scope:** All laidback/* repos that form the personal/professional OS stack

---

## Proposed Name: `shift` stack

**CLI:** `shiftctl`  
**Stack name:** SystemShift Stack (or just "shift stack")  
**Repos:** rebrand under `systemshift/*` org or keep `laidback/*` with renamed repos

---

## What Needs Renaming

### 1. Repos (GitHub)

| Current | Proposed | Notes |
|---|---|---|
| `laidback/laidback-system` | `systemshift/shift-system` or `laidback/shift-system` | Core machine setup |
| `laidback/laidback-agents` | `systemshift/shift-agents` or `laidback/shift-agents` | AI agent stack |
| `laidback/laidback-ci` | `systemshift/shift-ci` or `laidback/shift-ci` | Reusable CI workflows |
| `laidback/laidback-workspace` | `systemshift/shift-workspace` | Dev workspace config |

### 2. CLI / Commands

| Current | Proposed |
|---|---|
| `openclaw` | stays (it's a product, not the stack name) |
| No stack CLI exists yet | `shiftctl` — new CLI for stack ops |

**shiftctl proposed commands:**
```
shiftctl install          # run install.sh
shiftctl agents status    # check agent health
shiftctl agents restart   # gateway restart
shiftctl update           # pull latest + re-run idempotent install
shiftctl doctor           # diagnose common issues
```

### 3. Internal References (search-replace targets)

| Location | String | Replace with |
|---|---|---|
| install.sh headers | `# laidback-system/install.sh` | `# shift-system/install.sh` |
| install.sh headers | `# laidback-agents/install.sh` | `# shift-agents/install.sh` |
| README.md files | `laidback-system`, `laidback-agents`, `laidback-ci` | `shift-system`, `shift-agents`, `shift-ci` |
| Cross-repo links | `github.com/laidback/laidback-*` | `github.com/laidback/shift-*` |
| CI workflow `uses:` | `laidback/laidback-ci/.github/workflows/...` | `laidback/shift-ci/.github/workflows/...` |
| AGENTS.md + SOUL.md files | "laidback stack", "laidback-agents" | "shift stack", "shift-agents" |
| openclaw.json comments | any laidback-stack references | shift stack |

### 4. What Does NOT Change

| Item | Why |
|---|---|
| `openclaw` CLI | Third-party product — not ours to rename |
| `laidback/*` GitHub org | Keep org, rename repos within it (or create `systemshift` org) |
| Agent names (laidbackbot, techbot etc.) | Internal agent IDs — separate from stack branding |
| `laidback-system` dotfiles path | Breaking change risk — symlinks in `$HOME` |

### 5. GitHub Org Decision

Two options:

**Option A: Keep `laidback` org, rename repos**
- Less disruption, all existing tokens/CI still work
- Repos become `laidback/shift-system`, `laidback/shift-agents` etc.
- GitHub auto-redirects old URLs

**Option B: Create `systemshift` org, transfer repos**
- Cleaner brand alignment — `systemshift/shift-system`
- More work: CI secrets, tokens, openclaw config all need updating
- Recommended only if systemshift.coach becomes a real public brand

**Recommendation: Option A for now.** Rename repos within `laidback` org. Create `systemshift` org when/if the coaching brand goes public.

### 6. shiftctl — Implementation Path

Minimal viable `shiftctl`:
- Shell script, lives in `shift-system/bin/shiftctl`
- Symlinked to `/usr/local/bin/shiftctl` by `install.sh`
- Wraps existing functionality: install, gateway restart, doctor checks

---

## TASK to create

**TASK-018:** Rebrand laidback-* repos to shift-* stack naming + create shiftctl CLI  
Chain: ArchBot (ADR on naming decisions) → TechBot (rename repos, create shiftctl) → ReviewBot
