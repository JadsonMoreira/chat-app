"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = void 0;
const login_1 = require("../../services/auth/login");
const loginController = async (request, reply) => {
    try {
        const { login, password } = request.body;
        if (!login || !password) {
            return reply
                .code(400)
                .send({ ok: false, message: 'login e password sao obrigatorios' });
        }
        const user = (await (0, login_1.login)(login, password));
        const token = request.server.jwt.sign({
            sub: String(user._id),
            login: user.authentication?.login,
            email: user.email,
        });
        return reply.code(200).send({
            ok: true,
            token,
            user: {
                id: String(user._id),
                name: user.name,
                email: user.email,
                status: user.status,
                login: user.authentication?.login,
            },
        });
    }
    catch (error) {
        const message = error?.message || 'Erro interno ao realizar login';
        if (message.includes('invalidos')) {
            return reply.code(401).send({ ok: false, message });
        }
        return reply.code(500).send({ ok: false, message });
    }
};
exports.loginController = loginController;
