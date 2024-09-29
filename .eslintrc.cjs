module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "airbnb-typescript",
    "plugin:prettier/recommended",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.eslint.json",
  },
  plugins: ["react", "@typescript-eslint", "unused-imports", "prettier"],
  rules: {
    "import/extensions": 0,
    "react/react-in-jsx-scope": 0,
    "react/jsx-props-no-spreading": 0,
    "react/function-component-definition": [
      "error",
      {
        namedComponents: [
          "function-declaration",
          "function-expression",
          "arrow-function",
        ],
      },
    ],
    "max-len": 0,

    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "react/no-children-prop": 0,
    "react/prop-types": 0,
    "react/require-default-props": 0,
    "import/prefer-default-export": 0,
    "jsx-a11y/label-has-associated-control": [
      2,
      {
        controlComponents: ["Checkbox", "Input"],
      },
    ],
    "react/no-unknown-property": 0,
  },
};
