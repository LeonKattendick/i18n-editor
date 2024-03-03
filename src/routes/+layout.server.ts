import { variables } from '$lib/util/variables';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ cookies }) => {
  const theme = cookies.get(variables.themeCookieName);
  return { theme: theme || 'dark' };
};
