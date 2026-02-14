/**
 * @title Copy document title
 * @description Copy title of the document to clipboard
 */

import { copyToClipboard } from "./utils/copyToClipboard";

void (async () => {
	if (document.title) {
		await copyToClipboard(document.title, false);
	} else {
		window.alert("Failed to get document title");
	}
})();
