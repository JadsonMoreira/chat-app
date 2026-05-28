"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectMongoDbDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectMongoDbDatabase = async () => {
    try {
        const mongoUrl = process.env.MONGODB_URL;
        if (!mongoUrl) {
            throw new Error('MONGODB_URL nao definida no arquivo .env');
        }
        console.log(`
            Starting mongodb connection`);
        mongoose_1.default.set('strictQuery', false);
        await mongoose_1.default.connect(mongoUrl, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 5000,
        });
        console.log(`
            Created mongodb connection with success`);
    }
    catch (error) {
        throw new Error('Problems to connect to mongodb database. ' +
            `Error: ${error.message}`);
    }
};
exports.connectMongoDbDatabase = connectMongoDbDatabase;
