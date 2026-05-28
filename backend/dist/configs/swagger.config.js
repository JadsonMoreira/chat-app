"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSwaggerConfig = void 0;
const swagger_1 = __importDefault(require("@fastify/swagger"));
const swagger_ui_1 = __importDefault(require("@fastify/swagger-ui"));
const registerSwaggerConfig = async (app) => {
    await app.register(swagger_1.default, {
        openapi: {
            info: {
                title: 'Chat App API',
                description: 'Documentacao da API do chat em tempo real',
                version: '1.0.0',
            },
            servers: [
                {
                    url: `http://localhost:${process.env.PORT || 3000}`,
                    description: 'Servidor local',
                },
            ],
        },
    });
    await app.register(swagger_ui_1.default, {
        routePrefix: '/docs',
    });
};
exports.registerSwaggerConfig = registerSwaggerConfig;
