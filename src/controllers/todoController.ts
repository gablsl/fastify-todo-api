import { FastifyRequest, FastifyReply } from 'fastify';
import { todoService } from '../services/todoService';
import {
  CreateTodoBody,
  TodoParams,
  UpdateTodoBody,
} from '../types/fastify-types';

export const todoController = {
  async getTodos(_req: FastifyRequest, res: FastifyReply) {
    try {
      const todos = await todoService.getTodos();
      res.send(todos);
    } catch (err) {
      res.status(500).send({ error: 'Something went wrong' });
    }
  },

  async createTodo(
    req: FastifyRequest<{ Body: CreateTodoBody }>,
    res: FastifyReply
  ) {
    const { title } = req.body;

    try {
      const todo = await todoService.createTodo(title);
      res.status(201).send(todo);
    } catch (err) {
      res.status(500).send({ error: 'Something went wrong' });
    }
  },

  async updateTodo(
    req: FastifyRequest<{ Body: UpdateTodoBody; Params: TodoParams }>,
    res: FastifyReply
  ) {
    const { id } = req.params;
    const { completed } = req.body;

    try {
      const todo = await todoService.updateTodo(id, completed);
      res.send(todo);
    } catch (err) {
      res.status(404).send({ message: 'To-do not found' });
    }
  },

  async deleteTodo(
    req: FastifyRequest<{ Params: TodoParams }>,
    res: FastifyReply
  ) {
    const { id } = req.params;

    try {
      await todoService.deleteTodo(id);
      res.send({ message: 'To-do deleted' });
    } catch (err) {
      res.status(404).send({ message: 'To-do not found' });
    }
  },
};
