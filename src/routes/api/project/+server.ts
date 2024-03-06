import { createNewProject } from '$lib/services/projectService';
import { createNewTranslation } from '$lib/services/translationService';
import { getCurrentUserUuid } from '$lib/util/helper';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies }) => {
  const uuid = getCurrentUserUuid(cookies);

  const project = await createNewProject(uuid, 'Test Projekt', ['de_AT', 'en_GB', 'fr_FR', 'es_ES']);
  await createNewTranslation(project.id, 'test.key.first');
  await createNewTranslation(project.id, 'test.key.second');
  await createNewTranslation(project.id, 'test.key.third');

  return json(project);
};
