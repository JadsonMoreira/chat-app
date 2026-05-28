import {FastifyInstance} from 'fastify';
import { loginRouter } from './auth/loginRouter';
import { createUserRouter } from './user/createUserRouter';
import { createChatRouter } from './chat/createChatRouter';
import { listUserChatsRouter } from './chat/listUserChatsRouter';
import { findChatRouter } from './chat/findChatRouter';
import { sendMessageRouter } from './messages/sendMessageRouter';

const loadRoutes = async (fastify: FastifyInstance) => {
    fastify.register(loginRouter);
    fastify.register(createUserRouter);
    fastify.register(createChatRouter);
    fastify.register(listUserChatsRouter);
    fastify.register(findChatRouter);
    fastify.register(sendMessageRouter);
}

export {loadRoutes};