// @ts-check
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import js from '@eslint/js';

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  ...tseslint.configs.strictTypeChecked,
  {
    languageOptions: {
      globals: globals.builtin,
      parser: tseslint.parser,
      parserOptions: {
        projectService: true
      }
    },
    plugins: {
      unicorn: eslintPluginUnicorn,
    },
    rules: {
      "@typescript-eslint/consistent-type-definitions": [`error`, `type`],
      "@typescript-eslint/no-explicit-any": `off`,
      "@typescript-eslint/restrict-template-expressions": `off`,

      "@typescript-eslint/no-unused-vars": [
        `warn`,
        {
          "argsIgnorePattern": `^_`,
          "varsIgnorePattern": `^_`,
          "caughtErrorsIgnorePattern": `^_`
        }
      ],
      "unicorn/prevent-abbreviations": [`error`, {
        "ignore": [
          `.*Opts$`,
          `ctx`,
          `mod*`,
          `args*`,
          `Args*`,
          `el`,
          `fn*`,
          `opts`,
          `dest`,
          `.*El$`
        ],
      }]
    },
  }
);