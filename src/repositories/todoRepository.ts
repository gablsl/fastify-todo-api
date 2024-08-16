import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const todoRepository = {
  async findAll() {
    return prisma.todo.findMany();
  },

  async create(title: string) {
    return prisma.todo.create({
      data: { title },
    });
  },

  async update(id: string, completed: boolean) {
    return prisma.todo.update({
      where: { id },
      data: { completed },
    });
  },

  async delete(id: string) {
    return prisma.todo.delete({
      where: { id },
    });
  },
};
