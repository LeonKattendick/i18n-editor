import colors from 'tailwindcss/colors';
import { createThemes } from 'tw-colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/flowbite-svelte-icons/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [
    createThemes({
      light: {
        background: colors.neutral[100],
        backgroundSecondary: colors.white,
        borderColor: colors.neutral[300],
        scrollbarColor: colors.neutral[300],
        textColor: colors.neutral[950],
        primary: colors.blue[600],
        secondary: colors.neutral[500],
        success: colors.green[600],
        error: colors.red[600],
      },
      dark: {
        background: colors.neutral[1000],
        backgroundSecondary: colors.neutral[950],
        borderColor: colors.neutral[700],
        scrollbarColor: colors.neutral[700],
        textColor: colors.neutral[50],
        primary: colors.blue[600],
        secondary: colors.neutral[400],
        success: colors.green[600],
        error: colors.red[600],
      },
    }),
  ],
};
