import { getProjectsByUser } from '$lib/services/projectService';
import { getCurrentUserUuid } from '$lib/util/helper';
import type { ServerLoad } from '@sveltejs/kit';

export const load: ServerLoad = ({ cookies }) => {
  const uuid = getCurrentUserUuid(cookies);

  return {
    projectsPromise: getProjectsByUser(uuid),
  };
};
