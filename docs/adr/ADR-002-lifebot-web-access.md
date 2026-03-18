# ADR-002: LifeBot Web Access for Real-World Lookups

**Date:** 2026-03-18  
**Status:** Proposed — awaiting ShaperBot challenge + ReviewBot sign-off  
**Author:** ArchBot

---

## Context

LifeBot handles personal life tasks: train connections, reminders, weather, research. Tasks like Landsberg→Schweinfurt journey planning require live external data. LifeBot currently has `weather` and `gog` skills. `tools.profile=full` is already set — meaning `web_search` and `browser` tools are available by policy. This is a scope + discipline decision, not a build problem.

---

## Options Evaluated

| Option | Pros | Cons |
|--------|------|------|
| `web_search` (Brave API) | Already available, fast, cheap, structured results | Train timetable data from bahn.de is noisy |
| `browser` tool | Can scrape any page | Heavy, slow, high token cost, hard to sandbox |
| DB Bahn / Hafas API skill | Clean structured timetable data | Requires build + maintenance |
| web_search + db-bahn skill | Best coverage, controlled scope | Two components |

---

## Decision

1. **`web_search` is the default web access tool for LifeBot** — already available, zero build cost. Use for general research, quick lookups, weather supplements.

2. **Build a `db-bahn` skill** wrapping the Hafas REST API for structured train journey lookups. LifeBot calls this explicitly for journey planning tasks.

3. **`browser` tool is last resort only** — LifeBot must prefer `web_search` before falling back to browser. Browser use requires explicit justification in the task.

---

## Privacy Constraints (mandatory)

- LifeBot must **anonymise search queries** — no personal names in search strings. Use location + date only (e.g. "Landsberg am Lech Schweinfurt train Thursday" not "Lukas Ciszewski train to Archie").
- Raw web results must **not be stored in memelord** — summaries only.
- No personal data sent to Hafas API — journey queries are anonymous by nature ✅.
- LifeBot SOUL/AGENTS.md must explicitly document these scope rules.

---

## Consequences

✅ Train planning works immediately via web_search + db-bahn skill  
✅ Zero new infrastructure for general research  
✅ db-bahn skill gives clean structured data for journey planning  
✅ Hafas is anonymous — no privacy risk on the API side  
⚠️ Requires LifeBot prompt discipline on query anonymisation  
⚠️ db-bahn skill is a new build dependency (~1–2h TechBot)  
⚠️ Open web_search on a bot with personal family data requires ongoing scope vigilance  

---

## Implementation Order

1. Confirm `web_search` active for LifeBot ✅ (tools.profile=full already)
2. TechBot builds `db-bahn` skill (Hafas wrapper, journey query interface)
3. LifeBot SOUL + AGENTS.md updated: web_search scope rules + db-bahn skill registered
4. ReviewBot sign-off before merge to workspace-life

---

## Open Questions (for ShaperBot challenge)

- Is web_search sufficient or are we underestimating the train lookup problem?
- Is query anonymisation realistic to enforce via prompt alone, or does it need tooling?
- Scope creep risk: does open web_search on a personal-data bot need a harder technical boundary?
- Is db-bahn skill worth build cost vs just using web_search for trains?
