import path from "path"
import { writeFile } from "fs/promises"
import * as esbuild from "esbuild"
import { minify } from "terser"
import chokidar from "chokidar"
import chalk from "chalk"
import glob from "glob"
import clipboard from "clipboardy"

const compile = async (filename: string) => {
  const esbuildOutput = await esbuild.build({
    entryPoints: [filename],
    bundle: true,
    minify: true,
    format: "esm",
    write: false,
  })

  if (!esbuildOutput.outputFiles[0]) {
    throw new Error("esbuild outputFiles is empty")
  }
  const code = esbuildOutput.outputFiles[0].text

  const prod =
    "javascript:(()=>{" +
    encodeURIComponent((await minify(code)).code ?? "") +
    "})()"
  const dev = prod.slice(1)

  return {
    prod,
    dev,
  }
}

const dev = async () => {
  try {
    const watcher = chokidar
      .watch(path.resolve("src", "*.ts"))
      .on("change", async (filename) => {
        try {
          const { dev, prod } = await compile(filename)
          console.log(chalk.green(`\nCompiled ${path.basename(filename)}`))

          console.log(dev)
          clipboard.writeSync(dev)

          await writeFile(
            path.resolve(
              "dist",
              path.basename(filename).replace(/.ts$/, ".js")
            ),
            prod
          )
        } catch (err) {
          console.log(err + "\n")
        }
      })

    watcher.on("ready", () =>
      console.log(chalk.green("\nDev mode started: watching for file changes"))
    )
  } catch (err) {
    console.error(err)
  }
}

const build = async () => {
  try {
    const files = glob.sync(path.resolve("src", "*.ts"))
    for (const filepath of files) {
      try {
        const { prod } = await compile(path.resolve("src", filepath))
        await writeFile(
          path.resolve("dist", path.basename(filepath).replace(/.ts$/, ".js")),
          prod
        )
      } catch (err) {
        console.error(err + "\n")
      }
    }
  } catch (err) {
    console.error(err)
  }
}

//
;(async () => {
  if (process.argv.includes("--watch")) {
    await dev()
  } else {
    await build()
  }
})()
