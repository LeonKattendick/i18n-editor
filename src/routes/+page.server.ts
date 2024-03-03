import { dev } from '$app/environment';
import { variables } from '$lib/util/variables';
import { redirect, type Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, request }) => {
  const token = cookies.get(variables.authCookieName);

  if (token) {
    throw redirect(302, '/projects');
  }
  throw redirect(302, '/login');
};

export const actions: Actions = {
  theme: ({ cookies }) => {
    const newTheme = cookies.get(variables.themeCookieName) === 'light' ? 'dark' : 'light';
    cookies.set(variables.themeCookieName, newTheme, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      secure: !dev,
      maxAge: 60 * 60 * 35 * 30,
    });
  },
};
