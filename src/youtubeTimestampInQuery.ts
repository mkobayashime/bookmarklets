/**
 * @title YouTube - Timestamp in URL
 * @description Put current timestamp to the `t` query parameter
 */

const video = document.querySelector("video")
if (video) {
  const timestamp = Math.floor(video.currentTime)

  const location = window.location.href
  const url = new URL(location)
  url.searchParams.set("t", String(timestamp) + "s")
  window.history.pushState({}, "", url)
}

export {}
