const path = require("path");
const {searchForWorkspaceRoot} = require("vite");

module.exports = {
  "parserOptions": {
    "project": path.resolve(searchForWorkspaceRoot(path.resolve()), 'tsconfig.json')
  },
  rules: {
    "max-len": 0,
    "@typescript-eslint/no-use-before-define": 0,
  }
}
