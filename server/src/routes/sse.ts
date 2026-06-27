import type { FastifyPluginAsync } from 'fastify'
import { addConnection, removeConnection } from '../sse/index.js'

export const sseRoutes: FastifyPluginAsync = async (app) => {
  app.get('/:lobbyId', async (req, reply) => {
    const { lobbyId } = req.params as { lobbyId: string }

    reply.raw.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'X-Accel-Buffering': 'no', // disable nginx buffering
    })

    reply.raw.write('retry: 3000\n\n') // client reconnects after 3s if connection drops

    addConnection(lobbyId, reply)

    req.raw.on('close', () => {
      removeConnection(lobbyId, reply)
    })

    // Keep connection alive with a comment every 30s
    const heartbeat = setInterval(() => {
      reply.raw.write(': heartbeat\n\n')
    }, 30_000)

    req.raw.on('close', () => clearInterval(heartbeat))
  })
}
