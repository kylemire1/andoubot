require("dotenv").config();
const tmi = require("tmi.js");
const doDiscord = require("./commands/doDiscord");
const doRaid = require("./commands/doRaid");
const doShoutout = require("./commands/doShoutout");
const doCommissions = require("./commands/doCommissions");
const doTwit = require("./commands/doTwit");
const doRequest = require("./commands/doRequest");
const doTip = require("./commands/doTip");
const doSubscription = require("./commands/doSubscription");
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

  const msg = message.toLowerCase();

  if (msg === "!feed") {
    io.emit("command", tags.username);
  } else if (msg.startsWith("!so")) {
    doShoutout(msg, client);
  } else if (msg.startsWith("!raid")) {
    doRaid(msg, client);
  } else if (msg.startsWith("!twit")) {
    doTwit(msg, client);
  } else if (msg === "!discord") {
    doDiscord(client);
  } else if (msg === "!commissions") {
    doCommissions(client);
  } else if (msg === "!request") {
    doRequest(client);
  } else if (msg === "!tip") {
    doTip(client);
  }
});

client.on("cheer", (channel, userstate) => {
  io.emit("cheer", userstate);
});

client.on("subscription", (_channel, username) => {
  doSubscription(username, client);
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
  socket.on("bits-food", ({ username, bits }) => {
    client.say(
      `#${process.env.TWITCH_CHANNEL_NAME}`,
      `@${username} cheered for ${bits}! Thanks for the food`
    );
  });
  socket.on("bits-no-food", ({ username, bits }) => {
    client.say(
      `#${process.env.TWITCH_CHANNEL_NAME}`,
      `@${username} cheered for ${bits}!`
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
