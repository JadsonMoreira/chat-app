"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDb = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = require("bcrypt");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    status: { type: String, default: 'offline' },
    authentication: {
        password: { type: String, required: true },
        login: { type: String, required: true },
    },
    socketId: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    lastSeenAt: { type: Date, default: Date.now }
});
userSchema.methods.comparePassword = function (password) {
    return new Promise((resolve, reject) => {
        (0, bcrypt_1.compare)(password, this.authentication.password, (err, isMatch) => {
            if (err)
                return reject(err);
            resolve(isMatch);
        });
    });
};
userSchema.pre('save', function () {
    // eslint-disable-next-line no-invalid-this
    const user = this;
    return new Promise((resolve, reject) => {
        if (!user.isModified('authentication.password'))
            return resolve();
        if (!user.authentication) {
            return reject(new Error('no authentication info'));
        }
        (0, bcrypt_1.genSalt)(10, function (err, salt) {
            if (err)
                return reject(err);
            (0, bcrypt_1.hash)(user.authentication.password, salt, function (err, hash) {
                if (err)
                    return reject(err);
                user.authentication.password = hash;
                return resolve();
            });
        });
    });
});
const userDb = (0, mongoose_1.model)('users', userSchema);
exports.userDb = userDb;
