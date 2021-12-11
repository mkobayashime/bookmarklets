/**
 * @title Copy lyrics
 *
 * @description
 * Automatically Copy lyrics to clipboard
 * in supported sites.
 */

const enableSelection = () => {
  const a = document.body
  const b = a.parentNode
  b.removeChild(a), b.appendChild(a.cloneNode(!0))
}

const writeLyrics = (lyrics, useClipboardAPI = true) => {
  if (!lyrics) return

  console.log(lyrics)

  if (useClipboardAPI) {
    // tend to fail due to CSP
    window.navigator.clipboard.writeText(lyrics)
  } else {
    const textarea = document.createElement("textarea")
    textarea.textContent = lyrics
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand("copy")
    textarea.remove()
  }
}

const googleSearch = () => {
  const wrapper = document.querySelector("div[data-lyricid]")
  if (!wrapper) return

  const paragraphsWrapper = wrapper.children[1]
  if (!paragraphsWrapper) return

  const paragraphs = Array.from(paragraphsWrapper.children)
  if (!paragraphs || paragraphs.length === 0) return

  return paragraphs.map((element) => element.innerText).join("\n\n")
}

const utaNet = () => {
  enableSelection()
  const area = document.getElementById("kashi_area")
  if (!area) return
  return area.innerText
}

const jLyric = () => {
  const wrapper = document.getElementById("Lyric")
  if (!wrapper) return
  return wrapper.innerText
}

//
;(() => {
  const url = window.location.href

  if (url.startsWith("https://www.google.com/search")) {
    writeLyrics(googleSearch(), false)
  }

  if (url.startsWith("https://www.uta-net.com/song/")) {
    writeLyrics(utaNet())
  }

  if (url.startsWith("https://j-lyric.net/")) {
    writeLyrics(jLyric(), false)
  }
})()
