const canUseCommand = (senderData) => {
  return (
    senderData.mod ||
    [process.env.BOT_ADMIN_USERNAME, "ky345"].includes(senderData.username)
  );
};

module.exports = canUseCommand;
