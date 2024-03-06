import { getProjectsById } from '$lib/services/projectService';
import { createNewTranslation, getTranslationsByProjectId } from '$lib/services/translationService';
import { getCurrentUserUuid } from '$lib/util/helper';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request, cookies }) => {
  const jsonData = (await request.json()) as { projectId: number; key: string };

  if (!jsonData.key) {
    return error(400, 'Der Schlüssel darf nicht leer sein.');
  }
  if (!jsonData.key.match(/^[a-z]+(\.[a-z]+)*$/)) {
    return error(400, 'Der Schlüssel entspricht nicht dem Format.');
  }

  const project = await getProjectsById(jsonData.projectId);
  if (!project || project.createdBy !== getCurrentUserUuid(cookies)) {
    return error(400, 'Das Projekt konnte nicht gefunden werden.');
  }

  const translations = await getTranslationsByProjectId(project.id);
  if (translations.find((v) => v.key === jsonData.key)) {
    return error(400, 'Der Schlüssel existiert bereits im Projekt.');
  }

  const translation = await createNewTranslation(jsonData.projectId, jsonData.key);

  return json(translation);
};
