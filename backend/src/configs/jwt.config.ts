import fastifyJwt from '@fastify/jwt'
import type { FastifyInstance } from 'fastify'

const registerJwtConfig = async (app: FastifyInstance) => {
  const jwtSecret = process.env.JWT_SECRET

  if (!jwtSecret) {
    throw new Error('JWT_SECRET nao definida no arquivo .env')
  }

  await app.register(fastifyJwt, {
    secret: jwtSecret,
  })
}

export { registerJwtConfig }
