require("dotenv").config();
const tmi = require("tmi.js");
const doDiscord = require("./commands/doDiscord");
const doRaid = require("./commands/doRaid");
const doShoutout = require("./commands/doShoutout");
const doCommissions = require("./commands/doCommissions");
const doTwit = require("./commands/doTwit");
const doRequest = require("./commands/doRequest");
const doTip = require("./commands/doTip");
const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const client = new tmi.Client({
  options: { debug: true, messagesLogLevel: "info" },
  connection: {
    reconnect: true,
    secure: true,
  },
  identity: {
    username: process.env.TWITCH_BOT_USERNAME,
    password: process.env.TWITCH_BOT_AUTH_TOKEN,
  },
  channels: [process.env.TWITCH_CHANNEL_NAME],
});

client.connect().catch(console.error);

client.on("message", (channel, tags, message, self) => {
  if (self) return;
  if (message.toLowerCase() === "!feed") {
    io.emit("command", tags.username);
  }

  if (message.startsWith("!so")) {
    doShoutout(message, client);
  } else if (message.startsWith("!raid")) {
    doRaid(message, client);
  } else if (message.startsWith("!twit")) {
    doTwit(message, client);
  } else if (message === "!discord") {
    doDiscord(client);
  } else if (message === "!commissions") {
    doCommissions(client);
  } else if (message === "!request") {
    doRequest(client);
  } else if (message === "!tip") {
    doTip(client);
  }
});

client.on("cheer", (channel, userstate) => {
  io.emit("cheer", userstate);
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("do-thank", (username) => {
    client.say(
      `#${process.env.TWITCH_CHANNEL_NAME}`,
      `Thanks for the food, @${username}!`
    );
  });
  socket.on("dont-thank", (username) => {
    client.say(
      `#${process.env.TWITCH_CHANNEL_NAME}`,
      `You already fed me, @${username}!`
    );
  });
});

app.get("/", (req, res) => {
  res.json({ message: "Online" });
});

const PORT = process.env.PORT || 8080;

http.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
