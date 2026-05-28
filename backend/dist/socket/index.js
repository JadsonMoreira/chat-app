"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupSocket = setupSocket;
const socket_io_1 = require("socket.io");
function setupSocket(httpServer) {
    const io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: "*",
        },
    });
    io.on("connection", (socket) => {
        console.log(`Usuario conectado: ${socket.id}`);
        socket.on("send_message", (message) => {
            console.log("Mensagem recebida:", message);
            io.emit("receive_message", message);
        });
        socket.on("disconnect", () => {
            console.log(`Usuario saiu: ${socket.id}`);
        });
    });
    return io;
}
