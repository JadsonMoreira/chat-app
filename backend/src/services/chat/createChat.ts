import { chatDb } from "../../collections/chatsDb"
import { sendMessage } from "../messages/sendMessage"

const createChat = async (userId: string, participantId: string, message: string) => {
 try {

    if (userId === participantId) {
        throw new Error("Você não pode criar chat consigo mesmo")
    }

    const existingChat = await chatDb.findOne({
    users: {
      $all: [userId, participantId]
    }
  })

  if (existingChat) {
    return existingChat
  }

  const chat = await chatDb.create({
    users: [userId, participantId],
    lastMessage: message,
  })

  await sendMessage(userId, chat._id.toString(), message)

    return chat
 } catch (error: any) {
    throw new Error(error.message)
 }
}

export { createChat }