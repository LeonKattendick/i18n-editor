import { variables } from '$lib/util/variables';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
  const token = cookies.get(variables.cookieName);

  if (token) {
    throw redirect(302, '/projects');
  }
  throw redirect(302, '/login');
};
