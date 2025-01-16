/**
 * @title Google - Search in English
 */

if (window.location.href.startsWith("https://www.google.com/search")) {
	const url = new URL(window.location.href);
	url.searchParams.set("lr", "lang_en");
	window.location.href = url.toString();
}
