import { typescriptWithBiome } from "@mkobayashime/shared-config/eslint";

export default [
	...typescriptWithBiome,
	{
		languageOptions: {
			parserOptions: {
				project: "./tsconfig.json",
			},
		},
	},
	{
		ignores: ["dist"],
	},
];
