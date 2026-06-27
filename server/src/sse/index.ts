import type { FastifyReply } from 'fastify'
import type { SSEEvent } from '@accord/shared'

// Registry: lobbyId → set of open SSE connections
const connections = new Map<string, Set<FastifyReply>>()

export function addConnection(lobbyId: string, reply: FastifyReply) {
  if (!connections.has(lobbyId)) connections.set(lobbyId, new Set())
  connections.get(lobbyId)!.add(reply)
}

export function removeConnection(lobbyId: string, reply: FastifyReply) {
  connections.get(lobbyId)?.delete(reply)
}

export function broadcast(lobbyId: string, event: SSEEvent) {
  const clients = connections.get(lobbyId)
  if (!clients?.size) return
  const data = `data: ${JSON.stringify(event)}\n\n`
  for (const reply of clients) {
    reply.raw.write(data)
  }
}
