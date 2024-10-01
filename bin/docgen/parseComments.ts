import { readFile } from "node:fs/promises";
import path from "node:path";
import { parse, tokenizers } from "comment-parser";
import * as O from "fp-ts/lib/Option.js";

import type { FileProperties } from "../../types";

export const parseComments = async (
  filepath: string,
): Promise<O.Option<FileProperties>> => {
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
    if (blocks.length === 0) return O.none;

    const specs = blocks[0].tags;
    const titleSpec = specs.find(({ tag }) => tag === "title");
    const descriptionSpec = specs.find(({ tag }) => tag === "description");

    if (!titleSpec) return O.none;

    return O.some({
      filename: path.basename(filepath),
      title: titleSpec.description,
      description: descriptionSpec?.description,
    });
  } catch (err) {
    console.error(err);
    return O.none;
  }
};
