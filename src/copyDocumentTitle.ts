/**
 * @title Copy document title
 * @description Copy the value of `<title>` element to clipboard
 */

import { copyToClipboard } from "./utils/copyToClipboard"

const titleElement = document.querySelector("title")

copyToClipboard(titleElement.innerText, false)
