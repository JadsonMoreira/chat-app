import { api } from "./api";

const getChatGlobal = async () => {

    const response = await api.get(`/chat`);
    return response.data;
}


export {getChatGlobal}