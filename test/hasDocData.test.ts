import fs from "node:fs/promises";
import path, { basename } from "node:path";
import { Glob } from "bun";
import * as O from "fp-ts/lib/Option.js";
import { expect, test } from "vitest";

import { parseComments } from "../bin/docgen/parseComments.js";

const bookmarklets = new Glob(path.resolve("src", "*.ts")).scan();

for await (const filepath of bookmarklets) {
	test(`${basename(filepath)} has doc data or docgen-ignored`, async () => {
		const comments = await parseComments({ filepath });

		const fileLines = (await fs.readFile(filepath)).toString().split("\n");
		const isDocgenIgnored = fileLines.some((line) =>
			line.includes("// docgen-ignore"),
		);

		expect(O.isSome(comments) || isDocgenIgnored).toBeTruthy();
	});
}
