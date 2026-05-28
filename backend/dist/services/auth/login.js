"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const usersDB_1 = require("../../collections/usersDB");
const login = async (userName, password, fastify) => {
    try {
        if (!userName || !password) {
            throw new Error('login e/ou senha invalidos(1)');
        }
        const user = await usersDB_1.userDb.findOne({ 'authentication.login': userName });
        if (!user) {
            throw new Error('login e/ou senha invalidos(2)');
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            throw new Error('login e/ou senha invalidos(3)');
        }
        else {
            const jwtToken = fastify.jwt.sign({ userId: user._id.toString(), name: user.name, email: user.email, socketId: user.socketId }, { expiresIn: '1h' });
            return 'Bearer ' + jwtToken;
        }
    }
    catch (error) {
        throw new Error(error.message);
    }
};
exports.login = login;
