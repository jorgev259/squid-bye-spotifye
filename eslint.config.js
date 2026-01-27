import { defineConfig } from "@eslint/config-helpers";
import { FlatCompat } from "@eslint/eslintrc";
import path from "path";
import { fileURLToPath } from "url";

import eslintConfigStandard from "eslint-config-standard";
import eslintPluginAstro from "eslint-plugin-astro";
import eslintConfigPrettier from "eslint-config-prettier/flat";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default defineConfig([
  ...compat.config(eslintConfigStandard),
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginAstro.configs["jsx-a11y-strict"],
  eslintConfigPrettier,
]);
