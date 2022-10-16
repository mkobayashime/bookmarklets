// docgen-ignore

const STORAGE_KEY = "__google_maps_auth_user"

//
;(() => {
  if (!window.location.href.startsWith("https://www.google.com/maps/")) {
    return
  }

  const searchParams = new URLSearchParams(window.location.search)
  const authUserQuery = searchParams.get("authuser")

  if (authUserQuery) {
    window.localStorage.setItem(STORAGE_KEY, authUserQuery)
  }
})()

export {}
