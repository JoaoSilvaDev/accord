import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login, register } from '../lib/auth.js'
import { useAuth } from '../lib/AuthContext.js'

export function AuthScreen() {
  const { setUser } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const user = mode === 'login'
        ? await login(username, password)
        : await register(username, password)
      setUser(user)
      navigate('/')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={s.container}>
      <h1 style={s.logo}>Accord</h1>
      <h2 style={s.heading}>{mode === 'login' ? 'Sign in' : 'Create account'}</h2>

      <form onSubmit={handleSubmit} style={s.form}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
          style={s.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          minLength={8}
          required
          style={s.input}
        />
        {error && <p style={s.error}>{error}</p>}
        <button type="submit" disabled={loading} style={s.submitBtn}>
          {loading ? '...' : mode === 'login' ? 'Sign in' : 'Register'}
        </button>
      </form>

      <button
        onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(null) }}
        style={s.switchBtn}
      >
        {mode === 'login' ? "Don't have an account? Register" : 'Already have an account? Sign in'}
      </button>
    </div>
  )
}

const s: Record<string, React.CSSProperties> = {
  container: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100dvh', gap: 8, padding: 24 },
  logo: { fontSize: 32, fontWeight: 800, letterSpacing: 2, marginBottom: 8 },
  heading: { fontSize: 18, fontWeight: 400, color: '#aaa', marginBottom: 16 },
  form: { display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 300 },
  input: { padding: '12px 14px', borderRadius: 8, border: '1px solid #333', background: '#1a1a1a', color: '#f0f0f0', fontSize: 15, minHeight: 44 },
  error: { color: '#f66', fontSize: 13 },
  submitBtn: { padding: '12px', borderRadius: 8, background: '#4caf50', color: '#fff', fontWeight: 600, fontSize: 15, border: 'none', cursor: 'pointer', minHeight: 44, marginTop: 4 },
  switchBtn: { background: 'none', border: 'none', color: '#666', fontSize: 13, cursor: 'pointer', marginTop: 12, textDecoration: 'underline' },
}
