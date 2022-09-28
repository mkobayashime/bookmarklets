import test from "ava"
import path, { basename } from "node:path"
import fs from "node:fs/promises"
import glob from "glob"
import * as O from "fp-ts/lib/Option.js"
import { readFileComments, parseComment } from "../bin/docgen.js"

const bookmarklets = glob.sync(path.resolve("src", "*.ts"))

for await (const filepath of bookmarklets) {
  test(`${basename(filepath)} has doc data or docgen-ignored`, async (t) => {
    const comments = parseComment({
      comment: await readFileComments(filepath),
      filename: filepath,
    })

    if (O.isSome(comments)) {
      return t.pass()
    }

    const fileLines = (await fs.readFile(filepath)).toString().split("\n")
    return t.true(fileLines.some((line) => line.includes("// docgen-ignore")))
  })
}
