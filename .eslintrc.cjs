/** @type {import('@typescript-eslint/experimental-utils').TSESLint.Linter.Config} */
const config = {
  env: { es2021: true, node: true, browser: true },
  extends: ["@mkobayashime", "@mkobayashime/typescript"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: 12,
    sourceType: "module",
  },
  rules: {},
  plugins: ["@typescript-eslint", "import"],
}

module.exports = config
