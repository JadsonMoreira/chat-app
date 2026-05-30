import { userDb } from "../../collections/usersDB"

const createUser = async (name: string, email: string, password: string) => {
    try {

        const findUser = await userDb.findOne({ email })

        if (findUser) {
            throw new Error('Usuario já existe, por favor escolha outro email')
        }

        const user = await userDb.create({
            name,
            email,
            authentication: {
                login: email,
                password
            }
        })

    } catch (error: any) {
        throw new Error(error.message)
    }
}

export {createUser}