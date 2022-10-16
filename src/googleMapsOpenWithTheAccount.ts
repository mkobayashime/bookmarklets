// docgen-ignore

const STORAGE_KEY = "__google_maps_auth_user"

//
;(() => {
  if (!window.location.href.startsWith("https://www.google.com/maps/")) {
    return
  }

  const authUser = window.localStorage.getItem(STORAGE_KEY)

  if (authUser) {
    window.location.href = `https://www.google.com/maps?authuser=${authUser}&hl=ja`
  }
})()

export {}
