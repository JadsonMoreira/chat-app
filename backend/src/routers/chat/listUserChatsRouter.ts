import type { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { responseFailSchema } from '../../utils/responseFailSchema'
import { listUserChatsController } from '../../controllers/chat/listUserChatsController'

const listUserChatsRouter = async (app: FastifyInstance) => {

  const opts: RouteShorthandOptions = {
       preHandler: async (request) => {
        await request.jwtVerify()
       },
       schema: {
        tags: ['Chat'],
        summary: 'Busca os chats do usuário',
        response: {
          200: {
            type: 'object',
            properties: {
              message: { type: 'string' },
              chats: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    _id: { type: 'string' },
                    lastMessage: { type: 'string' },
                    updatedAt: { type: 'string' },
                    users: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          name: { type: 'string' },
                          email: { type: 'string' },
                        },
                      },
                    }
                  },
                },
                  }
            },
          },
          401: responseFailSchema,
          400: responseFailSchema,
        },
        security: [{ bearerAuth: [] }],
      },
  }

  app.get('/chat/list', opts, listUserChatsController as any)
}

export { listUserChatsRouter }
