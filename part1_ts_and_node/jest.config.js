module.exports = {
  "verbose": true,
  "testURL": "http://localhost",
  // "roots": [
  //     "<rootDir>/src"
  // ],
  "transform": {
    "^.+\\.(t|j)sx?$": "ts-jest"
    // "^.+\\.(t|j)sx?$": "<rootDir>/test-preprocessor.js"
  },
  // "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ]
};