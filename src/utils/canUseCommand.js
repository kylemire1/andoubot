const canUseCommand = (sender) =>
  sender === process.env.BOT_ADMIN_USERNAME || sender === "ky345";

module.exports = canUseCommand;
