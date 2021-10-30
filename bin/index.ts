import path from "path"
import { watch, writeFile, readdir, readFile } from "fs/promises"
import { minify } from "terser"
import clipboard from "clipboardy"

const compile = async (code: string) => {
  const minified = encodeURIComponent((await (await minify(code)).code) ?? "")
  const prod = "javascript:(()=>{" + minified + "})()"
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
          const { dev, prod } = await compile(
            (await readFile(path.resolve("src", filename))).toString()
          )

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
    const files = await readdir(path.resolve("src"))
    for (const file of files) {
      if (file.endsWith(".js")) {
        try {
          const { prod } = await compile(
            (await readFile(path.resolve("src", file))).toString()
          )
          await writeFile(path.resolve("dist", file), prod)
        } catch (err) {
          console.error(err + "\n")
        }
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
