/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  env: {
    es2022: true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "prettier", "simple-import-sort"],
  rules: {
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    "prettier/prettier": "warn",
    "no-constant-condition": "off",
  },
};
module.exports = config;
