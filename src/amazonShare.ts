import { copyToClipboard } from "./utils/copyToClipboard"

/**
 * @title Amazon.co.jp - Copy sharable description
 * @description Copy name and normalized link of the current item to clipboard
 */

//
;(async () => {
  if (!window.location.href.startsWith("https://www.amazon.co.jp")) return

  const itemIDMatch = new RegExp(
    "^https://www.amazon.co.jp/[^/]+/dp/([^/]+)/"
  ).exec(window.location.href)
  if (!itemIDMatch || typeof itemIDMatch[1] !== "string") {
    console.error("Failed to retrieve ID of the item from URL")
    return
  }

  const itemID = itemIDMatch[1]
  const normalizedURL = `https://www.amazon.co.jp/dp/${itemID}/`

  const productTitleElement = document.getElementById("productTitle")
  if (!productTitleElement || productTitleElement.innerText === "") {
    console.error("Failed to get name of the item")
    return
  }

  const sharableText = `${productTitleElement.innerText}\n${normalizedURL}`

  console.log(sharableText)
  await copyToClipboard(sharableText, false)
})().catch((err) => {
  console.error(err)
})

export {}
