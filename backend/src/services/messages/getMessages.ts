import { messageDb } from "../../collections/messagesDB"

const getMessages = async (chatId: string) => {
    try {

        const messages = await messageDb.findById(chatId).sort({ createdAt: 1 })

        return messages

    } catch (error: any) {
        throw new Error(error.message)
    }
}

export {getMessages}