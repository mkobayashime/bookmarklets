/**
 * @title Exec bookmarklet in clipboard
 * @description Useful for debugging bookmarklets
 */

;(async () => {
  const bookmarklet = decodeURIComponent(
    await window.navigator.clipboard.readText()
  )
  if (!bookmarklet.startsWith("javascript:")) {
    window.alert("Invalid format bookmarklet.")
    return
  }

  const scriptElement = document.createElement("script")
  scriptElement.textContent = bookmarklet.replace("javascript:", "")
  document.head.appendChild(scriptElement)
})()
