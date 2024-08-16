import { todoRepository } from '../repositories/todoRepository';

export const todoService = {
  async getTodos() {
    return todoRepository.findAll();
  },

  async createTodo(title: string) {
    return todoRepository.create(title);
  },

  async updateTodo(id: string, completed: boolean) {
    return todoRepository.update(id, completed);
  },

  async deleteTodo(id: string) {
    return todoRepository.delete(id);
  },
};
