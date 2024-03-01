import { prisma } from '$lib/prisma';
import type { User } from '@prisma/client';

export const createUser = async (name: string, password: string, refreshToken: string): Promise<User> => {
  return await prisma.user.create({ data: { name, password, refreshToken } });
};

export const findById = async (id: number): Promise<User | null> => {
  return await prisma.user.findFirst({ where: { id } });
};
