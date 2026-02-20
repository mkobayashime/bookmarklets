import path from "node:path";
import { Glob } from "bun";

import { parseComments } from "./parseComments.js";
import { generateMdFileEntry, updateReadme } from "./readmeMarkdown.js";

const getFiles = async (): Promise<string[]> => {
	try {
		return await Array.fromAsync(new Glob(path.resolve("src", "*.ts")).scan());
	} catch (err) {
		console.error(err);
		return [];
	}
};

//
void (async () => {
	const files = await getFiles();

	const filesProperties = (
		await Promise.all(
			files.map(async (file) => await parseComments({ filepath: file })),
		)
	)
		.flatMap((f) => (f === null ? [] : [f]))
		.sort((a, b) => a.title.localeCompare(b.title));

	const scriptsMarkdown = filesProperties
		.map((fileProperties) => generateMdFileEntry(fileProperties))
		.join("\n\n");

	await updateReadme(scriptsMarkdown);
})().catch((err) => {
	throw err;
});
