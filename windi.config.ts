import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  extract: {
    include: ['**/*.{tsx,ts}'],
    exclude: ['node_modules', '.next', '.vscode', 'lib/api', 'lib/functions']
  },
  theme: {
    extend: {
      fontFamily: {
        "roboto": ['Roboto', 'system-ui']
      },
      colors: {
        "primary": "#7690EA",
        "primary-hover": "#98ACF4"
      }

    }
  }
});