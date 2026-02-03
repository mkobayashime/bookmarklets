import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import * as O from "fp-ts/lib/Option.js";

import { parseComments } from "./docgen/parseComments.js";

type ManifestJson = Array<{
	name: string;
	location: string;
}>;

const generateManifest = async (): Promise<void> => {
	const srcDir = path.resolve(import.meta.dirname, "../src");
	const distDir = path.resolve(import.meta.dirname, "../dist");
	const outputPath = path.join(distDir, "manifest.json");

	const files = await readdir(srcDir);
	const tsFiles = files.filter((file) => file.endsWith(".ts")).sort();

	const manifest: ManifestJson = [];

	for (const file of tsFiles) {
		const filepath = path.join(srcDir, file);
		const result = await parseComments(filepath);

		if (O.isSome(result)) {
			manifest.push({
				name: result.value.title,
				location: file.replace(/\.ts$/, ".js"),
			});
		}
	}

	await writeFile(outputPath, JSON.stringify(manifest, null, 2));
};

generateManifest().catch((err) => {
	console.error(err);
	process.exit(1);
});
