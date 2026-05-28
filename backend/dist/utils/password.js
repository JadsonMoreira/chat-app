"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = require("bcrypt");
const SALT_ROUNDS = 10;
const hashPassword = async (plainPassword) => {
    return (0, bcrypt_1.hash)(plainPassword, SALT_ROUNDS);
};
exports.hashPassword = hashPassword;
const comparePassword = async (plainPassword, hashedPassword) => {
    return (0, bcrypt_1.compare)(plainPassword, hashedPassword);
};
exports.comparePassword = comparePassword;
