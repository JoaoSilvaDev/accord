import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MAPS = [
  { id: 'ironfeld', name: 'Ironfeld', description: 'Small · 4 players' },
  { id: 'ashveil', name: 'Ashveil', description: 'Medium · 6 players' },
  { id: 'valdris', name: 'Valdris', description: 'Large · 8–10 players' },
]

interface Props {
  onClose: () => void
}

export function CreateLobbyModal({ onClose }: Props) {
  const navigate = useNavigate()
  const [map, setMap] = useState('ironfeld')
  const [slots, setSlots] = useState(6)
  const [timer, setTimer] = useState('24h')
  const [winPct, setWinPct] = useState(50)

  function handleCreate() {
    // Phase 3: call API, get lobby code
    navigate('/lobby/DEMO01')
  }

  return (
    <div style={s.backdrop} onClick={onClose}>
      <div style={s.modal} onClick={e => e.stopPropagation()}>
        <div style={s.header}>
          <p style={s.title}>New Game</p>
          <button onClick={onClose} style={s.closeBtn}>✕</button>
        </div>

        <div style={s.body}>
          <label style={s.label}>Map</label>
          <div style={s.mapGrid}>
            {MAPS.map(m => (
              <div
                key={m.id}
                onClick={() => setMap(m.id)}
                style={{ ...s.mapCard, ...(map === m.id ? s.mapCardSelected : {}) }}
              >
                <p style={s.mapName}>{m.name}</p>
                <p style={s.mapDesc}>{m.description}</p>
              </div>
            ))}
          </div>

          <label style={s.label}>Player slots</label>
          <div style={s.row}>
            {[4, 6, 8, 10].map(n => (
              <button
                key={n}
                onClick={() => setSlots(n)}
                style={{ ...s.chip, ...(slots === n ? s.chipSelected : {}) }}
              >{n}</button>
            ))}
          </div>

          <label style={s.label}>Turn timer</label>
          <div style={s.row}>
            {['1h', '6h', '24h', '72h'].map(t => (
              <button
                key={t}
                onClick={() => setTimer(t)}
                style={{ ...s.chip, ...(timer === t ? s.chipSelected : {}) }}
              >{t}</button>
            ))}
          </div>

          <label style={s.label}>Win condition — {winPct}% of supply centers</label>
          <input
            type="range"
            min={50}
            max={70}
            step={5}
            value={winPct}
            onChange={e => setWinPct(Number(e.target.value))}
            style={s.slider}
          />
        </div>

        <div style={s.footer}>
          <button onClick={onClose} style={s.cancelBtn}>Cancel</button>
          <button onClick={handleCreate} style={s.createBtn}>Create</button>
        </div>
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  backdrop: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 50 },
  modal: { background: '#1a1a1a', borderRadius: '16px 16px 0 0', width: '100%', maxWidth: 480, maxHeight: '90dvh', display: 'flex', flexDirection: 'column' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #2a2a2a' },
  title: { fontWeight: 700, fontSize: 16 },
  closeBtn: { background: 'none', border: 'none', color: '#666', fontSize: 18, cursor: 'pointer', padding: '4px 8px', minHeight: 44, minWidth: 44 },
  body: { flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 },
  label: { fontSize: 12, color: '#666', textTransform: 'uppercase', letterSpacing: 1 },
  mapGrid: { display: 'flex', flexDirection: 'column', gap: 8 },
  mapCard: { padding: '12px 14px', borderRadius: 8, border: '1px solid #2a2a2a', cursor: 'pointer' },
  mapCardSelected: { border: '1px solid #4caf50', background: '#0f2410' },
  mapName: { fontWeight: 600, fontSize: 14 },
  mapDesc: { fontSize: 12, color: '#666', marginTop: 2 },
  row: { display: 'flex', gap: 8 },
  chip: { flex: 1, padding: '10px 0', borderRadius: 8, border: '1px solid #2a2a2a', background: 'none', color: '#f0f0f0', fontSize: 14, cursor: 'pointer', minHeight: 44 },
  chipSelected: { border: '1px solid #4caf50', background: '#0f2410', color: '#4caf50', fontWeight: 600 },
  slider: { width: '100%', accentColor: '#4caf50' },
  footer: { display: 'flex', gap: 10, padding: '16px 20px', borderTop: '1px solid #2a2a2a' },
  cancelBtn: { flex: 1, padding: 14, borderRadius: 8, background: 'none', border: '1px solid #333', color: '#aaa', fontSize: 15, cursor: 'pointer', minHeight: 48 },
  createBtn: { flex: 2, padding: 14, borderRadius: 8, background: '#4caf50', color: '#fff', fontWeight: 700, fontSize: 15, border: 'none', cursor: 'pointer', minHeight: 48 },
}
