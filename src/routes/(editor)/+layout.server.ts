import { JWT_PRIVATE_KEY } from '$env/static/private';
import { findByUuid } from '$lib/services/userService';
import { variables } from '$lib/util/variables';
import { redirect } from '@sveltejs/kit';
import jsonwebtoken, { type JwtPayload } from 'jsonwebtoken';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies }) => {
  const token = cookies.get(variables.authCookieName);

  try {
    const jwtUser = jsonwebtoken.verify(String(token?.substring(7)), JWT_PRIVATE_KEY) as JwtPayload;
    const user = await findByUuid(jwtUser.uuid);

    if (!user) {
      cookies.delete(variables.authCookieName, { path: '/' });
      throw redirect(301, '/login');
    }

    return {
      user: { id: user.id, name: user.name },
    };
  } catch {
    cookies.delete(variables.authCookieName, { path: '/' });
    throw redirect(301, '/login');
  }
};
