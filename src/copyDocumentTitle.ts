/**
 * @title Copy document title
 * @description Copy the value of `<title>` element to clipboard
 */

import { copyToClipboard } from "./utils/copyToClipboard";

const titleElement = document.querySelector("title");
const title = titleElement?.innerText.trim().split("\n").join("");
(async () => {
	if (title) await copyToClipboard(title, false);
})().catch((err) => console.error(err));
