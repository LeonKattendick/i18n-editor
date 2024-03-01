import { findById } from '$lib/services/userService';
import { variables } from '$lib/variables';
import { redirect } from '@sveltejs/kit';
import jsonwebtoken, { type JwtPayload } from 'jsonwebtoken';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ cookies }) => {
  const token = cookies.get(variables.cookieName);

  try {
    const user = jsonwebtoken.verify(String(token), variables.jwtPrivateKey) as JwtPayload;
    console.log(user);

    return {
      authUser: findById(Number.parseInt(user.sub ?? '')),
    };
  } catch {
    cookies.delete(variables.cookieName, { path: '/' });
    throw redirect(301, '/login');
  }
};
