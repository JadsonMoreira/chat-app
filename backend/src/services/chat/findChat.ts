import { chatDb } from "../../collections/chatsDb"
import { messageDb } from "../../collections/messagesDB"

const findChat = async (usersId: string) => {
        try {

            const chatId = '6a123be1dad3b192f12a944c'

            const chat = await chatDb.findById(chatId).populate('users', 'name email socketId')

            if (!chat) {
                throw new Error("Chat não encontrado")
            }

            const messageChat = await messageDb.find({ chatId: chatId }).populate('senderId', 'name email socketId').sort({ createdAt: 1 })
            return { chat, messages: messageChat }

        } catch (error: any) {
           throw new Error(error.message) 
       }
}

export {findChat}