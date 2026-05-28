import cors from '@fastify/cors'
import type { FastifyInstance } from 'fastify'
import { registerJwtConfig } from './jwt.config'
import { registerSwaggerConfig } from './swagger.config'

const registerFastifyConfigs = async (app: FastifyInstance) => {
  await app.register(cors, { origin: '*' })
  await registerJwtConfig(app)
  await registerSwaggerConfig(app)
}

export { registerFastifyConfigs }
