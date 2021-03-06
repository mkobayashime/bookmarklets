/**
 * @title Copy document title
 * @description Copy the value of `<title>` element to clipboard
 */

const copyToClipboard = (text, useClipboardAPI = true) => {
  if (!text) return

  console.log(text)

  if (useClipboardAPI) {
    // tend to fail due to CSP
    window.navigator.clipboard.writeText(text)
  } else {
    const textarea = document.createElement("textarea")
    textarea.textContent = text
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand("copy")
    textarea.remove()
  }
}

const titleElement = document.querySelector("title")

copyToClipboard(titleElement.innerText, false)
