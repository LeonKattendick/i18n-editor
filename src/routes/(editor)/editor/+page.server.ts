import { getProjectsById } from '$lib/services/projectService';
import { getCurrentUserUuid } from '$lib/util/helper';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = async ({ cookies, url }) => {
  const projectId = Number.parseInt(url.searchParams.get('id') || '');

  if (!projectId) {
    return { noParameter: true };
  }

  const project = await getProjectsById(projectId);
  if (!project || project.createdBy !== getCurrentUserUuid(cookies)) {
    return { notFound: true };
  }

  return {
    project,
  };
};
