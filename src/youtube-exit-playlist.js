const location = window.location.href
const url = new URL(location)
url.searchParams.delete("list")
url.searchParams.delete("index")
window.location.href = url.toString()
