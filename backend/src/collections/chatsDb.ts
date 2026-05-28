import { Schema, model } from "mongoose";

const chatSchema = new Schema({
    users: [{ type: Schema.Types.ObjectId, ref: 'users' }],
    lastMessage: { type: String },
    updatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now }
})

const chatDb = model('chats', chatSchema)

export { chatDb }