import { defineConfig } from "oxfmt";

export default defineConfig({
	useTabs: true,
	sortImports: true,
	ignorePatterns: ["dist", "!dist/manifest.json"],
});
