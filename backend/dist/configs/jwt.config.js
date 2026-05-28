"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerJwtConfig = void 0;
const jwt_1 = __importDefault(require("@fastify/jwt"));
const registerJwtConfig = async (app) => {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error('JWT_SECRET nao definida no arquivo .env');
    }
    await app.register(jwt_1.default, {
        secret: jwtSecret,
    });
};
exports.registerJwtConfig = registerJwtConfig;
