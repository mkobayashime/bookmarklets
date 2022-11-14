export const copyToClipboard = async (text: string) => {
  if (!text) return

  console.log(text)

  try {
    await window.navigator.clipboard.writeText(text)
  } catch (_) {
    const textarea = document.createElement("textarea")
    textarea.textContent = text
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand("copy")
    textarea.remove()
  }
}
