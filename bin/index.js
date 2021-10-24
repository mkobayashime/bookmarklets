import path from "path"
import { watch, writeFile, readdir } from "fs/promises"
import { minify } from "minify"
import clipboard from "clipboardy"

const compile = async (file) => {
  const minified = await minify(file)
  const prod = "javascript:(() => {" + minified + "})()"
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
          const { dev, prod } = await compile(path.resolve("src", filename))

          console.log(dev + "\n")
          clipboard.writeSync(dev)

          await writeFile(path.resolve("dist", filename), prod)
        } catch (err) {
          console.log(err + "\n")
        }
      }
    }
  } catch (err) {
    if (err.name === "AbortError") return
    console.error(err)
  }
}

const build = async () => {
  try {
    const files = await readdir(path.resolve("src"))
    for (const file of files) {
      if (file.endsWith(".js")) {
        try {
          const { prod } = await compile(path.resolve("src", file))
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
