function doShoutout(message, client) {
  const username = message.split(" ")[1];

  client.say(
    `#${process.env.TWITCH_CHANNEL_NAME}`,
    `GO CHECK OUT @${username} at https://twitch.tv/${username}!`
  );
}

module.exports = doShoutout;
