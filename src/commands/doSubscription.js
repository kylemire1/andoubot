function doSubscription(username, client) {
  client.say(
    `#${process.env.TWITCH_CHANNEL_NAME}`,
    `@${username} just subbed! Say hello to my newest minion!`
  );
}

module.exports = doSubscription;
