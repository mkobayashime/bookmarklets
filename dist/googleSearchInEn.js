javascript:(()=>{if(window.location.href.startsWith(%22https%3A%2F%2Fwww.google.com%2Fsearch%22))%7Blet%20o%3Dnew%20URL(window.location.href)%3Bo.searchParams.set(%22lr%22%2C%22lang_en%22)%2Cwindow.location.href%3Do.toString()%7D})()