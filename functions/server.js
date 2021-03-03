'use strict'

// courtesy from https://github.com/n0bisuke/netlify-functions-linebot-example

const express = require('express')
const line = require('@line/bot-sdk')
const serverless = require('serverless-http')
const fs = require('fs')
const path = require('path')

const app = express()

const config = {
    channelSecret: process.env.lineChannelSecret,
    channelAccessToken: process.env.lineChannelAccessToken
}

const router = express.Router()

router.get('/', (req, res) => res.send('Hello LINE BOT!(GET)'))
router.post('/webhook', line.middleware(config), (req, res) => {
    // console.log(config)
    console.log(req.body.events)

    if(req.body.events.length == 0){
        res.send('Hello LINE BOT!(POST)')
        console.log('Webhook Check')
        return
    }

    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result))
});

const client = new line.Client(config)
function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
      return Promise.resolve(null)
    }

    console.log(event)
    const userId = event.source.userId
    
//    fs.writeFile(`${userId}.txt`, 'This is my text', function (err) {
//      if(err) return console.error(err)
//      console.log(`successfully write ${userId}.txt`)
//    })
    console.log('__dirname：', __dirname)
    console.log('__filename：', __filename)
    console.log('process.cwd()：', process.cwd())
    console.log('./：', path.resolve('./'))
    
    fs.readdir('.', (err, files) => {
      files.forEach(file => {
        console.log(file)
      })
    })
    
    return client.replyMessage(event.replyToken,{
      type: 'text',
      text: `${event.message.text} for Netlify`
    })
}

app.use('/.netlify/functions/server', router)
module.exports = app
module.exports.handler = serverless(app)
