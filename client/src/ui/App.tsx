import { useState, useEffect, useRef } from 'react'
import { AuthScreen } from './AuthScreen.js'
import { getMe, logout, type AuthUser } from '../lib/auth.js'
import { GameRenderer } from '../game/renderer.js'

export function App() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [authChecked, setAuthChecked] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getMe().then((u) => { setUser(u); setAuthChecked(true) })
  }, [])

  useEffect(() => {
    if (!user || !canvasRef.current) return
    const renderer = new GameRenderer(canvasRef.current)
    return () => renderer.destroy()
  }, [user])

  if (!authChecked) return null
  if (!user) return <AuthScreen onAuth={setUser} />

  return (
    <div style={{ position: 'relative', width: '100%', height: '100dvh' }}>
      <div ref={canvasRef} style={{ width: '100%', height: '100%' }} />
      <button
        onClick={async () => { await logout(); setUser(null) }}
        style={{ position: 'absolute', top: 12, right: 12, zIndex: 10, fontSize: 12, opacity: 0.6 }}
      >
        Sign out
      </button>
    </div>
  )
}
