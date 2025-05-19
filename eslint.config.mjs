import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import typescriptSortKeys from "eslint-plugin-typescript-sort-keys";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  js.configs.recommended,
  ...compat.extends(
    "next/core-web-vitals",
    "prettier",
    "plugin:react/recommended",
    "plugin:prettier/recommended"
  ),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: [
      "node_modules/*",
      "**/.next/*",
      "**/.out/*",
      "**/.sanity",
      "**/dist",
      "!.prettierrc.js",
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      "react": reactPlugin,
      "prettier": prettierPlugin,
      "typescript-sort-keys": typescriptSortKeys,
    },
    rules: {
      "array-bracket-spacing": ["error", "never"],
      "lines-around-comment": ["error", { beforeBlockComment: true }],
      "no-console": "warn",
      "object-curly-spacing": ["error", "always"],
      "prettier/prettier": "error",
      "quotes": ["error", "double", { avoidEscape: true }],
      "react/prop-types": "off",
      "sort-vars": "error",
      "typescript-sort-keys/string-enum": "error",
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
      "no-undef": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { varsIgnorePattern: "^SanityQueries$" }],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
