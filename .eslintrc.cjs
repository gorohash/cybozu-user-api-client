/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
  ignorePatterns: ["dist"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "import"],
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },

  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "error",
    "import/extensions": ["error", "ignorePackages", { ts: "never" }],
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        alphabetize: { order: "asc", orderImportKind: "asc" },
        warnOnUnassignedImports: true,
      },
    ],
  },
};
