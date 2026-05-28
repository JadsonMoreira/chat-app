import { FastifyReply, FastifyRequest } from "fastify";
import { findChat } from "../../services/chat/findChat";

const findChatController = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { userId} = request.user as {
            userId: string
        }
        const { chatId } = request.params as {
            chatId: string
        }

    const { chat, messages } = await findChat(userId, chatId)

     return reply.status(200).send({ message: 'Chat encontrado com sucesso', chat, messages })
    } catch (error: any) {
        console.log('findChatController - error', error)
        return reply.status(400).send({
            statusCode: 400,
            message: error.message,
        })
    }
}

export {findChatController};