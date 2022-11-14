/**
 * @title Copy document title
 * @description Copy the value of `<title>` element to clipboard
 */

import { copyToClipboard } from "./utils/copyToClipboard"

const titleElement = document.querySelector("title")
const title = titleElement?.innerText

;(async () => {
  if (title) await copyToClipboard(title)
})().catch((err) => console.error(err))
