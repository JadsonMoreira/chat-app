"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const fastify_1 = __importDefault(require("fastify"));
const socket_1 = require("./socket");
const database_config_1 = require("./configs/database.config");
const fastify_config_1 = require("./configs/fastify.config");
const login_router_1 = require("./routers/auth/login.router");
const start = async () => {
    (0, dotenv_1.config)();
    const app = (0, fastify_1.default)({
        logger: true,
    });
    await (0, database_config_1.connectMongoDbDatabase)();
    // await userDb.create({
    //   name: 'Jadson',
    //   email: 'jadson@example.com',
    //   authentication: {
    //     login: 'jadson',
    //     password: 'Teste123@'
    //   },
    // });
    await (0, fastify_config_1.registerFastifyConfigs)(app);
    await app.register(login_router_1.registerLoginRouter);
    (0, socket_1.setupSocket)(app.server);
    app.get("/", async () => {
        return { ok: true, message: "API + Socket.IO online" };
    });
    await app.listen({
        port: Number(process.env.PORT) || 3000,
        host: "0.0.0.0",
    });
    console.log(`Servidor rodando em http://localhost:${process.env.PORT || 3000}`);
    console.log(`Swagger em http://localhost:${process.env.PORT || 3000}/docs`);
};
start().catch((error) => {
    console.log(error, 'ERROR');
    console.log('Fail to start server');
});
