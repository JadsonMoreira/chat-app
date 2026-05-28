import { api } from "./api";

interface CreateUserPayload {
    username: string;
    password: string;
    email: string;
}

const createUserService = async (data: CreateUserPayload) => {
    const response = await api.post("/user/create", data);
    return response.data;
}

export { createUserService };