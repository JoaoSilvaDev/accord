import 'dotenv/config'
import Fastify from 'fastify'
import cors from '@fastify/cors'
import cookie from '@fastify/cookie'
import websocket from '@fastify/websocket'
import rateLimit from '@fastify/rate-limit'
import { authRoutes } from './routes/auth.js'

const app = Fastify({ logger: true })

await app.register(cors, {
  origin: process.env['CLIENT_URL'] ?? 'http://localhost:5173',
  credentials: true,
})

await app.register(cookie)
await app.register(websocket)
await app.register(rateLimit, {
  global: false,
})

await app.register(authRoutes, { prefix: '/auth' })

app.get('/health', async () => ({ ok: true }))

const port = Number(process.env['PORT'] ?? 3000)
await app.listen({ port, host: '0.0.0.0' })
