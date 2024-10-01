/**
 * @title YouTube - Clear timestamp in URL
 * @description Clear `t` query parameter representing timestamp
 */

const url = new URL(window.location.href);
url.searchParams.delete("t");
window.history.pushState({}, "", url);

export {};
