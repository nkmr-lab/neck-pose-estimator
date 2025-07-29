module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  plugins: ["@typescript-eslint"],
  root: true,
  parser: "@typescript-eslint/parser",
  rules: {
    "no-unused-vars": [
      "error",
      {
        args: "all",
        argsIgnorePattern: "^_",
      },
    ],
    "prefer-const": ["error", { destructuring: "all" }],
  },
};
