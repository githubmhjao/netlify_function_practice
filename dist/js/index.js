async function sendShare() {
  const params = fetchParams()
  const result = await liff.shareTargetPicker([
    {
  "type": "bubble",
  "body": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "image",
                "url": "https://scdn.line-apps.com/n/channel_devcenter/img/flexsnapshot/clip/clip13.jpg",
                "aspectMode": "cover",
                "size": "full"
              }
            ],
            "cornerRadius": "100px",
            "width": "72px",
            "height": "72px"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "manager",
                "color": "#aaaaaa",
                "weight": "bold"
              },
              {
                "type": "text",
                "contents": [],
                "size": "xl",
                "wrap": true,
                "text": params.name,
                "weight": "bold"
              },
              {
                "type": "text",
                "text": params.com,
                "margin": "10px"
              }
            ]
          }
        ],
        "spacing": "xl",
        "paddingAll": "20px"
      },
      {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "☎",
                "flex": 1,
                "color": "#15857b",
                "weight": "bold"
              },
              {
                "type": "text",
                "text": params.phone,
                "flex": 4
              }
            ]
          },
          {
            "type": "box",
            "layout": "horizontal",
            "contents": [
              {
                "type": "text",
                "text": "✉",
                "flex": 1,
                "weight": "bold",
                "color": "#15857b"
              },
              {
                "type": "text",
                "text": params.email,
                "flex": 4
              }
            ]
          }
        ],
        "paddingStart": "20px",
        "paddingEnd": "20px",
        "paddingBottom": "20px"
      }
    ],
    "paddingAll": "0px"
  }
}
  ])
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
