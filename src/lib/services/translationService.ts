import { prisma } from '$lib/util/prisma';

export const getTranslationsByProjectId = async (projectId: number) => {
  return await prisma.translation.findMany({ where: { projectId } });
};

export const createNewTranslation = async (projectId: number, key: string) => {
  return await prisma.translation.create({ data: { key, projectId } });
};
