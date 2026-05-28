import type { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { responseFailSchema } from '../../utils/responseFailSchema'
import { findChatController } from '../../controllers/chat/findChatController'

const findChatRouter = async (app: FastifyInstance) => {

  const opts: RouteShorthandOptions = {
       preHandler: async (request) => {
        await request.jwtVerify()
       },
       schema: {
        tags: ['Chat'],
        summary: 'Busca um chat específico do usuário',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['chatId'],
          properties: {
            chatId: { type: 'string' },
          },
        },
        response: {
          200: {
            type: 'object',
            properties: {
              message: { type: 'string' },
              chat: {
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
                            socketId: { type: 'string' },
                          },
                        },
                      },
                    },
              },
              messages: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    senderId: {
                      type: 'object',
                      properties: {
                        name: { type: 'string' },
                        _id: { type: 'string' },
                      },
                    },
                    content: { type: 'string' },
                    createdAt: { type: 'string' },
                  },
                },
              },
            },
          },
          401: responseFailSchema,
          400: responseFailSchema,
        },

      },
  }

  app.get('/chat/:chatId', opts, findChatController as any)
}

export { findChatRouter }
