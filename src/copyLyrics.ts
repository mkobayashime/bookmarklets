/**
 * @title Copy lyrics
 *
 * @description
 * Automatically Copy lyrics to clipboard
 * in supported sites
 */

import { copyToClipboard } from "./utils/copyToClipboard"
import { enableSelection } from "./utils/enableSelection"

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
    copyToClipboard(googleSearch(), false)
  }

  if (url.startsWith("https://www.uta-net.com/song/")) {
    copyToClipboard(utaNet())
  }

  if (url.startsWith("https://j-lyric.net/")) {
    copyToClipboard(jLyric(), false)
  }
})()
