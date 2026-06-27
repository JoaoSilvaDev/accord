import { api } from './api.js'

export interface AuthUser {
  userId: string
  username: string | null
}

export async function getMe(): Promise<AuthUser | null> {
  try {
    return await api.get<AuthUser>('/auth/me')
  } catch {
    return null
  }
}

export async function register(username: string, password: string): Promise<AuthUser> {
  return api.post<AuthUser>('/auth/register', { username, password })
}

export async function login(username: string, password: string): Promise<AuthUser> {
  return api.post<AuthUser>('/auth/login', { username, password })
}

export async function logout(): Promise<void> {
  await api.post('/auth/logout', {})
}
