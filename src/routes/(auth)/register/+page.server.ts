import { setAuthenticationCookie } from '$lib/services/authService';
import { createUser, isUniqueUser } from '$lib/services/userService';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import bcryptjs from 'bcryptjs';

export const actions: Actions = {
  register: async ({ cookies, request }) => {
    const data = await request.formData();

    const name = String(data.get('name'));
    const password = String(data.get('password'));
    const passwordConfirm = String(data.get('password_confirm'));

    if (!name || !password || !passwordConfirm) {
      return fail(400, { required: true });
    }
    if (!/^[a-zA-Z0-9]+$/.test(name) && name.length >= 3) {
      return fail(400, { wrongFormat: true });
    }
    if (password !== passwordConfirm) {
      return fail(400, { passwordMismatch: true });
    }
    if (!(await isUniqueUser(name))) {
      return fail(400, { notUniqueUser: true });
    }

    const user = await createUser(name, bcryptjs.hashSync(password, 14));
    setAuthenticationCookie(cookies, user.uuid);

    throw redirect(302, '/projects');
  },
};
