module.exports = {
  plugins: ['graphql'],
  rules: {
    'graphql/no-deprecated-fields': [
      'error',
      {
        env: 'relay',
        tagName: 'graphql',
      },
    ],
  },
};
