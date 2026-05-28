"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const database_config_1 = require("../configs/database.config");
const usersDB_1 = require("../collections/usersDB");
(0, dotenv_1.config)();
const seedFakeUser = async () => {
    await (0, database_config_1.connectMongoDbDatabase)();
    const fakeUserData = {
        name: 'Jadson Teste',
        email: 'jadson.fake@chatapp.dev',
        status: 'online',
        authentication: {
            login: 'jadson-teste',
            password: '123456',
        },
        socketId: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSeenAt: new Date(),
    };
    const existingUser = await usersDB_1.userModel.findOne({ email: fakeUserData.email });
    if (!existingUser) {
        const createdUser = await usersDB_1.userModel.create(fakeUserData);
        console.log('Usuario fake criado com sucesso:', {
            id: createdUser._id,
            email: createdUser.email,
            login: createdUser.authentication?.login ?? '',
        });
        return;
    }
    if (!existingUser.authentication) {
        ;
        existingUser.authentication = {
            login: '',
            password: '',
        };
    }
    existingUser.name = fakeUserData.name;
    existingUser.status = fakeUserData.status;
    existingUser.authentication.login = fakeUserData.authentication.login;
    existingUser.authentication.password = fakeUserData.authentication.password;
    existingUser.lastSeenAt = new Date();
    await existingUser.save();
    console.log('Usuario fake atualizado com sucesso:', {
        id: existingUser._id,
        email: existingUser.email,
        login: existingUser.authentication?.login ?? '',
    });
};
seedFakeUser()
    .then(() => process.exit(0))
    .catch((error) => {
    console.error('Erro ao rodar seed de usuario fake:', error);
    process.exit(1);
});
