import path from "path"
import { watch, writeFile } from "fs/promises"
import { minify } from "minify"
import clipboard from "clipboardy"

//
;(async () => {
  try {
    const watcher = watch(path.resolve("src"))
    for await (const { filename } of watcher) {
      if (filename.endsWith(".js")) {
        try {
          const minified = await minify(path.resolve("src", filename))
          const prod = "javascript:(() => {" + minified + "})()"
          const dev = prod.slice(1)

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
})()
