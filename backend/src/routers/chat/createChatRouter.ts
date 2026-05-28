import type { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { responseFailSchema } from '../../utils/responseFailSchema'
import { createChatController } from '../../controllers/chat/createChatController'

const createChatRouter = async (app: FastifyInstance) => {

  const opts: RouteShorthandOptions = {
       preHandler: async (request) => {
        await request.jwtVerify()
       },
       schema: {
        tags: ['Chat'],
        summary: 'Cria um novo chat',
        body: {
          type: 'object',
          required: ['participantId', 'content'],
          properties: {
            participantId: { type: 'string' },
              content: { type: 'string' },
          },
        },
        response: {
          201: {
            type: 'object',
            properties: {
              message: { type: 'string' },
            },
          },
          401: responseFailSchema,
          400: responseFailSchema,
        },
        security: [{ bearerAuth: [] }],
      },
  }

  app.post('/chat/create', opts, createChatController as any)
}

export { createChatRouter }
