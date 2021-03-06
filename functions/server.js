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

function readRecord(userId) {
    try {
        return JSON.parse(fs.readFileSync(`/tmp/${userId}.txt`, 'utf8'))
    } catch (err) {
        return {stage: 0, reply: []}
    }
}

function updateRecord(userId, record, message) {
    
    record.reply.push(message)
    record.stage += 1
    
    if (record.stage < 4) {
        fs.writeFileSync(`/tmp/${userId}.txt`, JSON.stringify(record))
    } else {
        fs.unlinkSync(`/tmp/${userId}.txt`)
    }
    
    return record
}

function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
      return Promise.resolve(null)
    }

    const userId = event.source.userId
    let record
    record = readRecord(userId)
    record = updateRecord(userId, record, event.message.text)
    const replyText = JSON.stringify(record)
    console.log(replyText)

//    console.log('__dirname：', __dirname)
//    console.log('__filename：', __filename)
//    console.log('process.cwd()：', process.cwd())
//    console.log('./：', path.resolve('./'))
    
    return client.replyMessage(event.replyToken,{
      type: 'text',
      text: `${replyText} for Netlify`
    })
}

app.use('/.netlify/functions/server', router)
module.exports = app
module.exports.handler = serverless(app)
