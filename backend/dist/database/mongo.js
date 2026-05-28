"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToMongo = connectToMongo;
exports.getMongoDb = getMongoDb;
exports.closeMongoConnection = closeMongoConnection;
const mongodb_1 = require("mongodb");
let client = null;
let database = null;
async function connectToMongo() {
    const mongoUri = process.env.MONGODB_URI;
    const mongoDbName = process.env.MONGODB_DB_NAME ?? "chat-app";
    if (!mongoUri) {
        throw new Error("MONGODB_URI nao foi definido no ambiente.");
    }
    client = new mongodb_1.MongoClient(mongoUri);
    await client.connect();
    database = client.db(mongoDbName);
    console.log(`MongoDB conectado no banco: ${mongoDbName}`);
    return database;
}
function getMongoDb() {
    if (!database) {
        throw new Error("MongoDB ainda nao foi conectado.");
    }
    return database;
}
async function closeMongoConnection() {
    if (client) {
        await client.close();
        client = null;
        database = null;
    }
}
