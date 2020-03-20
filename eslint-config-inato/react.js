module.exports = {
  plugins: ["react-hooks"],
  extends: ["prettier/react"],
  rules: {
    "react/destructuring-assignment": "off",
    "react/forbid-prop-types": "off",
    "react/jsx-filename-extension": "off",
    "react/no-multi-comp": "off",
    "react/no-unused-prop-types": "off",
    "react/prefer-stateless-function": "off",
    "react/prop-types": "off",
    "react/require-default-props": "off",
    "react/sort-comp": "off",
    "react/default-props-match-prop-types": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "react/jsx-props-no-spreading": "off",
    "react/static-property-placement": "off"
  }
};
