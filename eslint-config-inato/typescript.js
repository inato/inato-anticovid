module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    extraFileExtensions: ['.ts, .tsx'],
  },
  extends: ['plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-throw-literal': 'error',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/array-type': ['error', {
      default: 'generic'
    }],
    'import/no-unresolved': 'off',
    'default-case': 'off',
    'consistent-return': 'off',
  },
  overrides: [{
    files: ['*.test.ts', '*.test.tsx'],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  }, ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
