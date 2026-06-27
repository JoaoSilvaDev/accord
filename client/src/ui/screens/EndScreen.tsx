import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../lib/AuthContext.js'

const MOCK_RANKINGS = [
  { rank: 1, username: 'joao', scs: 12, turns: 14 },
  { rank: 2, username: 'alice', scs: 8, turns: 14 },
  { rank: 3, username: 'bob', scs: 3, turns: 10 },
  { rank: 4, username: 'carol', scs: 0, turns: 6 },
]

export function EndScreen() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const winner = MOCK_RANKINGS[0]!
  const isWinner = winner.username === user?.username

  function shareResult() {
    const text = `I ${isWinner ? 'won' : 'played'} a game of Accord!\nFinal: ${MOCK_RANKINGS.map(r => `${r.rank}. ${r.username} (${r.scs} SCs)`).join(', ')}`
    navigator.clipboard.writeText(text)
  }

  return (
    <div style={s.container}>
      {/* Winner banner */}
      <div style={s.banner}>
        <p style={s.bannerLabel}>{isWinner ? 'Victory' : 'Game over'}</p>
        <p style={s.bannerName}>{isWinner ? 'You win!' : `${winner.username ?? 'Unknown'} wins`}</p>
        <p style={s.bannerSub}>Ironfeld · Turn 14 · 4 players</p>
      </div>

      {/* Map snapshot placeholder */}
      <div style={s.mapSnapshot}>
        <p style={s.mapPlaceholder}>Final map</p>
      </div>

      {/* Rankings */}
      <div style={s.rankings}>
        <p style={s.sectionLabel}>Final standings</p>
        {MOCK_RANKINGS.map(r => (
          <div key={r.rank} style={{ ...s.rankRow, ...(r.username === user?.username ? s.rankRowSelf : {}) }}>
            <span style={s.rankNum}>#{r.rank}</span>
            <span style={s.rankName}>{r.username}</span>
            <span style={s.rankScs}>{r.scs} SCs</span>
            <span style={s.rankTurns}>{r.turns} turns</span>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={s.actions}>
        <button onClick={shareResult} style={s.shareBtn}>Copy result</button>
        <button onClick={() => navigate('/')} style={s.homeBtn}>Back to Home</button>
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  container: { display: 'flex', flexDirection: 'column', height: '100dvh', overflowY: 'auto' },
  banner: { padding: '40px 24px 32px', textAlign: 'center', background: 'linear-gradient(180deg, #0f2410 0%, #0f0f0f 100%)', display: 'flex', flexDirection: 'column', gap: 6 },
  bannerLabel: { fontSize: 11, color: '#4caf50', textTransform: 'uppercase', letterSpacing: 2 },
  bannerName: { fontSize: 32, fontWeight: 800 },
  bannerSub: { fontSize: 13, color: '#555' },
  mapSnapshot: { height: 160, background: '#141414', display: 'flex', alignItems: 'center', justifyContent: 'center', borderTop: '1px solid #1e1e1e', borderBottom: '1px solid #1e1e1e' },
  mapPlaceholder: { fontSize: 13, color: '#333' },
  rankings: { padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 4, maxWidth: 480, margin: '0 auto', width: '100%' },
  sectionLabel: { fontSize: 11, color: '#555', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 8 },
  rankRow: { display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 8, background: '#141414' },
  rankRowSelf: { background: '#0f2410', border: '1px solid #2d6e30' },
  rankNum: { fontSize: 13, color: '#555', width: 24 },
  rankName: { flex: 1, fontSize: 14, fontWeight: 600 },
  rankScs: { fontSize: 13, color: '#aaa' },
  rankTurns: { fontSize: 12, color: '#555' },
  actions: { padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: 10, maxWidth: 480, margin: '0 auto', width: '100%' },
  shareBtn: { padding: 14, borderRadius: 8, background: '#2a2a2a', border: '1px solid #333', color: '#aaa', fontSize: 15, cursor: 'pointer', minHeight: 48 },
  homeBtn: { padding: 14, borderRadius: 8, background: '#4caf50', color: '#fff', fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer', minHeight: 48 },
}
