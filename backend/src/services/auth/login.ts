import { userDb } from "../../collections/usersDB"
import { FastifyInstance } from "fastify";

const login = async (userName: string, password: string, fastify: FastifyInstance ) => {
    try {

        if (!userName || !password) {
            throw new Error('login e/ou senha invalidos(1)')
        }

        const user = await userDb.findOne({ 'authentication.login': userName })

        if (!user) {
            throw new Error('login e/ou senha invalidos(2)')
        }

        const isMatch = await user.comparePassword!(password)

        if (!isMatch) {
            throw new Error('login e/ou senha invalidos(3)')
        } else {
            const jwtToken = fastify.jwt.sign({ userId: user._id.toString(), name: user.name, email: user.email, socketId: user.socketId },
             { expiresIn: '1h' })
             return jwtToken
        }


    } catch (error: any) {
        throw new Error(error.message)
    }
}

export {login}