/**
 * @title YouTube - Exit from playlist
 * @description Exit from playlist and play current video alone
 */

const location = window.location.href
const url = new URL(location)
url.searchParams.delete("list")
url.searchParams.delete("index")
window.location.href = url.toString()

export {}
