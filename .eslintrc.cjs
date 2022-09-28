/** @type {import('@typescript-eslint/experimental-utils').TSESLint.Linter.Config} */
const config = {
  env: { es2021: true, node: true, browser: true },
  extends: ["eslint:recommended", "prettier"],
  parserOptions: { ecmaVersion: 12, sourceType: "module" },
  rules: {},
  overrides: [
    {
      files: ["*.ts"],
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
      ],
      parser: "@typescript-eslint/parser",
      plugins: ["@typescript-eslint"],
    },
  ],
}

module.exports = config
