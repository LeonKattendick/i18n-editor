import {
  createNewTranslationItem,
  deleteTranslationItem,
  updateTranslationItem,
} from '$lib/services/translationItemService';
import type { TranslationItem } from '$lib/util/types';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
  const jsonData = (await request.json()) as TranslationItem;
  const result = await createNewTranslationItem(jsonData);

  return json(result);
};

export const PUT: RequestHandler = async ({ request }) => {
  const jsonData = (await request.json()) as TranslationItem;
  const result = await updateTranslationItem(jsonData);

  return json(result);
};

export const DELETE: RequestHandler = async ({ request }) => {
  const jsonData = (await request.json()) as number;
  const result = await deleteTranslationItem(jsonData);

  return json(result);
};
