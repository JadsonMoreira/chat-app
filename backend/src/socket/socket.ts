import { Server } from "socket.io"
import { FastifyInstance } from "fastify"

let io: Server

export function setupSocket(app: FastifyInstance) {
  io = new Server(app.server, {
    cors: {
      origin: "*"
    }
  })

  io.on("connection", (socket) => {
    console.log("Conectado:", socket.id)
  })
}

export function getIO() {
  if (!io) {
    throw new Error("Socket.io não inicializado")
  }

  return io
}