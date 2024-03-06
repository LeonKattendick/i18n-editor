import { prisma } from '$lib/util/prisma';
import type { TranslationItem } from '$lib/util/types';

export const getTranslationItemsByTranslationIds = async (translationIds: number[]) => {
  return await prisma.translationItem.findMany({ where: { translationId: { in: translationIds } } });
};

export const createNewTranslationItem = async (item: TranslationItem) => {
  return await prisma.translationItem.create({ data: item });
};

export const updateTranslationItem = async (item: TranslationItem) => {
  return await prisma.translationItem.update({ where: { id: item.id }, data: { content: item.content } });
};
