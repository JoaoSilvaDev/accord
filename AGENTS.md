# Accord — Agent Spec

Built on `scaffold-multiplayer-async`. Refer to that scaffold's `AGENTS.md` for base stack decisions.

- Game rules and design: [`GAME_DESIGN.md`](./GAME_DESIGN.md)
- Screens and UI flows: [`SCREENS.md`](./SCREENS.md)
- Task tracking: [`TODO.md`](./TODO.md)

---

## Technical notes

- **Scaffold**: scaffold-multiplayer-async
- **Hosting**: Railway — both client and server, GitHub autodeploy, PR preview environments
- Hex grid rendered in Pixi.js — extend `GameRenderer`, override `onReady()` for the map
- Turn resolution: cron job every minute + early trigger when all players lock in
- SSE for game state pushes (turn resolved, player locked in)
- WebSocket for bilateral chat
- Follow the timestamp-based resolution safety pattern from scaffold AGENTS.md

---

## Lobby system

- Player creates a lobby, shares a short code
- Lobby owner sets: player slots (4–10), turn timer (1h / 6h / 24h / 72h / custom), win condition
- Option to add bots
- Game starts when owner hits "Start" (minimum 2 human players)

---

## Turn timer

- Default: **24 hours**
- Resolves early if all players lock in
- If timer expires and a player hasn't locked in: their orders default to Hold on all territories
- Two consecutive NMRs (no moves received) → player replaced by bot

---

## Monetization

No ads.

- **Donation bar**: top of home page — monthly server costs, donations received, progress bar, donor name list. Powered by LemonSqueezy. Resets monthly.
- **Premium — $2.99 one-time**: custom map themes + "Veteran" badge on profile
- **No pay-to-win**: all gameplay identical for free and paid players
