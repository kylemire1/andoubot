const tmi = require("tmi.js");

const client = new tmi.Client({
  options: { debug: true, messagesLogLevel: "info" },
  connection: {
    reconnect: true,
    secure: true,
  },
  identity: {
    username: process.env.TWITCH_BOT_USERNAME,
    password: process.env.TWITCH_BOT_AUTH_TOKEN,
  },
  channels: [process.env.TWITCH_CHANNEL_NAME],
});

module.exports = client;
