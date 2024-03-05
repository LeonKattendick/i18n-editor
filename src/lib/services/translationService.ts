import { prisma } from '$lib/util/prisma';

export const getTranslationsByProjectId = async (projectId: number) => {
  return await prisma.translation.findMany({ where: { projectId } });
};
