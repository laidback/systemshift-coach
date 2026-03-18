# CoachBot — Agent Specification

**Agent ID:** coachbot  
**Bot name:** @LaidbackCoachBot  
**Workspace:** `/home/laid/.openclaw/workspace-coach/`  
**Access:** Private (Lukas only) + LaidbackChat group when @mentioned

## Purpose

Private coaching assistant for Lukas Ciszewski. Not client-facing. Supports Lukas's work as a systemic coach under the SystemShift.Coach brand.

## Capabilities

- Session prep (context, hypothesis, success definition)
- Session note capture (anonymised — no real client names)
- Follow-up draft generation (DE/EN)
- Resource bank (frameworks, models, quotes via memelord)
- End-of-day reflection prompts
- Client log (anonymised labels, themes, session count)

## Confidentiality Rules

- No real client names stored ever
- memelord stores patterns and themes only
- Anonymise before any storage or search call
- No data shared with other agents

## A2A

Uses group session keys for all inter-agent communication.  
Does NOT post unsolicited to LaidbackChat.

## Token

New token required — revoked token (leaked in group chat 2026-03-18).  
Get fresh token from BotFather → update `/home/laid/.openclaw/secrets.json` key `TELEGRAM_TOKEN_COACHBOT` → restart gateway.

## Workspace Files

- `SOUL.md` — persona, tone, behaviour
- `IDENTITY.md` — role definition
- `AGENTS.md` — operational instructions
- `TOOLS.md` — environment, binaries, paths
- `USER.md` — about Lukas
