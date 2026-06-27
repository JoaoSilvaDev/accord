import { useState } from 'react'
import { login, register, type AuthUser } from '../lib/auth.js'

interface Props {
  onAuth: (user: AuthUser) => void
}

export function AuthScreen({ onAuth }: Props) {
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
      onAuth(user)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: 24 }}>{mode === 'login' ? 'Sign in' : 'Create account'}</h2>

      <form onSubmit={handleSubmit} style={formStyle}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          minLength={8}
          required
          style={inputStyle}
        />
        {error && <p style={{ color: '#f44', fontSize: 13 }}>{error}</p>}
        <button type="submit" disabled={loading} style={buttonStyle}>
          {loading ? '...' : mode === 'login' ? 'Sign in' : 'Register'}
        </button>
      </form>

      <button
        onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(null) }}
        style={switchStyle}
      >
        {mode === 'login' ? "Don't have an account? Register" : 'Already have an account? Sign in'}
      </button>
    </div>
  )
}

const containerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100dvh',
  gap: 8,
}

const formStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
  width: 260,
}

const inputStyle: React.CSSProperties = {
  padding: '8px 12px',
  borderRadius: 6,
  border: '1px solid #333',
  background: '#1a1a1a',
  color: '#f0f0f0',
  fontSize: 14,
}

const buttonStyle: React.CSSProperties = {
  padding: '8px 12px',
  borderRadius: 6,
  background: '#4caf50',
  color: '#fff',
  fontWeight: 600,
  fontSize: 14,
  border: 'none',
  cursor: 'pointer',
  marginTop: 4,
}

const switchStyle: React.CSSProperties = {
  background: 'none',
  border: 'none',
  color: '#888',
  fontSize: 13,
  cursor: 'pointer',
  marginTop: 8,
  textDecoration: 'underline',
}
