javascript:(()=>{var%20a%3Dasync(e%2Ct%3D!0)%3D%3E%7Bif(e)if(console.log(e)%2Ct)await%20window.navigator.clipboard.writeText(e)%3Belse%7Blet%20t%3Ddocument.createElement(%22textarea%22)%3Bt.textContent%3De%2Cdocument.body.appendChild(t)%2Ct.select()%2Cdocument.execCommand(%22copy%22)%2Ct.remove()%7D%7D%3B(async()%3D%3E%7Bif(!window.location.href.startsWith(%22https%3A%2F%2Fwww.amazon.co.jp%22))return%3Blet%20e%3Ddocument.querySelector('link%5Brel%3D%22canonical%22%5D')%3Bif(!e)return%20void%20window.alert(%22Failed%20to%20get%20normalized%20URL%22)%3Blet%20t%3Dnew%20URL(e.href)%3Bt.search%3D%22%22%2Ct.hash%3D%22%22%3Blet%20o%3Dnew%20RegExp(%22%5Ehttps%3A%2F%2Fwww.amazon.co.jp%2F%5B%5E%2F%5D%2B%2Fdp%2F(%5B%5E%2F%5D%2B)%22).exec(t.toString())%3Bif(!o%7C%7C%22string%22!%3Dtypeof%20o%5B1%5D)return%20void%20window.alert(%22Failed%20to%20retrieve%20ID%20of%20the%20item%20from%20canonical%20URL%22)%3Blet%20n%3D%60https%3A%2F%2Fwww.amazon.co.jp%2Fdp%2F%24%7Bo%5B1%5D%7D%2F%60%2Ci%3Ddocument.getElementById(%22productTitle%22)%3Bif(!i%7C%7C%22%22%3D%3D%3Di.innerText)return%20void%20window.alert(%22Failed%20to%20get%20name%20of%20the%20item%22)%3Blet%20r%3D%60%24%7Bi.innerText%7D%5Cn%24%7Bn%7D%60%3Bawait%20a(r%2C!1)%7D)().catch((e%3D%3E%7Bconsole.error(e)%7D))%3B})()