import { FastifyInstance } from 'fastify';
import { todoController } from '../controllers/todoController';

export async function todoRoutes(fastify: FastifyInstance) {
  fastify.get('/todos', todoController.getTodos);
  fastify.post('/todos', todoController.createTodo);
  fastify.put('/todos/:id', todoController.updateTodo);
  fastify.delete('/todos/:id', todoController.deleteTodo);
}
