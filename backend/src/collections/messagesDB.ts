import { Schema, model } from "mongoose";

const messageSchema = new Schema({
    chatId: { type: Schema.Types.ObjectId, ref: 'chats' },
    senderId: { type: Schema.Types.ObjectId, ref: 'users' },
    content: { type: String },
    read: { type: Boolean, default: false },
    createdAt: { type: Date }
})

const messageDb = model('messages', messageSchema)

export { messageDb }