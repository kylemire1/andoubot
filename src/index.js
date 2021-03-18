require("dotenv").config();
const tmi = require("tmi.js");
const express = require("express");
const app = express();
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
  channels: [`${process.env.TWITCH_CHANNEL_NAME}`],
});

client.connect().catch(console.error);

client.on("message", (channel, tags, message, self) => {
  if (self) return;
  if (message.toLowerCase() === "!hello") {
    client.say(channel, `@${tags.username}, heya!`);
    io.emit("command", message);
  }
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

app.get("/", (req, res) => {
  res.json({ message: "Online" });
});

const PORT = process.env.PORT || 8080;

http.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
