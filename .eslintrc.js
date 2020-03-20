module.exports = {
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname
  },
  env: {
    browser: true
  },
  extends: [
    "./eslint-config-inato/base",
    "./eslint-config-inato/react",
    "./eslint-config-inato/typescript"
  ]
};
