import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  // Base configuration
  {
    files: ['**/*.{js,jsx,ts,tsx}'], // Define file extensions
    ignores: ['node_modules', 'dist'], // Ignore folders
    languageOptions: {
      parser: tsParser, // Use TypeScript parser
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: globals.browser, // Add browser globals
    },
    plugins: {
      '@typescript-eslint': tseslint, // TypeScript ESLint rules
      'react-hooks': reactHooks, // React hooks rules
      'react-refresh': reactRefresh, // React Refresh rules
      prettier: prettierPlugin, // Prettier plugin
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      // React hooks rules
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // Prettier integration
      'prettier/prettier': 'error',
    },
  },
  // Prettier-specific configuration (disable conflicting rules)
  prettierConfig,
];
