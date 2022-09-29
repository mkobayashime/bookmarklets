import path from "path"
import { readFile, writeFile } from "fs/promises"
import { pipe } from "fp-ts/lib/function.js"
import * as O from "fp-ts/lib/Option.js"
import * as A from "fp-ts/lib/Array.js"
import * as Ord from "fp-ts/lib/Ord.js"
import * as string from "fp-ts/lib/string.js"
import glob from "glob"
import { parse, tokenizers } from "comment-parser"

type FileProperties = {
  filename: string
  title: string
  description?: string
}

const getFiles = async (): Promise<string[]> => {
  try {
    return glob.sync(path.resolve("src", "*.ts"))
  } catch (err) {
    console.error(err)
    return []
  }
}

export const readFileComments = async (filepath: string): Promise<string> => {
  try {
    const file = await readFile(filepath)
    const lines = file.toString()
    return lines.slice(lines.indexOf("/**"), lines.indexOf("*/") + 2)
  } catch (err) {
    console.error(err)
    return ""
  }
}

export const parseComment = ({
  comment,
  filename,
}: {
  comment: string
  filename: string
}): O.Option<FileProperties> => {
  const blocks = parse(comment, {
    tokenizers: [tokenizers.tag(), tokenizers.description("compact")],
  })
  if (blocks.length === 0) return O.none

  const specs = blocks[0].tags
  const titleSpec = specs.find(({ tag }) => tag === "title")
  const descriptionSpec = specs.find(({ tag }) => tag === "description")

  if (!titleSpec) return O.none

  return O.some({
    filename,
    title: titleSpec.description,
    description: descriptionSpec?.description,
  })
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
  const files = await getFiles()

  const filesProperties = pipe(
    await Promise.all(
      files.map(async (file) => {
        const comment = await readFileComments(file)
        return parseComment({ comment, filename: path.basename(file) })
      })
    ),
    A.compact,
    A.sort<FileProperties>(
      Ord.fromCompare((a, b) => string.Ord.compare(a.title, b.title))
    )
  )

  const scriptsMarkdown = filesProperties
    .map((fileProperties) => generateMdFileEntry(fileProperties))
    .join("\n\n")

  updateReadme(scriptsMarkdown)
})()
