import test from "ava"
import * as O from "fp-ts/lib/Option.js"
import { globSync } from "glob"
import fs from "node:fs/promises"
import path, { basename } from "node:path"

import { parseComments } from "../bin/docgen/parseComments.js"

const bookmarklets = globSync(path.resolve("src", "*.ts"))

for await (const filepath of bookmarklets) {
  test(`${basename(filepath)} has doc data or docgen-ignored`, async (t) => {
    const comments = await parseComments(filepath)

    if (O.isSome(comments)) {
      return t.pass()
    }

    const fileLines = (await fs.readFile(filepath)).toString().split("\n")
    return t.true(fileLines.some((line) => line.includes("// docgen-ignore")))
  })
}
