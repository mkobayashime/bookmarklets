javascript:(()=>{const%20enableSelection%3D()%3D%3E%7Bconst%20e%3Ddocument.body%2Ct%3De.parentNode%3Bt.removeChild(e)%2Ct.appendChild(e.cloneNode(!0))%7D%2CwriteLyrics%3D(e%2Ct%3D!0)%3D%3E%7Bif(e)if(console.log(e)%2Ct)window.navigator.clipboard.writeText(e)%3Belse%7Bconst%20t%3Ddocument.createElement(%22textarea%22)%3Bt.textContent%3De%2Cdocument.body.appendChild(t)%2Ct.select()%2Cdocument.execCommand(%22copy%22)%7D%7D%2CgoogleSearch%3D()%3D%3E%7Bconst%20e%3Ddocument.querySelector(%22div%5Bdata-lyricid%5D%22)%3Bif(!e)return%3Bconst%20t%3De.children%5B1%5D%3Bif(!t)return%3Bconst%20n%3DArray.from(t.children)%3Breturn%20n%26%260!%3D%3Dn.length%3Fn.map((e%3D%3Ee.innerText)).join(%22%5Cn%5Cn%22)%3Avoid%200%7D%2CutaNet%3D()%3D%3E%7BenableSelection()%3Bconst%20e%3Ddocument.getElementById(%22kashi_area%22)%3Bif(e)return%20e.innerText%7D%3Bwindow.location.href.startsWith(%22https%3A%2F%2Fwww.google.com%2Fsearch%22)%26%26writeLyrics(googleSearch()%2C!1)%2Cwindow.location.href.startsWith(%22https%3A%2F%2Fwww.uta-net.com%2Fsong%2F%22)%26%26writeLyrics(utaNet())%3B})()