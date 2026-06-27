import { useEffect } from 'react'

interface Props {
  turn: number
  summary: string
  onDismiss: () => void
}

export function ResolutionOverlay({ turn, summary, onDismiss }: Props) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 4000)
    return () => clearTimeout(t)
  }, [onDismiss])

  return (
    <div style={s.overlay} onClick={onDismiss}>
      <div style={s.card}>
        <p style={s.label}>Turn {turn} resolved</p>
        <p style={s.summary}>{summary}</p>
        <p style={s.hint}>Tap to continue</p>
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 30 },
  card: { background: '#1a1a1a', border: '1px solid #2a2a2a', borderRadius: 16, padding: '32px 40px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 12 },
  label: { fontSize: 13, color: '#666', textTransform: 'uppercase', letterSpacing: 1.5 },
  summary: { fontSize: 20, fontWeight: 700 },
  hint: { fontSize: 12, color: '#444', marginTop: 8 },
}
