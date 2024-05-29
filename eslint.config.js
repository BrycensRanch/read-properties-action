// @ts-check
import js from "@eslint/js";
import eslintPluginJest from "eslint-plugin-jest";
import eslintPluginNoOneTimeVars from "eslint-plugin-no-one-time-vars";
import prettier from "eslint-plugin-prettier";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintPluginUnicorn from "eslint-plugin-unicorn";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default tseslint.config(
	js.configs.recommended,
	eslintPluginPrettierRecommended,
	// ...tseslint.configs.recommendedTypeChecked,
	// ...tseslint.configs.stylisticTypeChecked,
	// typescriptESLint.eslintRecommended,
	// typescriptESLint.recommended,
	{
		files: ["**/*.ts", "**/*.js"],
		ignores: ["**/lib", '**/dist/**', "**/coverage", "**/node_modules", "**/.husky"],
		languageOptions: {
			ecmaVersion: "latest",
			sourceType: "module",
			parser: tseslint.parser,
			parserOptions: {
				project: true
			},
			globals: {
				Atomics: "readonly",
				SharedArrayBuffer: "readonly",
				"jest/globals": true,
			},
		},
		plugins: {
			prettier,
			'@typescript-eslint': tseslint.plugin,
			"no-one-time-vars": eslintPluginNoOneTimeVars,
			unicorn: eslintPluginUnicorn,
		},
		rules: {
			semi: ["error", "always", { omitLastInOneLineBlock: true }],
			"no-multiple-empty-lines": ["error", { max: 2, maxEOF: 0, maxBOF: 0 }],
			quotes: ["error", "double", { avoidEscape: true }],
			camelcase: ["error", { properties: "always" }],
			curly: ["error", "multi-or-nest"],
			eqeqeq: ["error", "always", { null: "ignore" }],
			"one-var": ["error", "consecutive"],
			"linebreak-style": ["error", "unix"],
			"prefer-const": "error",
			"no-multi-spaces": "error",
			"object-shorthand": "error",
			"quote-props": ["error", "as-needed"],
			"prefer-destructuring": ["error", { object: true, array: false }],
			"prefer-template": "error",
			"space-before-blocks": ["error", "always"],
			"space-infix-ops": "error",
			"func-call-spacing": ["error", "never"],
			"key-spacing": ["error", { beforeColon: false }],
			"dot-notation": "error",
			"no-case-declarations": "error",
			"brace-style": "error",
			"template-curly-spacing": "error",
			"no-console": "warn",
			"no-var": "error",
			"@typescript-eslint/no-explicit-any": "error",
			"@typescript-eslint/no-unused-vars": "error",
			"no-eval": "warn",
			"no-undefined": "off",
			"no-eq-null": "error",
			"@typescript-eslint/array-type": ["error", { default: "array" }],
			"no-lonely-if": "error",
			"arrow-body-style": "off",
			"prefer-arrow-callback": "off",
			"no-restricted-syntax": "off",
			radix: "off",
			"import/prefer-default-export": "off",
			"unicorn/consistent-destructuring": "error",
			"unicorn/empty-brace-spaces": "error",
			"unicorn/no-array-for-each": "error",
			"unicorn/no-empty-file": "error",
			"unicorn/no-for-loop": "error",
			"unicorn/no-instanceof-array": "error",
			"unicorn/no-lonely-if": "error",
			"unicorn/prefer-array-find": "error",
			"unicorn/prefer-array-flat": "error",
			"unicorn/prefer-array-flat-map": "error",
			"unicorn/prefer-array-index-of": "error",
			"unicorn/prefer-date-now": "error",
			"unicorn/prefer-default-parameters": "error",
			"unicorn/prefer-includes": "error",
			"unicorn/prefer-string-starts-ends-with": "error",
			"unicorn/prefer-string-trim-start-end": "error",
			"unicorn/prefer-switch": "error",
			"unicorn/require-number-to-fixed-digits-argument": "error",
			"unicorn/throw-new-error": "error",
			"unicorn/no-unreadable-array-destructuring": "error",
			"unicorn/prefer-query-selector": "error",
			"unicorn/prefer-dom-node-text-content": "error",
			"unicorn/prefer-logical-operator-over-ternary": "error",
		},
		settings: {
			prettier: {
				// Add prettier settings if needed
			},
		},
	},
	{
		files: ["**/*.test.ts"],
		plugins: {
			jest: eslintPluginJest,
		},
		languageOptions: {
			globals: {
				"jest/globals": true,
			},
		},
	},
);
