function doDiscord(client) {
  client.say(
    `#${process.env.TWITCH_CHANNEL_NAME}`,
    `Come join the little demon family on Discord! 21+ ONLY https://discord.com/invite/vBFqsB3s5k`
  );
}

module.exports = doDiscord;
