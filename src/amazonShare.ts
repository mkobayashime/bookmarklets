import { copyToClipboard } from "./utils/copyToClipboard"

/**
 * @title Amazon.co.jp - Copy sharable description
 * @description Copy name and normalized link of the current item to clipboard
 */

//
;(async () => {
  if (!window.location.href.startsWith("https://www.amazon.co.jp")) return

  const canonicalLinkElement = document.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]'
  )
  if (!canonicalLinkElement) {
    window.alert("Failed to get normalized URL")
    return
  }

  const canonicalURL = new URL(canonicalLinkElement.href)
  canonicalURL.search = ""
  canonicalURL.hash = ""

  const itemIDMatch = new RegExp(
    "^https://www.amazon.co.jp/[^/]+/dp/([^/]+)"
  ).exec(canonicalURL.toString())
  if (!itemIDMatch || typeof itemIDMatch[1] !== "string") {
    window.alert("Failed to retrieve ID of the item from canonical URL")
    return
  }

  const itemID = itemIDMatch[1]
  const normalizedURL = `https://www.amazon.co.jp/dp/${itemID}/`

  const productTitleElement = document.getElementById("productTitle")
  if (!productTitleElement || productTitleElement.innerText === "") {
    window.alert("Failed to get name of the item")
    return
  }

  const sharableText = `${productTitleElement.innerText}\n${normalizedURL}`

  await copyToClipboard(sharableText, false)
})().catch((err) => {
  console.error(err)
})

export {}
