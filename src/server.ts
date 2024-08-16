import Fastify from 'fastify';
import { PrismaClient } from '@prisma/client';
import { CreateTodoBody, TodoParams, UpdateTodoBody } from './request-types';

const fastify = Fastify({ logger: true });
const prisma = new PrismaClient();

fastify.get('/todos', async (_req, _res) => {
  const todos = await prisma.todo.findMany();
  return todos;
});

fastify.post<{ Body: CreateTodoBody }>('/todos', async (req, _res) => {
  const { title } = req.body;
  const todo = await prisma.todo.create({
    data: {
      title,
    },
  });
  return todo;
});

fastify.put<{ Body: UpdateTodoBody; Params: TodoParams }>(
  '/todos/:id',
  async (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;

    try {
      const todo = await prisma.todo.update({
        where: { id: String(id) },
        data: { completed },
      });
      return todo;
    } catch (err) {
      res.status(404).send({ message: 'To-do not found' });
    }
  }
);

fastify.delete<{ Params: TodoParams }>('/todos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.todo.delete({
      where: { id: String(id) },
    });
    return { message: 'To-do deleted' };
  } catch (err) {
    res.status(404).send({ message: 'To-do not found' });
  }
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
