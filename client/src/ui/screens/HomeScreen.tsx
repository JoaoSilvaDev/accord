import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../lib/AuthContext.js'
import { CreateLobbyModal } from '../components/CreateLobbyModal.js'

const MOCK_GAMES = [
  { id: '1', map: 'Ironfeld', players: '4/6', phase: 'Spring · Turn 3', timeLeft: '4h 12m' },
  { id: '2', map: 'Ashveil', players: '6/6', phase: 'Winter · Turn 7', timeLeft: '23h 01m' },
]

export function HomeScreen() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [joinCode, setJoinCode] = useState('')
  const [showCreate, setShowCreate] = useState(false)

  function handleJoin(e: React.FormEvent) {
    e.preventDefault()
    if (joinCode.trim().length === 6) navigate(`/lobby/${joinCode.trim().toUpperCase()}`)
  }

  return (
    <div style={s.container}>
      <div style={s.topBar}>
        <span style={s.logo}>Accord</span>
        <button onClick={logout} style={s.signOut}>Sign out</button>
      </div>

      <div style={s.content}>
        <p style={s.greeting}>Welcome back, <strong>{user?.username}</strong></p>

        <div style={s.actions}>
          <button onClick={() => setShowCreate(true)} style={s.primaryBtn}>Create Game</button>
          <form onSubmit={handleJoin} style={s.joinRow}>
            <input
              placeholder="Game code"
              value={joinCode}
              onChange={e => setJoinCode(e.target.value.toUpperCase())}
              maxLength={6}
              style={s.codeInput}
            />
            <button type="submit" disabled={joinCode.length !== 6} style={s.joinBtn}>Join</button>
          </form>
        </div>

        <div style={s.section}>
          <p style={s.sectionLabel}>Active games</p>
          {MOCK_GAMES.length === 0
            ? <p style={s.empty}>No active games. Create or join one above.</p>
            : MOCK_GAMES.map(g => (
              <div key={g.id} onClick={() => navigate(`/game/${g.id}`)} style={s.gameCard}>
                <div>
                  <p style={s.mapName}>{g.map}</p>
                  <p style={s.gameMeta}>{g.phase} · {g.players} players</p>
                </div>
                <p style={s.timer}>{g.timeLeft}</p>
              </div>
            ))
          }
        </div>
      </div>

      {showCreate && <CreateLobbyModal onClose={() => setShowCreate(false)} />}
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  container: { display: 'flex', flexDirection: 'column', height: '100dvh' },
  topBar: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #222' },
  logo: { fontWeight: 800, fontSize: 18, letterSpacing: 2 },
  signOut: { background: 'none', border: 'none', color: '#666', fontSize: 13, cursor: 'pointer' },
  content: { flex: 1, overflowY: 'auto', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: 28, maxWidth: 480, margin: '0 auto', width: '100%' },
  greeting: { fontSize: 15, color: '#aaa' },
  actions: { display: 'flex', flexDirection: 'column', gap: 10 },
  primaryBtn: { padding: 14, borderRadius: 8, background: '#4caf50', color: '#fff', fontWeight: 600, fontSize: 15, border: 'none', cursor: 'pointer', minHeight: 48 },
  joinRow: { display: 'flex', gap: 8 },
  codeInput: { flex: 1, padding: '12px 14px', borderRadius: 8, border: '1px solid #333', background: '#1a1a1a', color: '#f0f0f0', fontSize: 16, fontFamily: 'monospace', letterSpacing: 3, minHeight: 48 },
  joinBtn: { padding: '12px 20px', borderRadius: 8, background: '#2a2a2a', color: '#f0f0f0', fontWeight: 600, fontSize: 15, border: '1px solid #333', cursor: 'pointer', minHeight: 48 },
  section: { display: 'flex', flexDirection: 'column', gap: 10 },
  sectionLabel: { fontSize: 11, color: '#555', textTransform: 'uppercase', letterSpacing: 1.5 },
  empty: { color: '#444', fontSize: 14, padding: '16px 0' },
  gameCard: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderRadius: 8, background: '#1a1a1a', border: '1px solid #222', cursor: 'pointer', minHeight: 64 },
  mapName: { fontWeight: 600, fontSize: 15 },
  gameMeta: { fontSize: 12, color: '#666', marginTop: 3 },
  timer: { fontSize: 13, color: '#4caf50', fontFamily: 'monospace' },
}
