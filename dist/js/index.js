async function sendShare() {
  const params = fetchParams()
  const result = await liff.shareTargetPicker([{
  "type": "bubble", // ①
  "body": { // ②
    "type": "box", // ③
    "layout": "horizontal", // ④
    "contents": [ // ⑤
      {
        "type": "text", // ⑥
        "text": "Hello,"
      },
      {
        "type": "text", // ⑥
        "text": "World!"
      }
    ]
  }
}])
  if (result) {
    alert(`[${result.status}] Message sent!`)
  } else {
    const [majorVer, minorVer, patchVer] = (liff.getLineVersion() || "").split('.');

    if (minorVer === undefined) {
      alert('ShareTargetPicker was canceled in external browser')
      return
    }

    if (parseInt(majorVer) >= 10 && parseInt(minorVer) >= 10 && parseInt(patchVer) > 0) {
      alert('ShareTargetPicker was canceled in LINE app')
    }
  }
}
function logOut() {
  liff.logout()
  window.location.reload()
}
async function liffInit() {
  await liff.init({ liffId: "1655909873-X2Ed918K" })
  if (liff.isLoggedIn()) {
    document.getElementById("btnShare").style.display = "block"
    document.getElementById("card").style.display = "block"
    if (!liff.isInClient()) {
      document.getElementById("btnLogOut").style.display = "block"
    }
  } else {
    document.getElementById("btnLogin").style.display = "block"
    document.getElementById("card").style.display = "none"
  }
}

function fetchParams() {
  const urlParams = new URLSearchParams(window.location.search)
  const name = urlParams.get('1')
  const com = urlParams.get('2')
  const phone = urlParams.get('3')
  const email = urlParams.get('4')
  document.getElementById("setName").innerText = name
  document.getElementById("setCom").innerText = com
  document.getElementById("setPhone").innerText = phone
  document.getElementById("setEmail").innerText = email
  
  return {name, com, phone, email}
}

function main() {
  liffInit()
  fetchParams()
}
main()
