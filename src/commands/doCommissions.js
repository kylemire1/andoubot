function doCommisions(client) {
  client.say(
    `#${process.env.TWITCH_CHANNEL_NAME}`,
    `See my commission menu & prices here: https://ko-fi.com/andouilles/commissions`
  );
}

module.exports = doCommisions;
