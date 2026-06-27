import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../lib/AuthContext.js'

const MOCK_PLAYERS = [
  { id: '1', username: 'joao', isOwner: true },
  { id: '2', username: 'alice', isOwner: false },
  { id: '3', username: null, isOwner: false },
  { id: '4', username: null, isOwner: false },
  { id: '5', username: null, isOwner: false },
  { id: '6', username: null, isOwner: false },
]

export function LobbyScreen() {
  const { code } = useParams<{ code: string }>()
  const { user } = useAuth()
  const navigate = useNavigate()
  const isOwner = user?.username === 'joao'
  const humanCount = MOCK_PLAYERS.filter(p => p.username).length

  function copyCode() {
    navigator.clipboard.writeText(code ?? '')
  }

  return (
    <div style={s.container}>
      <div style={s.topBar}>
        <button onClick={() => navigate('/')} style={s.back}>← Back</button>
        <p style={s.mapLabel}>Ironfeld · 6 players · 24h turns</p>
      </div>

      <div style={s.content}>
        {/* Lobby code */}
        <div style={s.codeBox}>
          <p style={s.codeLabel}>Lobby code</p>
          <p style={s.code}>{code}</p>
          <button onClick={copyCode} style={s.copyBtn}>Copy link</button>
        </div>

        {/* Player list */}
        <div style={s.section}>
          <p style={s.sectionLabel}>Players</p>
          {MOCK_PLAYERS.map((p, i) => (
            <div key={p.id} style={s.playerRow}>
              <div style={s.avatar}>{p.username ? p.username[0]!.toUpperCase() : '?'}</div>
              <div style={s.playerInfo}>
                {p.username
                  ? <><span style={s.playerName}>{p.username}</span>{p.isOwner && <span style={s.ownerBadge}>Host</span>}</>
                  : <span style={s.openSlot}>Open slot</span>
                }
              </div>
            </div>
          ))}
        </div>

        {/* Chat placeholder */}
        <div style={s.section}>
          <p style={s.sectionLabel}>Pre-game chat</p>
          <div style={s.chatBox}>
            <p style={s.chatPlaceholder}>Chat will appear here once the game starts.</p>
          </div>
        </div>
      </div>

      <div style={s.footer}>
        {isOwner
          ? <button
              onClick={() => navigate('/game/demo')}
              disabled={humanCount < 2}
              style={{ ...s.startBtn, ...(humanCount < 2 ? s.startBtnDisabled : {}) }}
            >
              Start Game
            </button>
          : <button onClick={() => navigate('/')} style={s.leaveBtn}>Leave Lobby</button>
        }
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  container: { display: 'flex', flexDirection: 'column', height: '100dvh' },
  topBar: { display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: '1px solid #222' },
  back: { background: 'none', border: 'none', color: '#888', fontSize: 14, cursor: 'pointer', minHeight: 44, padding: '0 8px' },
  mapLabel: { fontSize: 13, color: '#666' },
  content: { flex: 1, overflowY: 'auto', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 480, margin: '0 auto', width: '100%' },
  codeBox: { background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 },
  codeLabel: { fontSize: 11, color: '#555', textTransform: 'uppercase', letterSpacing: 1.5 },
  code: { fontSize: 36, fontWeight: 800, fontFamily: 'monospace', letterSpacing: 8, color: '#f0f0f0' },
  copyBtn: { padding: '8px 20px', borderRadius: 8, background: '#2a2a2a', border: '1px solid #333', color: '#aaa', fontSize: 13, cursor: 'pointer', minHeight: 36 },
  section: { display: 'flex', flexDirection: 'column', gap: 8 },
  sectionLabel: { fontSize: 11, color: '#555', textTransform: 'uppercase', letterSpacing: 1.5 },
  playerRow: { display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid #1e1e1e' },
  avatar: { width: 36, height: 36, borderRadius: '50%', background: '#2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, flexShrink: 0 },
  playerInfo: { display: 'flex', alignItems: 'center', gap: 8 },
  playerName: { fontSize: 14, fontWeight: 600 },
  ownerBadge: { fontSize: 11, color: '#4caf50', border: '1px solid #2d6e30', borderRadius: 4, padding: '1px 6px' },
  openSlot: { fontSize: 14, color: '#444' },
  chatBox: { background: '#141414', border: '1px solid #222', borderRadius: 8, padding: 16, minHeight: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' },
  chatPlaceholder: { fontSize: 13, color: '#444' },
  footer: { padding: '16px', borderTop: '1px solid #222' },
  startBtn: { width: '100%', padding: 14, borderRadius: 8, background: '#4caf50', color: '#fff', fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer', minHeight: 52 },
  startBtnDisabled: { background: '#1e3a1e', color: '#3a6e3a', cursor: 'not-allowed' },
  leaveBtn: { width: '100%', padding: 14, borderRadius: 8, background: 'none', border: '1px solid #333', color: '#aaa', fontSize: 15, cursor: 'pointer', minHeight: 52 },
}
