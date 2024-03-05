import { prisma } from '$lib/util/prisma';

export const getTranslationItemsByTranslationIds = async (translationIds: number[]) => {
  return await prisma.translationItem.findMany({ where: { translationId: { in: translationIds } } });
};
