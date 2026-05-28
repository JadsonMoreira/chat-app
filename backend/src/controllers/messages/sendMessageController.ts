import { FastifyReply, FastifyRequest } from "fastify";
import { sendMessage } from "../../services/messages/sendMessage";
import { getIO } from "../../socket/socket";

const sendMessageController = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { userId} = request.user as { userId: string }
        const {chatId} = request.params as { chatId: string }
        const { content} = request.body as { content: string }

        await sendMessage(userId, chatId, content)

         const io = getIO()
         io.emit("message:new", content)

        return reply.status(201).send({message: 'Mensagem enviada com sucesso'})
    } catch (error: any) {
        console.log('sendMessageController - error', error)
        return reply.status(400).send({
            statusCode: 400,
            message: error.message,
        })
    }
}

export {sendMessageController};