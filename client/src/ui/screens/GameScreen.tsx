import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { GameRenderer } from '../../game/renderer.js'
import { OrderPanel } from '../components/OrderPanel.js'
import { NegotiatePanel } from '../components/NegotiatePanel.js'
import { ResolutionOverlay } from '../components/ResolutionOverlay.js'

export function GameScreen() {
  const navigate = useNavigate()
  const canvasRef = useRef<HTMLDivElement>(null)
  const [orderTerritory, setOrderTerritory] = useState<string | null>(null)
  const [showNegotiate, setShowNegotiate] = useState(false)
  const [showResolution, setShowResolution] = useState(false)
  const [locked, setLocked] = useState(false)

  useEffect(() => {
    if (!canvasRef.current) return
    const renderer = new GameRenderer(canvasRef.current)
    return () => renderer.destroy()
  }, [])

  function handleLockIn() {
    setLocked(true)
    // Phase 3: submit orders to server
    setTimeout(() => setShowResolution(true), 800)
  }

  function handleResolutionDismiss() {
    setShowResolution(false)
    setLocked(false)
    navigate(`/game/demo/end`)
  }

  return (
    <div style={s.container}>
      {/* Canvas */}
      <div ref={canvasRef} style={s.canvas} onClick={() => setOrderTerritory('Territory A')} />

      {/* Top bar */}
      <div style={s.topBar}>
        <div style={s.phaseInfo}>
          <span style={s.phase}>Spring</span>
          <span style={s.turn}>· Turn 1</span>
        </div>
        <span style={s.timerText}>23:14:07</span>
        <button onClick={() => setShowNegotiate(true)} style={s.dipBtn}>Diplo</button>
      </div>

      {/* Bottom bar */}
      <div style={s.bottomBar}>
        <div style={s.balance}>
          <span style={s.balanceLabel}>Balance</span>
          <span style={s.balanceValue}>$3</span>
        </div>
        <div style={s.lockInfo}>
          <span style={s.lockCount}>2 / 6 locked</span>
        </div>
        <button
          onClick={handleLockIn}
          disabled={locked}
          style={{ ...s.lockBtn, ...(locked ? s.lockBtnDone : {}) }}
        >
          {locked ? 'Locked in' : 'Lock In'}
        </button>
      </div>

      {/* Panels */}
      {orderTerritory && !showNegotiate && (
        <OrderPanel territory={orderTerritory} onClose={() => setOrderTerritory(null)} />
      )}
      {showNegotiate && (
        <NegotiatePanel onClose={() => setShowNegotiate(false)} />
      )}
      {showResolution && (
        <ResolutionOverlay turn={1} summary="3 attacks, 2 successful" onDismiss={handleResolutionDismiss} />
      )}
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  container: { position: 'relative', width: '100%', height: '100dvh', overflow: 'hidden' },
  canvas: { position: 'absolute', inset: 0 },
  topBar: { position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', gap: 8, padding: '10px 16px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 10 },
  phaseInfo: { flex: 1, display: 'flex', gap: 6, alignItems: 'baseline' },
  phase: { fontWeight: 700, fontSize: 15 },
  turn: { fontSize: 13, color: '#888' },
  timerText: { fontFamily: 'monospace', fontSize: 14, color: '#4caf50' },
  dipBtn: { padding: '6px 14px', borderRadius: 8, background: '#2a2a2a', border: '1px solid #333', color: '#f0f0f0', fontSize: 13, cursor: 'pointer', minHeight: 36 },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', paddingBottom: 'calc(10px + env(safe-area-inset-bottom))', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 10 },
  balance: { display: 'flex', flexDirection: 'column', gap: 1 },
  balanceLabel: { fontSize: 10, color: '#555', textTransform: 'uppercase', letterSpacing: 1 },
  balanceValue: { fontSize: 16, fontWeight: 700, fontFamily: 'monospace' },
  lockInfo: { flex: 1 },
  lockCount: { fontSize: 12, color: '#666' },
  lockBtn: { padding: '10px 20px', borderRadius: 8, background: '#4caf50', color: '#fff', fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer', minHeight: 44 },
  lockBtnDone: { background: '#1e3a1e', color: '#3a6e3a', cursor: 'default' },
}
