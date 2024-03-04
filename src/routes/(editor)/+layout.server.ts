import { findByUuid } from '$lib/services/userService';
import { getCurrentUserUuid } from '$lib/util/helper';
import { variables } from '$lib/util/variables';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
  const uuid = getCurrentUserUuid(cookies);

  if (!uuid) {
    cookies.delete(variables.authCookieName, { path: '/' });
    throw redirect(301, '/login');
  }

  const user = await findByUuid(uuid);
  if (!user) {
    cookies.delete(variables.authCookieName, { path: '/' });
    throw redirect(301, '/login');
  }

  return {
    user: { id: user.id, name: user.name },
  };
};
