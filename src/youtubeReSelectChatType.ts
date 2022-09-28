import { sleep } from "./utils/sleep"

// docgen-ignore

//
;(async () => {
  const chatIFrame = document.getElementById("chatframe")
  if (!chatIFrame || !(chatIFrame instanceof HTMLIFrameElement)) return

  const selectButton = chatIFrame.contentWindow?.document.querySelector(
    '[aria-label="Live Chat mode selection"]'
  )
  if (!selectButton || !(selectButton instanceof HTMLElement)) return
  selectButton.click()

  await sleep(300)

  const firstOption = chatIFrame.contentWindow?.document.querySelector(
    "tp-yt-paper-listbox a"
  )
  if (!firstOption || !(firstOption instanceof HTMLElement)) return
  firstOption.click()
})()
