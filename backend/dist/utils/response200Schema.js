"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.response200Schema = void 0;
const response200Schema = (data) => ({
    type: 'object',
    properties: {
        correlationId: { type: 'string' },
        messageCode: { type: 'number' },
        message: { type: 'string' },
        dateTime: { type: 'string' },
        data: data ? { ...data } : false
    }
});
exports.response200Schema = response200Schema;
