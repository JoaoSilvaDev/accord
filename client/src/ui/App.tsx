import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { AuthProvider, useAuth } from '../lib/AuthContext.js'
import { AuthScreen } from './AuthScreen.js'
import { HomeScreen } from './screens/HomeScreen.js'
import { LobbyScreen } from './screens/LobbyScreen.js'
import { GameScreen } from './screens/GameScreen.js'
import { EndScreen } from './screens/EndScreen.js'

function ProtectedLayout() {
  const { user, checked } = useAuth()
  if (!checked) return null
  if (!user) return <Navigate to="/auth" replace />
  return <Outlet />
}

function AuthLayout() {
  const { user, checked } = useAuth()
  if (!checked) return null
  if (user) return <Navigate to="/" replace />
  return <Outlet />
}

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/auth" element={<AuthScreen />} />
          </Route>
          <Route element={<ProtectedLayout />}>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/lobby/:code" element={<LobbyScreen />} />
            <Route path="/game/:id" element={<GameScreen />} />
            <Route path="/game/:id/end" element={<EndScreen />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
