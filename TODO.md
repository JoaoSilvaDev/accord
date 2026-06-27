# Accord — TODO

## Phase 0: Project Setup

- [x] Create GitHub repository and push code
- [x] Create Railway project, link to GitHub repo
- [x] Configure Railway service for `client` (build + serve static)
- [x] Configure Railway service for `server` (Node.js)

---

## Phase 1: Screens & UI Shell

All screens from `SCREENS.md`. No game logic yet — just routing, layout, and static/mocked content.

- [ ] Auth screen (sign in / register, error states)
- [ ] Home screen (welcome, create game button, join by code, active games list)
- [ ] Create Lobby modal (map picker, player slots, turn timer, win condition)
- [ ] Lobby waiting room (lobby code, player list, start button, pre-game chat placeholder)
- [ ] Game screen shell (map canvas placeholder, top/bottom bars, phase label, timer)
- [ ] Order panel (slide-up on territory tap — static, no logic)
- [ ] Negotiate panel (slide-in, player list, chat placeholder)
- [ ] Resolution overlay (static, dismissible)
- [ ] End screen (winner banner, ranking table, return to home)
- [ ] Mobile pass: all tap targets ≥ 44px, panels slide from bottom, no horizontal scroll

---

## Phase 2: Game Core (Solo Sandbox)

Playable locally by one person. No multiplayer yet.

- [ ] Hex grid rendering (Pixi.js canvas, full viewport)
- [ ] Map loader (parse hex map data: passable/impassable, SC locations, start positions)
- [ ] Territory ownership + color coding (yours, enemy, neutral)
- [ ] Territory labels (owner icon, unit presence)
- [ ] Tap territory → order panel (Move, Hold, Support, Strike)
- [ ] Move order: highlight valid adjacent passable hexes, select destination
- [ ] Hold order
- [ ] Support order: select unit to support + action
- [ ] Strike order: highlight hexes within geometric distance 2, select target
- [ ] Lock In button → local turn resolution
- [ ] Combat resolution engine (simultaneous, any strength advantage = destroy)
- [ ] Support cutting (attacking a supporter cuts it)
- [ ] Missile Strike resolution (geometric range, destroys unsupported unit or cuts support)
- [ ] Air Defense cancellation (cancels strikes on self or adjacent)
- [ ] Garrison bonus (+1 hold support, permanent)
- [ ] SC and structure ownership transfer (end of Fall)
- [ ] Winter phase: income collection, unit disbanding, unit building, structure purchase + activation
- [ ] Scavenge payout ($1 on unit destroy)
- [ ] Victory check (≥ half of SCs at end of Fall)

---

## Phase 3: Backend & Multiplayer Loop

- [ ] Auth (username + password, sessions)
- [ ] Lobby creation (generate 6-char code, store settings)
- [ ] Lobby join by code
- [ ] Player slot management (open, filled, bot)
- [ ] Game start (owner triggers, SSE push to all players)
- [ ] Game state persistence (DB: territories, units, structures, balances, phase)
- [ ] Order submission API (store per-player orders, mark as locked)
- [ ] Lock-in indicator (SSE push: "N/M players locked")
- [ ] Early resolution trigger (all players locked → resolve immediately)
- [ ] Turn timer (cron every minute, resolve on expiry; defaulted orders = Hold)
- [ ] NMR tracking (2 consecutive NMRs → replace with bot)
- [ ] SSE: push resolved game state to all players after turn resolves
- [ ] Bilateral chat (WebSocket, per player-pair per game)
- [ ] Resume active game from Home screen (deep link `/game/{gameId}`)

---

## Phase 4: Bots & Economy

- [ ] Bot player (holds all units every turn, no orders)
- [ ] Donation bar (LemonSqueezy integration, monthly reset, donor name list)
- [ ] Premium unlock — $2.99 one-time (custom map themes + Veteran badge)
- [ ] Profile: username, badge, game history

---

## Phase 5: Polish & Launch

- [ ] 3 fixed maps (small/medium/large, tested for balance)
- [ ] Resolution overlay animation (attacks, outcomes, 3–5 sec)
- [ ] Leave/Surrender flow (become a bot, not a hard disconnect)
- [ ] Error states: expired lobby, game not found, disconnected
- [ ] Web push notifications: "Turn resolved, it's your turn" (optional for v1)
- [ ] End screen: share result (copy text summary)
- [ ] Completed games on Home screen (history)
- [ ] Accessibility pass (contrast, font sizes, focus states)
- [ ] Load test: 10 concurrent games

---

## Cut List (post-v1)

- Custom map editor
- Spectator mode
- Tournament bracket
- Replay system
- Formal alliance treaties (informal chat covers this in v1)
- Onboarding / tutorial
- Push notifications (if cut from v1)
