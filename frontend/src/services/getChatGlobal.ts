import { api } from "./api";

const getChatGlobal = async () => {

    const chatId = '6a123be1dad3b192f12a944c'

    const response = await api.get(`/chat/${chatId}`);
    return response.data;
}


export {getChatGlobal}