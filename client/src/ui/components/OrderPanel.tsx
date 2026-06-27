interface Props {
  territory: string
  onClose: () => void
}

const ORDERS = ['Move', 'Hold', 'Support', 'Strike'] as const

export function OrderPanel({ territory, onClose }: Props) {
  return (
    <div style={s.panel}>
      <div style={s.handle} onClick={onClose} />
      <div style={s.header}>
        <p style={s.name}>{territory}</p>
        <button onClick={onClose} style={s.closeBtn}>✕</button>
      </div>
      <div style={s.orders}>
        {ORDERS.map(order => (
          <button key={order} style={s.orderBtn}>
            <span style={s.orderName}>{order}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  panel: { position: 'fixed', bottom: 0, left: 0, right: 0, background: '#1a1a1a', borderRadius: '16px 16px 0 0', borderTop: '1px solid #2a2a2a', paddingBottom: 'env(safe-area-inset-bottom)', zIndex: 20 },
  handle: { width: 36, height: 4, background: '#333', borderRadius: 2, margin: '12px auto 0' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 20px' },
  name: { fontWeight: 700, fontSize: 16 },
  closeBtn: { background: 'none', border: 'none', color: '#666', fontSize: 18, cursor: 'pointer', minHeight: 44, minWidth: 44, padding: '0 4px' },
  orders: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, padding: '8px 20px 20px' },
  orderBtn: { padding: '16px 0', borderRadius: 10, background: '#242424', border: '1px solid #2a2a2a', color: '#f0f0f0', fontSize: 15, fontWeight: 600, cursor: 'pointer', minHeight: 56 },
  orderName: {},
}
