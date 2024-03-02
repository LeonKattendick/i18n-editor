import { setAuthenticationCookie } from '$lib/services/authService';
import { findByName } from '$lib/services/userService';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import bcryptjs from 'bcryptjs';

export const actions: Actions = {
  login: async ({ cookies, request }) => {
    const data = await request.formData();

    const name = String(data.get('name'));
    const password = String(data.get('password'));

    if (!name || !password) {
      return fail(400, { required: true });
    }
    if (!name.match('[a-zA-Z0-9]+') && name.length >= 3) {
      return fail(400, { wrongFormat: true });
    }

    const user = await findByName(name);
    if (!user || !bcryptjs.compareSync(password, user.password)) {
      return fail(400, { passwordMismatch: true });
    }
    setAuthenticationCookie(cookies, user.uuid);

    throw redirect(302, '/projects');
  },
};
