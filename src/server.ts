import Fastify from 'fastify';
import { todoRoutes } from './routes/todoRoutes';

const fastify = Fastify({ logger: true });

fastify.register(todoRoutes, { prefix: '/v1' });

const start = async () => {
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  try {
    await fastify.listen({ port: port, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
