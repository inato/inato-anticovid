module.exports = {
  env: {
    node: true,
  },
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
  extends: ['../eslint-config-inato/base', '../eslint-config-inato/typescript'],
  rules: {
    '@typescript-eslint/camelcase': [
      'error',
      {
        properties: 'never',
      },
    ],
  },
};
