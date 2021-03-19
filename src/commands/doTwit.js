function doTwit(message, client) {
  const username = message.split(" ")[1];

  client.say(
    `#${process.env.TWITCH_CHANNEL_NAME}`,
    `Here is ${username}'s Twitter: https://www.twitter.com/${username}`
  );
}

module.exports = doTwit;
