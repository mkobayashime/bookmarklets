const sleep = (n) => new Promise((resolve) => window.setTimeout(resolve, n))

//
;(async () => {
  const chatIFrame = document.getElementById("chatframe")
  if (!chatIFrame) return

  const selectButton = chatIFrame.contentWindow.document.querySelector(
    '[aria-label="Live Chat mode selection"]'
  )
  if (!selectButton) return
  selectButton.click()

  await sleep(300)

  const firstOption = chatIFrame.contentWindow.document.querySelector(
    "tp-yt-paper-listbox a"
  )
  if (!firstOption) return
  firstOption.click()
})()
