import { readFile, writeFile } from "fs/promises"
import path from "path"

import { FileProperties } from "../../types"

export const generateMdFileEntry = ({
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

export const updateReadme = async (scriptsMarkdown: string): Promise<void> => {
  const readme = (await readFile(path.resolve(".", "README.md"))).toString()
  if (!readme) return

  const readmeCommonPart = readme.slice(
    0,
    readme.indexOf("## Scripts") + "## Scripts".length
  )

  const updatedReadme = readmeCommonPart + "\n\n" + scriptsMarkdown
  await writeFile(path.resolve("README.md"), updatedReadme)
}
