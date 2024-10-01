/**
 * @title Twitter - Search from the user
 * @description Search tweets from the user shown in the page with the provided query
 */

(() => {
  if (!window.location.href.startsWith("https://twitter.com/")) return;

  const userName: string | undefined = window.location.pathname.split("/")[1];
  if (!userName) return;

  const query = window.prompt("Query?");
  if (!query) return;

  window.location.href = `https://twitter.com/search?q=${encodeURIComponent(
    query,
  )}%20from%3A${encodeURIComponent(userName)}&f=live`;
})();
