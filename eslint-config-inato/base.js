module.exports = {
  env: {
    es6: true,
    jest: true
  },
  parser: "babel-eslint",
  extends: ["airbnb", "prettier", "plugin:import/errors"],
  plugins: ["prettier", "jest"],
  globals: {
    process: true,
    fetch: true
  },
  rules: {
    "jest/no-disabled-tests": "error",
    "jest/no-focused-tests": "error",
    "jsx-a11y/anchor-is-valid": "off",
    "jsx-a11y/label-has-associated-control": [
      2,
      {
        labelComponents: ["label"],
        labelAttributes: ["htmlFor"],
        controlComponents: ["input"]
      }
    ],
    "prettier/prettier": "error",
    curly: ["error", "multi-line"],
    "func-names": "off",
    "global-require": "off",
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index"
        ]
      }
    ],
    "import/prefer-default-export": "off",
    "import/no-cycle": "off",
    "import/extensions": "off",
    "max-lines": "error",
    "new-cap": "off",
    "no-console": "error",
    "no-extra-boolean-cast": "off",
    "no-multi-assign": "off",
    "no-param-reassign": "off",
    "no-plusplus": "off",
    "no-process-env": "error",
    "no-prototype-builtins": "off",
    "no-restricted-properties": "off",
    "no-shadow": "off",
    "no-underscore-dangle": "off",
    "no-use-before-define": "off",
    "class-methods-use-this": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: ["**/*{.,_}{test,spec}.{js,jsx,ts,tsx}"],
        optionalDependencies: true,
        peerDependencies: true
      }
    ]
  }
};
