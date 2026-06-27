import type { FastifyPluginAsync, FastifyRequest } from 'fastify'
import { Argon2id } from 'oslo/password'
import { generateId } from 'lucia'
import { lucia } from '../auth/lucia.js'
import { db } from '../db/client.js'
import { users } from '../db/schema.js'
import { eq } from 'drizzle-orm'

declare module 'fastify' {
  interface FastifyRequest {
    userId?: string
  }
}

export const authRoutes: FastifyPluginAsync = async (app) => {
  // Validate session cookie on every request
  app.addHook('preHandler', async (req: FastifyRequest) => {
    const sessionId = req.cookies?.['auth_session'] ?? null
    if (!sessionId) return

    const { session, user } = await lucia.validateSession(sessionId)
    if (!session) return

    req.userId = user.id

    if (session.fresh) {
      const cookie = lucia.createSessionCookie(session.id)
      req.headers['set-cookie'] = [cookie.serialize()]
    }
  })

  app.post('/register', { config: { rateLimit: { max: 5, timeWindow: '1 minute' } } }, async (req, reply) => {
    const { username, password } = req.body as { username: string; password: string }

    if (!username || !password || password.length < 8) {
      return reply.code(400).send({ error: 'Invalid username or password' })
    }

    const existing = await db.select().from(users).where(eq(users.username, username))
    if (existing.length > 0) return reply.code(400).send({ error: 'Username taken' })

    const hashedPassword = await new Argon2id().hash(password)
    const userId = generateId(15)

    await db.insert(users).values({ id: userId, username, hashedPassword })

    const session = await lucia.createSession(userId, {})
    reply.header('Set-Cookie', lucia.createSessionCookie(session.id).serialize())

    return { userId, username }
  })

  app.post('/login', { config: { rateLimit: { max: 5, timeWindow: '1 minute' } } }, async (req, reply) => {
    const { username, password } = req.body as { username: string; password: string }

    if (!username || !password || password.length < 8) {
      return reply.code(400).send({ error: 'Invalid username or password' })
    }

    const [user] = await db.select().from(users).where(eq(users.username, username))
    if (!user?.hashedPassword) return reply.code(401).send({ error: 'Invalid credentials' })

    const valid = await new Argon2id().verify(user.hashedPassword, password)
    if (!valid) return reply.code(401).send({ error: 'Invalid credentials' })

    const session = await lucia.createSession(user.id, {})
    reply.header('Set-Cookie', lucia.createSessionCookie(session.id).serialize())

    return { userId: user.id, username: user.username }
  })

  app.post('/logout', async (req, reply) => {
    const sessionId = req.cookies?.['auth_session'] ?? null
    if (sessionId) await lucia.invalidateSession(sessionId)
    reply.header('Set-Cookie', lucia.createBlankSessionCookie().serialize())
    return { ok: true }
  })

  app.get('/me', async (req: FastifyRequest, reply) => {
    if (!req.userId) return reply.code(401).send({ error: 'Unauthorized' })
    const [user] = await db.select().from(users).where(eq(users.id, req.userId))
    return { userId: user?.id, username: user?.username }
  })
}
