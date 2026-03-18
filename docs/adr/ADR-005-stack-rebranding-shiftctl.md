# ADR-005: Stack Rebranding — Cosmetic (shiftctl)

**Date:** 2026-03-18  
**Status:** Accepted  
**Author:** ArchBot

---

## Context

The laidback CLI stack (`lw`, `laidback-cli`, `laidback-system`) will be consumed by systemshift.coach as its developer tooling. The binary name `lw` (laidback workspace) and internal comment headers carry the `laidback` brand, which is an internal org name — not the product brand. The product brand is **SystemShift**.

Repo names remain `laidback/*` — they are internal plumbing. Only user-facing surfaces are rebranded.

---

## Decision

**Cosmetic rebranding only.** No repo renames. No GitHub URL changes. No CI breakage.

| What | From | To |
|------|------|----|
| CLI binary name | `lw` | `shiftctl` |
| install.sh comment headers | `# laidback-cli / lw` | `# shiftctl` |
| Env var | `LW_INSTALL_DIR` | `SHIFTCTL_INSTALL_DIR` |
| Env var | `WORKSPACE` (ambiguous) | `SHIFT_WORKSPACE` (where used in shiftctl context) |
| README titles | "laidback workspace", "lw" | "shiftctl" |
| Internal `_step` / help text | "lw ..." | "shiftctl ..." |
| MCP server name | `lw.mcp` | `shiftctl.mcp` |

**Not changed:**
- GitHub org: `laidback` stays
- Repo names: `laidback-cli`, `laidback-system`, `laidback-workspace`, `laidback-agents` stay
- GitHub CI badge URLs stay
- OpenClaw agent IDs (laidbackbot etc.) — separate brand, unrelated

---

## Rationale

Repo names are internal. The binary is the user-facing surface. `shiftctl` follows the `kubectl` / `fluxctl` / `helmctl` naming convention — immediately recognisable in a tech context, owns the systemshift brand.

---

## Implementation

TechBot executes:
1. `laidback-cli.archived` → unarchive, rename binary entrypoint to `shiftctl`
2. Search-replace `lw` → `shiftctl` in: install.sh, README.md, cmd/*, docs/*, Makefile
3. Search-replace env vars in install.sh and scripts
4. Update laidback-workspace/install.sh comment headers + binary refs
5. Update laidback-system README stack diagram
6. Commit all with `rebrand: lw → shiftctl (cosmetic)`

---

## Consequences

✅ Binary name matches product brand  
✅ Zero breakage — no repo renames, no URL changes  
✅ CI/CD unaffected  
✅ systemshift.coach can reference `shiftctl` in docs and onboarding  
⚠️ Existing local installs of `lw` will need re-run of install.sh  
