async function sendShare() {
  const result = await liff.shareTargetPicker([
    {
      "type": "flex",
      "altText": "Flex Message",
      "contents": {
        "type": "bubble",
        "body": {
          "type": "box",
          "layout": "vertical",
          "spacing": "md",
          "contents": [
            {
              "type": "text",
              "text": "BROWN'S ADVENTURE",
              "size": "xl",
              "gravity": "center",
              "weight": "bold",
              "wrap": true
            },
            {
              "type": "box",
              "layout": "vertical",
              "spacing": "sm",
              "margin": "lg",
              "contents": [
                {
                  "type": "box",
                  "layout": "baseline",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "text",
                      "text": "Date",
                      "flex": 1,
                      "size": "sm",
                      "color": "#AAAAAA"
                    },
                    {
                      "type": "text",
                      "text": "Monday 25, 9:00PM",
                      "flex": 4,
                      "size": "sm",
                      "color": "#666666",
                      "wrap": true
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "baseline",
                  "spacing": "sm",
                  "contents": [
                    {
                      "type": "text",
                      "text": "Place",
                      "flex": 1,
                      "size": "sm",
                      "color": "#AAAAAA"
                    },
                    {
                      "type": "text",
                      "text": "LINE Thailand",
                      "flex": 4,
                      "size": "sm",
                      "color": "#666666",
                      "wrap": true
                    }
                  ]
                },
                {
                  "type": "box",
                  "layout": "vertical",
                  "margin": "xxl",
                  "contents": [
                    {
                      "type": "spacer"
                    },
                    {
                      "type": "image",
                      "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/linecorp_code_withborder.png",
                      "size": "xl",
                      "aspectMode": "cover"
                    },
                    {
                      "type": "text",
                      "text": "You can enter the theater by using this code instead of a ticket",
                      "margin": "xxl",
                      "size": "xs",
                      "color": "#AAAAAA",
                      "wrap": true
                    }
                  ]
                }
              ]
            }
          ]
        }
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
    if (!liff.isInClient()) {
      document.getElementById("btnLogOut").style.display = "block"
    }
  } else {
    document.getElementById("btnLogin").style.display = "block"
  }
}

function fetchData() {
  const urlParams = new URLSearchParams(window.location.search)
  document.getElementById("setName").innerText = urlParams.get('1')
  document.getElementById("setCom").innerText = urlParams.get('2')
  document.getElementById("setPhone").innerText = urlParams.get('3')
}

function main() {
  liffInit()
  fetchData()
}
main()
