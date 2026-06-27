import { useState } from 'react'

const MOCK_PLAYERS = [
  { id: '2', username: 'alice', locked: true },
  { id: '3', username: 'bob', locked: false },
  { id: '4', username: 'carol', locked: true },
  { id: '5', username: 'dave', locked: false },
]

interface Props {
  onClose: () => void
}

export function NegotiatePanel({ onClose }: Props) {
  const [selected, setSelected] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  return (
    <div style={s.panel}>
      <div style={s.header}>
        <p style={s.title}>Diplomacy</p>
        <button onClick={onClose} style={s.closeBtn}>✕</button>
      </div>

      {!selected
        ? <div style={s.playerList}>
            {MOCK_PLAYERS.map(p => (
              <div key={p.id} onClick={() => setSelected(p.id)} style={s.playerRow}>
                <div style={s.avatar}>{p.username[0]!.toUpperCase()}</div>
                <span style={s.username}>{p.username}</span>
                {p.locked && <span style={s.lockedBadge}>Locked</span>}
              </div>
            ))}
          </div>
        : <div style={s.chat}>
            <button onClick={() => setSelected(null)} style={s.backBtn}>← Players</button>
            <div style={s.messages}>
              <p style={s.placeholder}>Start of conversation</p>
            </div>
            <div style={s.inputRow}>
              <input
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Message..."
                style={s.input}
              />
              <button style={s.sendBtn} disabled={!message.trim()}>Send</button>
            </div>
          </div>
      }
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  panel: { position: 'fixed', top: 0, right: 0, bottom: 0, width: 'min(320px, 85vw)', background: '#1a1a1a', borderLeft: '1px solid #2a2a2a', display: 'flex', flexDirection: 'column', zIndex: 20 },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px', borderBottom: '1px solid #2a2a2a' },
  title: { fontWeight: 700, fontSize: 15 },
  closeBtn: { background: 'none', border: 'none', color: '#666', fontSize: 18, cursor: 'pointer', minHeight: 44, minWidth: 44 },
  playerList: { flex: 1, overflowY: 'auto' },
  playerRow: { display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderBottom: '1px solid #1e1e1e', cursor: 'pointer' },
  avatar: { width: 34, height: 34, borderRadius: '50%', background: '#2a2a2a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 },
  username: { flex: 1, fontSize: 14 },
  lockedBadge: { fontSize: 11, color: '#4caf50', border: '1px solid #2d6e30', borderRadius: 4, padding: '1px 6px' },
  chat: { flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' },
  backBtn: { background: 'none', border: 'none', color: '#888', fontSize: 13, cursor: 'pointer', padding: '10px 16px', textAlign: 'left', minHeight: 44 },
  messages: { flex: 1, overflowY: 'auto', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  placeholder: { fontSize: 13, color: '#444' },
  inputRow: { display: 'flex', gap: 8, padding: '12px 16px', borderTop: '1px solid #2a2a2a' },
  input: { flex: 1, padding: '10px 12px', borderRadius: 8, border: '1px solid #2a2a2a', background: '#242424', color: '#f0f0f0', fontSize: 14, minHeight: 44 },
  sendBtn: { padding: '10px 16px', borderRadius: 8, background: '#4caf50', color: '#fff', fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer', minHeight: 44 },
}
