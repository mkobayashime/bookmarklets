import { copyToClipboard } from "./utils/copyToClipboard"

/**
 * @title Amazon.co.jp - Copy sharable description
 * @description Copy name and normalized link of the current item to clipboard
 */

//
;(async () => {
  if (!window.location.href.startsWith("https://www.amazon.co.jp")) return

  const itemIDMatch = new RegExp(
    "^https://www.amazon.co.jp/[^/]+/dp/(\\d+)/"
  ).exec(window.location.href)
  if (!itemIDMatch || typeof itemIDMatch[1] !== "string") return

  const itemID = itemIDMatch[1]
  const normalizedURL = `https://www.amazon.co.jp/dp/${itemID}/`

  const productTitleElement = document.getElementById("productTitle")
  if (!productTitleElement || productTitleElement.innerText === "") return

  const sharableText = `${productTitleElement.innerText}\n${normalizedURL}`

  console.log(sharableText)
  await copyToClipboard(sharableText, false)
})().catch((err) => {
  console.error(err)
})

export {}
