import { io, Socket } from "socket.io-client";

const SOCKET_URL = "https://chat-app-production-7cfc.up.railway.app";
// const SOCKET_URL = "http://localhost:3000";

let socket: Socket | null = null;

function connectSocket(accessToken: string): Socket {
  if (socket?.connected) {
    return socket;
  }

  if (socket) {
    socket.disconnect();
  }

  socket = io(SOCKET_URL, {
    transports: ["websocket"],
    auth: { token: accessToken },
  });

  return socket;
}

function disconnectSocket() {
  if (!socket) {
    return;
  }

  socket.disconnect();
  socket = null;
}

function getSocket(): Socket | null {
  return socket;
}

export { connectSocket, disconnectSocket, getSocket, socket };
