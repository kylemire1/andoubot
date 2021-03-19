function doTip(client) {
  client.say(
    `#${process.env.TWITCH_CHANNEL_NAME}`,
    `You can tip me here! https://streamlabs.com/andouilles/tip`
  );
}

module.exports = doTip;
