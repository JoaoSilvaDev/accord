// Player

export interface Player {
  id: string
  username: string | null
  isBot: boolean
}

// Lobby

export type LobbyStatus = 'waiting' | 'in-progress' | 'finished'

export interface Lobby {
  id: string
  code: string
  ownerId: string
  status: LobbyStatus
  maxPlayers: number
  turnTimerSeconds: number
  players: Player[]
}

// Turn

export type OrderType = 'move' | 'attack' | 'fortify' | 'recruit' | 'hold'

export interface Order {
  territoryId: string
  type: OrderType
  targetTerritoryId?: string
  amount?: number
}

export interface TurnState {
  turnNumber: number
  expiresAt: string // ISO timestamp
  lockedPlayerIds: string[]
  allLocked: boolean
}

// Game state (what the client receives)

export interface GameState {
  lobbyId: string
  turn: TurnState
  territories: Territory[]
  players: Player[]
  myOrders: Order[]
  myLocked: boolean
}

export interface Territory {
  id: string
  type: 'plains' | 'city' | 'fortress'
  ownerId: string | null
  troops: number
  // position for rendering — game-specific, coords set per map
  q: number
  r: number
}

// SSE event envelope

export type SSEEventType = 'game-state' | 'turn-resolved' | 'player-locked' | 'chat'

export interface SSEEvent<T = unknown> {
  type: SSEEventType
  payload: T
}

// Chat

export interface ChatMessage {
  fromPlayerId: string
  toPlayerId: string
  body: string
  sentAt: string
}

// Leaderboard

export interface LeaderboardEntry {
  rank: number
  playerId: string
  username: string | null
  elo: number
  wins: number
  gamesPlayed: number
}

// Donations

export interface DonationBarState {
  monthlyGoal: number
  totalDonated: number
  donors: { name: string | null; amount: number }[]
}
