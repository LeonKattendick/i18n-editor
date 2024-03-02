import { prisma } from '$lib/util/prisma';
import type { User } from '@prisma/client';
import { randomUUID } from 'crypto';

export const createUser = async (name: string, password: string): Promise<User> => {
  return await prisma.user.create({ data: { name, password, uuid: randomUUID() } });
};

export const isUniqueUser = async (name: string): Promise<boolean> => {
  return !(await findByName(name));
};

export const findByName = async (name: string): Promise<User | null> => {
  return await prisma.user.findUnique({ where: { name } });
};

export const findByUuid = async (uuid: string): Promise<User | null> => {
  return await prisma.user.findUnique({ where: { uuid } });
};
