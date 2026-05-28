"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseFailSchema = void 0;
const responseFailSchema = {
    type: 'object',
    properties: {
        statusCode: { type: 'string' },
        message: { type: 'string' },
    },
};
exports.responseFailSchema = responseFailSchema;
