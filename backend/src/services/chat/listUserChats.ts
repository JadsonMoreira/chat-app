import { chatDb } from "../../collections/chatsDb"

const listUserChats = async (userId: string) => {
    try {

        const chats = await chatDb.find({ users: userId }).sort({ updatedAt: -1 }).populate('users', 'name email socketId')

        if (!chats || chats.length === 0) {
            return []
        }

        return chats
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export { listUserChats }