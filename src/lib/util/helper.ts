import { JWT_PRIVATE_KEY } from '$env/static/private';
import type { Cookies } from '@sveltejs/kit';
import jsonwebtoken, { type JwtPayload } from 'jsonwebtoken';
import { variables } from './variables';

export const isCleanUsername = (name: string) => {
  return name.match('[a-zA-Z0-9]+');
};

export const getCurrentUserUuid = (cookies: Cookies) => {
  const jwtToken = cookies.get(variables.authCookieName);
  try {
    const jwtUser = jsonwebtoken.verify(String(jwtToken?.substring(7)), JWT_PRIVATE_KEY) as JwtPayload;
    return jwtUser.uuid;
  } catch {}
  return null;
};
