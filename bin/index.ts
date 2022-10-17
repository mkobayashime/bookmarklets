import chalk from "chalk"
import chokidar from "chokidar"
import clipboard from "clipboardy"
import * as esbuild from "esbuild"
import { writeFile } from "fs/promises"
import glob from "glob"
import path from "path"
import { minify } from "terser"

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

const dev = () => {
  let prevOutput = ""

  try {
    const watcher = chokidar
      .watch(path.resolve("src", "*.ts"))
      .on("change", (filename) => {
        ;(async () => {
          try {
            const { dev, prod } = await compile(filename)

            if (prevOutput === prod) {
              console.log(
                chalk.blue(
                  `\n${path.basename(filename)} is unchanged. Skipping...`
                )
              )
              return
            }
            prevOutput = prod

            console.log(chalk.green(`\nCompiled ${path.basename(filename)}`))

            console.log(prod)
            clipboard.writeSync(dev)

            await writeFile(
              path.resolve(
                "dist",
                path.basename(filename).replace(/.ts$/, ".js")
              ),
              prod
            )
          } catch (err) {
            console.error(err)
            console.log("")
          }
        })().catch((err) => {
          console.error(err)
        })
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
        console.error(err)
        console.log("")
      }
    }
  } catch (err) {
    console.error(err)
  }
}

//
;(async () => {
  if (process.argv.includes("--watch")) {
    dev()
  } else {
    await build()
  }
})().catch((err) => {
  console.error(err)
})
