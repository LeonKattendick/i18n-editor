import colors from 'tailwindcss/colors';
import { createThemes } from 'tw-colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [
    createThemes({
      light: {
        background: colors.slate[50],
        foreground: colors.slate[950],
        primary: colors.yellow[600],
      },
      dark: {
        background: colors.slate[950],
        foreground: colors.slate[50],
        primary: colors.pink[600],
      },
    }),
  ],
};
