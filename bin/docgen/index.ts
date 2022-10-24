import * as A from "fp-ts/lib/Array.js"
import { pipe } from "fp-ts/lib/function.js"
import * as Ord from "fp-ts/lib/Ord.js"
import * as string from "fp-ts/lib/string.js"
import { readFile, writeFile } from "fs/promises"
import glob from "glob"
import path from "path"

import { FileProperties } from "../../types"

import { parseComments } from "./parseComments.js"

const getFiles = (): string[] => {
  try {
    return glob.sync(path.resolve("src", "*.ts"))
  } catch (err) {
    console.error(err)
    return []
  }
}

const generateMdFileEntry = ({
  filename,
  title,
  description,
}: FileProperties): string => {
  return `
### [${title}](https://raw.githubusercontent.com/mkobayashime/bookmarklets/main/dist/${filename.replace(
    /.ts$/,
    ".js"
  )})

${description ?? ""}
  `.trim()
}

const updateReadme = async (scriptsMarkdown: string): Promise<void> => {
  const readme = (await readFile(path.resolve(".", "README.md"))).toString()
  if (!readme) return

  const readmeCommonPart = readme.slice(
    0,
    readme.indexOf("## Scripts") + "## Scripts".length
  )

  const updatedReadme = readmeCommonPart + "\n\n" + scriptsMarkdown
  await writeFile(path.resolve("README.md"), updatedReadme)
}

//
;(async () => {
  const files = getFiles()

  const filesProperties = pipe(
    await Promise.all(files.map(async (file) => await parseComments(file))),
    A.compact,
    A.sort<FileProperties>(
      Ord.fromCompare((a, b) => string.Ord.compare(a.title, b.title))
    )
  )

  const scriptsMarkdown = filesProperties
    .map((fileProperties) => generateMdFileEntry(fileProperties))
    .join("\n\n")

  await updateReadme(scriptsMarkdown)
})().catch((err) => {
  throw err
})
