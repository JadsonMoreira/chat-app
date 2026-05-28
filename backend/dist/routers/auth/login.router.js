"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerLoginRouter = void 0;
const loginController_1 = require("../../controllers/auth/loginController");
const responseFailSchema_1 = require("../../utils/responseFailSchema");
const registerLoginRouter = async (app) => {
    app.post('/login', {
        schema: {
            tags: ['Auth'],
            summary: 'Realiza login do usuario',
            body: {
                type: 'object',
                required: ['username', 'password'],
                properties: {
                    username: { type: 'string' },
                    password: { type: 'string' },
                },
            },
            response: {
                200: {
                    type: 'object',
                    properties: {
                        message: { type: 'string' },
                        token: { type: 'string' },
                    },
                },
                "4xx": responseFailSchema_1.responseFailSchema
            },
        },
    }, (request, reply) => (0, loginController_1.logInController)(request, reply, app));
};
exports.registerLoginRouter = registerLoginRouter;
