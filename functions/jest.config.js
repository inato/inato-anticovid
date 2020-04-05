module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "\\.(png)$": "<rootDir>/__mocks__/fileMock.js"
  }
};
