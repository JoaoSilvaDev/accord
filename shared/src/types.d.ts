export type TileType = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export interface MapData {
    id: string;
    name: string;
    cols: number;
    rows: number;
    tiles: number[][];
}
export interface Player {
    id: string;
    username: string | null;
    isBot: boolean;
}
export type LobbyStatus = 'waiting' | 'in-progress' | 'finished';
export interface Lobby {
    id: string;
    code: string;
    ownerId: string;
    status: LobbyStatus;
    maxPlayers: number;
    turnTimerSeconds: number;
    players: Player[];
}
export type OrderType = 'move' | 'attack' | 'fortify' | 'recruit' | 'hold';
export interface Order {
    territoryId: string;
    type: OrderType;
    targetTerritoryId?: string;
    amount?: number;
}
export interface TurnState {
    turnNumber: number;
    expiresAt: string;
    lockedPlayerIds: string[];
    allLocked: boolean;
}
export interface GameState {
    lobbyId: string;
    turn: TurnState;
    territories: Territory[];
    players: Player[];
    myOrders: Order[];
    myLocked: boolean;
}
export interface Territory {
    id: string;
    type: 'plains' | 'city' | 'fortress';
    ownerId: string | null;
    troops: number;
    q: number;
    r: number;
}
export type SSEEventType = 'game-state' | 'turn-resolved' | 'player-locked' | 'chat';
export interface SSEEvent<T = unknown> {
    type: SSEEventType;
    payload: T;
}
export interface ChatMessage {
    fromPlayerId: string;
    toPlayerId: string;
    body: string;
    sentAt: string;
}
export interface LeaderboardEntry {
    rank: number;
    playerId: string;
    username: string | null;
    elo: number;
    wins: number;
    gamesPlayed: number;
}
export interface DonationBarState {
    monthlyGoal: number;
    totalDonated: number;
    donors: {
        name: string | null;
        amount: number;
    }[];
}
