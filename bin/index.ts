import path from "path"
import { watch, writeFile } from "fs/promises"
import * as esbuild from "esbuild"
import { minify } from "terser"
import glob from "glob"
import clipboard from "clipboardy"

const compile = async (filename: string) => {
  const esbuildOutput = await esbuild.build({
    entryPoints: [path.resolve("src", filename)],
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
    const watcher = watch(path.resolve("src"))
    for await (const { filename } of watcher) {
      if (filename.endsWith(".js")) {
        try {
          const { dev, prod } = await compile(filename)

          console.log(dev + "\n")
          clipboard.writeSync(dev)

          await writeFile(path.resolve("dist", filename), prod)
        } catch (err) {
          console.log(err + "\n")
        }
      }
    }
  } catch (err) {
    console.error(err)
  }
}

const build = async () => {
  try {
    const files = await glob.sync(path.resolve("src", "*.js"))
    for (const filepath of files) {
      try {
        const { prod } = await compile(filepath)
        await writeFile(path.resolve("dist", path.basename(filepath)), prod)
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
