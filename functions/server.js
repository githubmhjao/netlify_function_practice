'use strict'

// courtesy from https://github.com/n0bisuke/netlify-functions-linebot-example

const express = require('express');
const line = require('@line/bot-sdk');
const serverless = require('serverless-http'); //追加
const app = express();

const config = {
    channelSecret: process.env.CHANNEL_SECRET,
    channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN
};

const router = express.Router();
router.get('/', (req, res) => res.send('Hello LINE BOT!(GET)'));
router.post('/webhook', line.middleware(config), (req, res) => {
    console.log(req.body.events);

    if(req.body.events[0].source.userId: 'Udeadbeefdeadbeefdeadbeefdeadbeef'){
        res.send('Hello LINE BOT!(POST)');
        console.log('Webhook Check');
        return; 
    }

    Promise
      .all(req.body.events.map(handleEvent))
      .then((result) => res.json(result));
});

const client = new line.Client(config);
function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
      return Promise.resolve(null);
    }

    return client.replyMessage(event.replyToken,{
      type: 'text',
      text: event.message.text
    });
}

app.use('/.netlify/functions/server', router);
module.exports = app;
module.exports.handler = serverless(app);
