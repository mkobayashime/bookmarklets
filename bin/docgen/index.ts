import path from "node:path";
import * as A from "fp-ts/lib/Array.js";
import { pipe } from "fp-ts/lib/function.js";
import * as Ord from "fp-ts/lib/Ord.js";
import * as string from "fp-ts/lib/string.js";
import { globSync } from "glob";

import type { FileProperties } from "../../types";

import { parseComments } from "./parseComments.js";
import { generateMdFileEntry, updateReadme } from "./readmeMarkdown.js";

const getFiles = (): string[] => {
	try {
		return globSync(path.resolve("src", "*.ts"));
	} catch (err) {
		console.error(err);
		return [];
	}
};

//
(async () => {
	const files = getFiles();

	const filesProperties = pipe(
		await Promise.all(
			files.map(async (file) => await parseComments({ filepath: file })),
		),
		A.compact,
		A.sort<FileProperties>(
			Ord.fromCompare((a, b) => string.Ord.compare(a.title, b.title)),
		),
	);

	const scriptsMarkdown = filesProperties
		.map((fileProperties) => generateMdFileEntry(fileProperties))
		.join("\n\n");

	await updateReadme(scriptsMarkdown);
})().catch((err) => {
	throw err;
});
