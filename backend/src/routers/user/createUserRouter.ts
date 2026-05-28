import type { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { logInController } from '../../controllers/auth/loginController'
import { responseFailSchema } from '../../utils/responseFailSchema'
import { createUserController } from '../../controllers/user/createUserController'

const createUserRouter = async (app: FastifyInstance) => {

  const opts: RouteShorthandOptions = {
       schema: {
        tags: ['User'],
        summary: 'Cria um novo usuário',
        body: {
          type: 'object',
          required: ['username', 'password', 'email'],
          properties: {
            username: { type: 'string' },
            password: { type: 'string' },
            email: { type: 'string' },
          },
        },
        response: {
          201: {
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
          400: responseFailSchema,
        },
      },
  }

  app.post('/user/create', opts, createUserController as any)
}

export { createUserRouter }
