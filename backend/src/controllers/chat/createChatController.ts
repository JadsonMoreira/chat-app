import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { createUser } from "../../services/user/createUser";
import { createChat } from "../../services/chat/createChat";

const createChatController = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { userId} = request.user as {
            userId: string
        }

        const { participantId, content} = request.body as {
            participantId: string
            content: string
        }

        await createChat(userId, participantId, content)

        return reply.status(201).send({message: 'Chat criado com sucesso'})
    } catch (error: any) {
        console.log('createChatController - error', error)
        return reply.status(400).send({
            statusCode: 400,
            message: error.message,
        })
    }
}

export {createChatController};