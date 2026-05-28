"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logInController = void 0;
const login_1 = require("../../services/auth/login");
const logInController = async (request, reply, fastify) => {
    try {
        const { username, password } = request.body;
        const jwtToken = await (0, login_1.login)(username, password, fastify);
        reply.status(200).send({
            message: 'Logado com sucesso',
            token: jwtToken
        });
    }
    catch (error) {
        console.log('logInController - error', error);
        reply.status(error.statusCode ? error.statusCode : 401)
            .send(error.formatToSend());
    }
};
exports.logInController = logInController;
