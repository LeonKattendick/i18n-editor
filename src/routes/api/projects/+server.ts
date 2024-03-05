import { createNewProject } from '$lib/services/projectService';
import { getCurrentUserUuid } from '$lib/util/helper';
import { json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ cookies }) => {
  const uuid = getCurrentUserUuid(cookies);
  const project = await createNewProject(uuid, 'Test Projekt', ['de_AT', 'en_GB']);

  return json(project);
};
