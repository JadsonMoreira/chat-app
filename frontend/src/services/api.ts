import axios from "axios";

const api = axios.create({
  baseURL: "https://chat-app-production-7cfc.up.railway.app",
  // baseURL: "http://localhost:3000",
});

api.interceptors.request.use((config) => {
  const session = sessionStorage.getItem("cs");

  if (!session) {
    return config;
  }

  try {
    const parsedSession = JSON.parse(session) as { accessToken?: string };

    if (parsedSession.accessToken) {
      config.headers.Authorization = parsedSession.accessToken;
    }
  } catch {
    // Ignora sessão malformada e segue sem header de autenticação.
  }

  return config;
});

export { api };