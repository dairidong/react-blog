const path = require("path");
const {searchForWorkspaceRoot} = require("vite");

module.exports = {
  "parserOptions": {
    "project": path.resolve(searchForWorkspaceRoot(path.resolve()), 'tsconfig.json')
  },
  rules: {
    "@typescript-eslint/no-use-before-define": 0,
  }
}
