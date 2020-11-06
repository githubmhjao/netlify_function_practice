'use strict'

// courtesy from https://github.com/n0bisuke/netlify-functions-linebot-example

const express = require('express');
const line = require('@line/bot-sdk');
const serverless = require('serverless-http');
const app = express();

const config = {
    channelSecret: process.env.lineChannelSecret,
    channelAccessToken: process.env.lineChannelAccessToken
};

const router = express.Router();

router.get('/', (req, res) => res.send('Hello LINE BOT!(GET)'));
router.post('/webhook', line.middleware(config), (req, res) => {
    // console.log(config);
    console.log(req.body.events);

    if(req.body.events.length == 0){
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
      text: `${event.message.text} for Netlify`
    });
}

app.use('/.netlify/functions/server', router);
module.exports = app;
module.exports.handler = serverless(app);
