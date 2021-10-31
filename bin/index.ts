import path from "path"
import { watch, writeFile, readFile } from "fs/promises"
import { minify } from "terser"
import glob from "glob"
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
    const files = await glob.sync(path.resolve("src", "*.js"))
    for (const filepath of files) {
      try {
        const { prod } = await compile((await readFile(filepath)).toString())
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
