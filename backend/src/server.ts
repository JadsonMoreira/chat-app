import { config } from 'dotenv'
import Fastify from "fastify";
import { connectMongoDbDatabase } from "./configs/database.config";
import { registerFastifyConfigs } from "./configs/fastify.config";
import { loadRoutes } from './routers';
  // import { io } from "./socket/index";
  import { Server } from "socket.io"
  import { io } from "socket.io-client"
import { setupSocket } from './socket/socket';

const start = async () => {
  config()

  const app = Fastify({
    logger: true,
  });

  await connectMongoDbDatabase();
  await registerFastifyConfigs(app);
  await loadRoutes(app);

  setupSocket(app)

  await app.listen({
    port: Number(process.env.PORT) || 3000,
    host: "0.0.0.0",
  });

  console.log(`Servidor rodando em http://localhost:${process.env.PORT || 3000}`);
  console.log(`Swagger em http://localhost:${process.env.PORT || 3000}/docs`);
}

start().catch((error: any) => {
  console.log(error, 'ERROR')
  console.log('Fail to start server')
})