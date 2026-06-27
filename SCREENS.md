# Accord — Screen Design

## Screen Map

```
Auth
 └── Home (logged in)
      ├── Create Lobby
      │    └── Lobby (waiting room, as owner)
      │         └── Game
      │              └── End Screen
      └── Join Lobby (enter code)
           └── Lobby (waiting room, as guest)
                └── Game
                     └── End Screen
```

---

## 1. Auth Screen

**When shown:** user is not logged in.

**Elements:**
- Game title / logo
- Toggle: Sign in / Register
- Username input
- Password input (min 8 chars)
- Submit button
- Error message area
- Donation bar (passive, bottom of screen)

**Transitions:**
- On success → Home

---

## 2. Home Screen

**When shown:** user is logged in, not in a lobby or game.

**Elements:**
- Greeting: "Welcome back, {username}"
- **Create Game** button → Create Lobby modal
- **Join Game** input + button (enter 6-char lobby code) → Lobby
- Active games list: any games you're currently a player in (shows turn timer countdown, map name, player count) → clicking one resumes the Game screen
- Donation bar (top of page)
- Sign out (top right)

---

## 3. Create Lobby Modal / Screen

**When shown:** user clicks "Create Game" from Home.

**Fields:**
- Map selection (radio or card picker): 3 fixed maps with a small preview image and name
- Player slots: 4 / 6 / 8 / 10
- Turn timer: 1h / 6h / 24h / 72h
- Win condition: Domination % slider (50–70%) or Survival toggle

**Actions:**
- **Create** → creates lobby, transitions to Lobby screen as owner
- **Cancel** → back to Home

---

## 4. Lobby Screen (Waiting Room)

**When shown:** game created but not yet started.

**Elements:**
- Lobby code (large, copyable) + share link
- Player list: each slot shows avatar placeholder + username, or "Open slot" / "Bot"
- Map name + settings summary (timer, win condition, slots)
- **Start Game** button (owner only; disabled until ≥ 2 human players)
- **Leave** button (non-owners) / **Cancel Lobby** (owner)
- Chat placeholder (simple text area for pre-game chat among joined players)

**Transitions:**
- Owner hits Start → all players transition to Game screen simultaneously via SSE push

---

## 5. Game Screen

The main gameplay view. Always full-screen.

### 5a. Map View (default)

**Elements:**
- Hex grid map (Pixi.js canvas, full viewport)
- Territory labels: troop count, territory type icon
- Color-coded territory ownership (your color, enemy colors, neutral grey)
- Top bar: turn number, phase label (Negotiate / Plan / Locked), timer countdown
- Bottom bar: your income balance, locked-in player count (e.g. "3/6 locked")
- Order overlay: when you tap a territory you own, shows order options (Move / Attack / Fortify / Recruit / Hold)
- **Lock In** button (bottom center): disabled until at least one order set; confirms all orders

### 5b. Order Panel (slide-up on territory tap)

- Territory name + type + troops
- Order buttons: Move, Attack, Fortify, Recruit, Hold
- For Move/Attack: select destination (adjacent territories highlighted)
- For Recruit: shows cost, troop count input
- Confirm / Cancel

### 5c. Negotiate Panel (slide-in from side)

- List of other players (avatar + username + "locked" badge if they've locked in)
- Tap a player → opens bilateral chat thread
- Message input at bottom
- Unread badge on panel toggle button

### 5d. Resolution Overlay (shown after turn resolves)

- Appears full-screen over the map briefly (~3–5 seconds)
- Animated summary: "Turn X resolved — N attacks, M successful"
- Tap to dismiss → map updates in place, new turn begins

### 5e. Spectate Mode (cut list, v2)

---

## 6. End Screen

**When shown:** win condition met.

**Elements:**
- Winner banner: "{username} wins!" or "You win!" / "You've been eliminated"
- Final map snapshot (static, no interaction)
- Player ranking table: rank, username, territories at end, turns survived
- **Return to Home** button
- Share result button (copies a text summary)

---

## Navigation Notes

- No persistent nav bar — context-specific back buttons only
- Mobile-first: all tap targets ≥ 44px, panels slide up from bottom on mobile
- Game screen never shows a back button while a game is active — use Leave/Surrender flow instead (TBD)
- Deep links: `/game/{gameId}` and `/lobby/{lobbyCode}` resume the correct screen after auth

---

## Open Questions

- [ ] What does "Leave active game" look like? Surrender and become a bot, or just disconnect?
- [ ] Does the Home screen show completed games (history)?
- [ ] Any onboarding / tutorial flow for new players?
- [ ] Push notifications (web push) for "your turn resolved" — out of scope for v1?
