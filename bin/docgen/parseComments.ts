import { readFile } from "node:fs/promises";
import path from "node:path";
import { parse, tokenizers } from "comment-parser";

import type { FileProperties } from "../../types";

export const parseComments = async ({
	filepath,
	preferTitleInternal = false,
}: {
	filepath: string;
	preferTitleInternal?: boolean;
}): Promise<FileProperties | null> => {
	try {
		const file = await readFile(filepath);
		const lines = file.toString();
		const commentString = lines.slice(
			lines.indexOf("/**"),
			lines.indexOf("*/") + 2,
		);

		const blocks = parse(commentString, {
			tokenizers: [tokenizers.tag(), tokenizers.description("compact")],
		});
		if (blocks.length === 0) return null;

		const specs = blocks[0].tags;
		const titleSpec = specs.find(({ tag }) => tag === "title");
		const titleInternalSpec = specs.find(({ tag }) => tag === "titleInternal");
		const descriptionSpec = specs.find(({ tag }) => tag === "description");

		if (!titleSpec) return null;

		return {
			filename: path.basename(filepath),
			title: preferTitleInternal
				? (titleInternalSpec?.description ?? titleSpec.description)
				: titleSpec.description,
			description: descriptionSpec?.description.replace(/\\n\s*/, "  \n"),
		};
	} catch (err) {
		console.error(err);
		return null;
	}
};
