import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { getMe, logout as logoutApi, type AuthUser } from './auth.js'

interface AuthContextValue {
  user: AuthUser | null
  checked: boolean
  setUser: (user: AuthUser | null) => void
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    getMe().then((u) => { setUser(u); setChecked(true) })
  }, [])

  async function logout() {
    await logoutApi()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, checked, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
