import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    // Global ignores
    ignores: [
      "dist/",
      "node_modules/",
      "*.config.js",
      "*.config.mjs",
      "*.config.cjs",
    ],
  },
  // Main configuration for source files (excluding scripts)
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      // Start with recommended rules
      ...tseslint.configs.recommended.rules,
      // Add type-checking rules
      ...tseslint.configs.recommendedTypeChecked.rules,
    },
  },
  // Configuration for test files
  {
    files: ["src/test/**/*.spec.ts"],
    languageOptions: {
      globals: {
        ...globals.vitest,
      },
    },
  },
  // Configuration for scripts (without type-checking rules)
  {
    files: ["scripts/**/*.ts"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
    rules: {
      // You can add specific rules for scripts here if needed
      // For now, we rely on basic recommended rules from a base config if any, or keep it minimal.
    },
  },
);
