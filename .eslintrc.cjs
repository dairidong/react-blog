module.exports = {
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "plugin:react/recommended",
    'airbnb',
    'airbnb-typescript',
  ],
  "overrides": [],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": './tsconfig.json'
  },
  "plugins": [
    "react",
    "@typescript-eslint",
    "unused-imports"
  ],
  "rules": {
    'import/extensions': 0,
    'react/react-in-jsx-scope': 0,
    'react/jsx-props-no-spreading': 0,
    'react/function-component-definition': [
      "error",
      {
        namedComponents: ["function-declaration", "function-expression", "arrow-function"]
      }
    ],
    'max-len': [
      "error",
      {
        "code": 100,
        "ignoreComments": true
      }
    ],
    "operator-linebreak": [
      "error",
      "after",
      {"overrides": {"=": "after"}}
    ],

    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "react/no-children-prop": 0
  }
}
