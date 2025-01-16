/**
 * @title Google - Search in Japanese
 */

if (window.location.href.startsWith("https://www.google.com/search")) {
	const url = new URL(window.location.href);
	url.searchParams.set("lr", "lang_ja");
	window.location.href = url.toString();
}
