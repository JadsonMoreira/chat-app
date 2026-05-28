import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { createUser } from "../../services/user/createUser";

const createUserController = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { username, email, password } = request.body as {
            username: string
            email: string
            password: string
        }

        await createUser(username, email, password)

        return reply.status(201).send({message: 'Usuário criado com sucesso'})
    } catch (error: any) {
        console.log('createUserController - error', error)
        return reply.status(400).send({
            statusCode: 400,
            message: error.message,
        })
    }
}

export {createUserController};