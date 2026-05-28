import { FastifyReply, FastifyRequest } from "fastify";
import { login } from "../../services/auth/login";

const logInController = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const { username, password } = request.body as {
            username: string
            password: string
        }

        const accessToken = await login(username, password, request.server)

        return reply.status(200).send({
            message: 'Usuário autenticado com sucesso',
            accessToken: `Bearer ${accessToken}`,
        })
    } catch (error: any) {
        console.log('logInController - error', error)
        return reply.status(401).send({
            statusCode: 401,
            message: error.message,
        })
    }
}

export {logInController};