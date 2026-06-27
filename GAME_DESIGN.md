# Accord — Game Design

## 1. Setup & Home Supply Centers

At the start of the game, each player is assigned **3 specific Home Supply Centers** and begins with **1 unit in each**.

* **Permanent Status:** Home Supply Centers never change. Even if you capture foreign Supply Centers, they never become Home Supply Centers.

## 2. Economy & Assets

* **Unit Capacity:** You may only have one unit per Supply Center you control. If you are over cap at the start of Winter, you must disband down to your limit — you choose which units to remove.
* **Currency:** Every Winter, you earn **$1 for every Supply Center you control**.
* **Scavenge:** Whenever any of your units is destroyed, you immediately receive **$1** as compensation.
* **Trading:** Players may freely trade or gift Currency at any time.

## 3. Units & Combat

There is one type of mobile unit: the **Army**. Every unit has a base strength of 1.

* **Move:** Attack or move into an adjacent territory.
* **Hold:** Stay in place and defend with a base strength of 1.
* **Support:** Add your unit's strength of 1 to another unit's Move or Hold.
* **The Golden Rule:** You can only support an action in a territory that your unit could theoretically move into itself.
* **Cutting Support:** Attacking a unit that is currently supporting cuts its support — it provides no support that turn (but is not destroyed unless the attack succeeds with enough force).
* **Stand Your Ground:** A supporting unit does not move; it provides covering fire from its current territory.
* **Strike:** (Missile Silo only) Target any passable territory within 2 hex distance to cut support or destroy an unsupported unit. Range is measured geometrically — missiles fly over impassable terrain.

**Combat Math:** All orders are simultaneous. The side with the most total strength wins. Equal strength = standoff, neither unit moves. Any strength advantage = the losing side is instantly destroyed. The destroyed player gains $1 Scavenge.

## 4. Structures

* **One Per Territory:** Max one structure per territory.
* **One Build Per Year:** You may only purchase one Structure per year.
* **Tied to the Land:** Structures cannot move. Ownership follows territory control — whoever occupies a territory at the end of the Fall turn owns any structure there.

| Structure | Cost | Effect |
| --- | --- | --- |
| **Garrison** | $3 | Provides a permanent **+1 Hold Support** to any unit defending this territory. |
| **Air Defense** | $3 | Cancels any Missile Strike targeting its own or an adjacent territory. |
| **Missile Silo** | $5 | Can issue a "Strike" order up to 2 hex distance away (geometric, flies over terrain). No unit required to operate. |

## 5. The Turn Sequence

1. **Spring Phase:**
   * **Diplomacy:** Negotiate and trade Currency.
   * **Orders:** Submit Move, Hold, Support, or Strike orders.
   * **Resolution:** Orders are executed simultaneously. Defeated units are removed; their owner gains $1 Scavenge.

2. **Fall Phase:**
   * Plays exactly like the Spring Phase.
   * **Crucial Rule:** Ownership of Supply Centers and Structures only changes hands based on who occupies them at the end of the Fall turn.

3. **Winter Phase (Economy & Building):**
   * **Income:** Collect $1 per Supply Center held.
   * **Unit Adjustments:** Disband units of your choice if over cap; build new units in any empty territory you control if under cap.
   * **Purchase Structures:** Buy *one* Structure. It is placed "Under Construction."
   * **Structure Activation:** Any Structure that spent the previous Spring and Fall "Under Construction" now becomes active.

## 6. Map Design

* **Graph, not grid:** The map is a hand-crafted adjacency graph. Territories are nodes; shared borders are edges. Variable connectivity is intentional — some territories are hubs (many neighbors), others are chokepoints (1–2 connections).
* **No islands:** Every territory must be reachable by land. Isolated territories are not allowed.
* **Impassable barriers:** Mountains, ruins, or walls are represented as missing edges between territories. They carve the map into natural regions connected by a small number of narrow passes.
* **Strait connections:** Territories separated by water can still be connected via a strait or bridge — visually they cross water, mechanically they are normal hex adjacency.
* **Hex topology:** Individual hexes are territories. Impassable hexes (mountains, water, ruins) create barriers and shape connectivity. A hex adjacent to many passable hexes is a hub; a hex with few passable neighbors is a chokepoint. No special rules needed — connectivity emerges from layout.
* **Movement vs. missile range:** Units move through passable hex adjacency only. Missile range is geometric hex distance and ignores impassable terrain.
* **SC placement:** Supply Centers should sit at the contested edges between regions, not deep inside any one player's sphere. This guarantees conflict.
* **Scale:** Map size scales with player count. Each player should start with 3 Home Supply Centers and have a realistic path to roughly 2–3 neutral SCs before running into opposition.

## 7. Victory

Control **half or more** of all Supply Centers on the map at the end of any Fall turn.
