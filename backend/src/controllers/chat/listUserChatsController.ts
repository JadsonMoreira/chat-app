import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { listUserChats } from "../../services/chat/listUserChats";

const listUserChatsController = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { userId} = request.user as {
            userId: string
        }

       const chats = await listUserChats(userId)

        if (chats.length === 0) {
            return reply.status(200).send({message: 'Nenhum chat encontrado para este usuário', chats})
        }

        return reply.status(200).send({message: 'Chats encontrados com sucesso', chats})
    } catch (error: any) {
        console.log('listUserChatsController - error', error)
        return reply.status(400).send({
            statusCode: 400,
            message: error.message,
        })
    }
}

export {listUserChatsController};