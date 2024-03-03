import { dev } from '$app/environment';
import { variables } from '$lib/util/variables';
import type { Cookies } from '@sveltejs/kit';
import jsonwebtoken from 'jsonwebtoken';

export const setAuthenticationCookie = (cookies: Cookies, uuid: string) => {
  const jwt = jsonwebtoken.sign({ uuid }, variables.jwtPrivateKey, { expiresIn: '1d' });

  cookies.set(variables.cookieName, `Bearer ${jwt}`, {
    path: '/',
    httpOnly: true,
    sameSite: 'strict',
    secure: !dev,
    maxAge: 60 * 60 * 35 * 30,
  });
};

export const deleteAuthenticationCookie = (cookies: Cookies) => {
  cookies.delete(variables.cookieName, { path: '/' });
};
