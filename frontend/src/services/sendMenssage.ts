import { api } from "./api";

const sendMenssage = async (chatId: string, message: string) => {
    const response = await api.post(`/message/send/chat/${chatId}`, { content: message });
    return response.data;
}

export {sendMenssage}