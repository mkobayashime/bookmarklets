/**
 * @title 調整さん I'm free
 * @description 調整さんの全日程候補で○を選択します
 */

;(() => {
  if (window.location.href.startsWith("https://chouseisan.com/s")) {
    const formOpenButton = document.getElementById("add_btn")
    if (formOpenButton) formOpenButton.click()

    const choiceInputs = Array.from(
      document.querySelectorAll("#choice td input[type='hidden']")
    )
    if (choiceInputs.length === 0) return
    choiceInputs.forEach((input) => (input.value = 1))

    const choice1Buttons = Array.from(document.getElementsByClassName("oax-0"))
    const choice3Buttons = Array.from(document.getElementsByClassName("oax-2"))
    if (choice1Buttons.length === 0 || choice3Buttons.length === 0) return
    ;[...choice1Buttons, ...choice3Buttons].forEach((div) =>
      div.classList.toggle("active")
    )
  }
})()
