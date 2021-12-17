import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  extract: {
    include: ['**/*.{tsx}'],
    exclude: ['node_modules', '.next', '.vscode', 'lib/api', 'lib/schema', 'lib/functions']
  },
  theme: {
    extend: {
      fontFamily: {
        "roboto": ['Roboto', 'system-ui']
      }
    }
  }
});