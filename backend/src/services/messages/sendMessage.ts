import { chatDb } from "../../collections/chatsDb"
import { messageDb } from "../../collections/messagesDB"

const sendMessage = async (senderId: string, chatId: string, content: string) => {
        try {
            const nowMinus3Hours = new Date(Date.now() - 3 * 60 * 60 * 1000)
            if (!content) {
                throw new Error("O conteúdo da mensagem não pode ser vazio")
            }

            const chat = await chatDb.findById(chatId)

            if (!chat) {
                throw new Error("Chat não encontrado")
            }



            const message = await messageDb.create({
                chatId,
                senderId,
                content,
                read: false,
                createdAt: nowMinus3Hours,
            })


            if (!chat.users.includes(senderId as any)) {
                chat.users.push(senderId as any)
            }
            
            chat.lastMessage = content
            chat.updatedAt = nowMinus3Hours
            await chat.save()

             return message

        } catch (error: any) {
            throw new Error(error.message)
        }
}

export {sendMessage}