import type { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { responseFailSchema } from '../../utils/responseFailSchema'
import { findChatController } from '../../controllers/chat/findChatController'
import { sendMessageController } from '../../controllers/messages/sendMessageController'

const sendMessageRouter = async (app: FastifyInstance) => {

  const opts: RouteShorthandOptions = {
       preHandler: async (request) => {
        await request.jwtVerify()
       },
       schema: {
        tags: ['Message'],
        summary: 'Envia uma mensagem para um chat específico',
        security: [{ bearerAuth: [] }],
        params: {
          type: 'object',
          required: ['chatId'],
          properties: {
            chatId: { type: 'string' },
          },
        },
        body: {
          type: 'object',
          required: ['content'],
          properties: {
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

      },
  }

  app.post('/message/send/chat/:chatId', opts, sendMessageController as any)
}

export { sendMessageRouter }
