import type { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { logInController } from '../../controllers/auth/loginController'
import { responseFailSchema } from '../../utils/responseFailSchema'

const loginRouter = async (app: FastifyInstance) => {

  const opts: RouteShorthandOptions = {
       schema: {
        tags: ['Auth'],
        summary: 'Realiza login do usuário',
        body: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: { type: 'string' },
            password: { type: 'string' },
          },
        },
        response: {
          200: {
            type: 'object',
            properties: {
              message: { type: 'string' },
              accessToken: { type: 'string' },
            },
          },
          401: responseFailSchema,
        },
      },
  }

  app.post('/login', opts, logInController as any)
}

export { loginRouter }
