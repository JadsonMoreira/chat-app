import { api } from "./api";

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginApiResponse {
  message: string;
  accessToken: string;
}

interface JwtPayload {
  userId: string;
  name: string;
  email: string;
}

interface SessionUser {
  id: string;
  name: string;
  email: string;
  accessToken: string;
  message: string;
}

function decodeBase64Url(payload: string): string {
  const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - (normalized.length % 4)) % 4);
  return atob(`${normalized}${padding}`);
}

function parseJwt(accessToken: string): JwtPayload | null {
  try {
    const token = accessToken.startsWith("Bearer ") ? accessToken.slice(7) : accessToken;
    const payload = token.split(".")[1];

    if (!payload) {
      return null;
    }

    const decoded = decodeBase64Url(payload);
    return JSON.parse(decoded) as JwtPayload;
  } catch {
    return null;
  }
}

 const  login = async (data: LoginRequest): Promise<SessionUser> => {
  const response = await api.post("/login", data);
  const responseData = response.data as LoginApiResponse;
  const payload = parseJwt(responseData.accessToken);

  if (!payload) {
    throw new Error("Token de autenticação inválido");
  }

  return {
    id: payload.userId,
    name: payload.name,
    email: payload.email,
    accessToken: responseData.accessToken,
    message: responseData.message,
  };
}

export {login};