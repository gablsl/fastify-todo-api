import { PrismaClient } from '@prisma/client';
import { FastifyInstance } from 'fastify';
import { CreateTodoBody, TodoParams, UpdateTodoBody } from './request-types';

const prisma = new PrismaClient();

export async function todoRoutes(fastify: FastifyInstance) {
  fastify.get('/todos', async (_req, res) => {
    const todos = await prisma.todo.findMany();
    return res.send(todos);
  });

  fastify.post<{ Body: CreateTodoBody }>('/todos', async (req, res) => {
    const { title } = req.body;
    const todo = await prisma.todo.create({
      data: {
        title,
      },
    });
    res.send(todo);
  });

  fastify.put<{ Body: UpdateTodoBody; Params: TodoParams }>(
    '/todos/:id',
    async (req, res) => {
      const { id } = req.params;
      const { completed } = req.body;

      try {
        const todo = await prisma.todo.update({
          where: { id: id },
          data: { completed },
        });
        return res.send(todo);
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
      return res.send({ message: 'To-do deleted' });
    } catch (err) {
      res.status(404).send({ message: 'To-do not found' });
    }
  });
}
