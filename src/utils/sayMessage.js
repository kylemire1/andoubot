function sayMessage(client, message) {
  client.say(`#${process.env.TWITCH_CHANNEL_NAME}`, message);
}

module.exports = sayMessage;
