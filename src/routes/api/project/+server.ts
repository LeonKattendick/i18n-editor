import { createNewProject } from '$lib/services/projectService';
import { createNewTranslation } from '$lib/services/translationService';
import { getCurrentUserUuid } from '$lib/util/helper';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies, request }) => {
  const jsonData = (await request.json()) as { name: string; locales: '' | string[] };

  if (!jsonData.name) {
    return error(400, 'Der Name darf nicht leer sein.');
  }
  if (jsonData.locales === '') {
    return error(400, 'Es müssen Sprachen ausgewählt sein');
  }

  const uuid = getCurrentUserUuid(cookies);

  const project = await createNewProject(uuid, jsonData.name, jsonData.locales);
  await createNewTranslation(project.id, 'test.key.first');
  await createNewTranslation(project.id, 'test.key.second');
  await createNewTranslation(project.id, 'test.key.third');

  return json(project);
};
