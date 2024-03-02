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
        background: colors.zinc[50],
        borderColor: colors.zinc[300],
        textColor: colors.zinc[950],
        primary: colors.blue[600],
        secondary: colors.zinc[500],
        success: colors.green[600],
        error: colors.red[600],
      },
      dark: {
        background: colors.zinc[950],
        borderColor: colors.zinc[600],
        textColor: colors.zinc[50],
        primary: colors.blue[600],
        secondary: colors.zinc[400],
        success: colors.green[600],
        error: colors.red[600],
      },
    }),
  ],
};
