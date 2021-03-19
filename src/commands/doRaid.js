function doRaid(message, client) {
  const username = message.split(" ")[1];

  client.say(
    `#${process.env.TWITCH_CHANNEL_NAME}`,
    `Heading on over to https://twitch.tv/${username}! Be good my minions!`
  );
}

module.exports = doRaid;
