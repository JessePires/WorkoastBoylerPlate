import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';
import mdxPlugin from 'eslint-plugin-mdx';
import prettierPlugin from 'eslint-plugin-prettier';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: globals.browser,
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'import': importPlugin,
      'mdx': mdxPlugin,
      'prettier': prettierPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: ['variable', 'objectLiteralProperty', 'objectLiteralMethod'],
          types: ['function'],
          format: ['StrictPascalCase', 'strictCamelCase'],
        },
        {
          selector: ['function'],
          format: ['UPPER_CASE', 'PascalCase', 'camelCase'],
          leadingUnderscore: 'allow',
        },
      ],
      'import/no-unresolved': 'off',
      'import/named': 'error',
      'import/namespace': 'error',
      'import/default': 'error',
      'import/export': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/prefer-as-const': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/member-delimiter-style': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'import/order': [
        'error',
        {
          alphabetize: {
            caseInsensitive: true,
            order: 'asc',
          },
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          newLinesBetween: 'always',
          pathGroups: [
            {
              group: 'external',
              pattern: 'react',
              position: 'before',
            },
          ],
          pathGroupsExcludedImportTypes: ['react'],
        },
      ],
      'prettier/prettier': ['error'],
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.mdx'],
        },
      },
    },
  },
  {
    files: ['*.json'],
    rules: {
      'mdx/no-unused-expressions': 'off',
    },
  },
);
