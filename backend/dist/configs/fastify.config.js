"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerFastifyConfigs = void 0;
const cors_1 = __importDefault(require("@fastify/cors"));
const jwt_config_1 = require("./jwt.config");
const swagger_config_1 = require("./swagger.config");
const registerFastifyConfigs = async (app) => {
    await app.register(cors_1.default, { origin: '*' });
    await (0, jwt_config_1.registerJwtConfig)(app);
    await (0, swagger_config_1.registerSwaggerConfig)(app);
};
exports.registerFastifyConfigs = registerFastifyConfigs;
