require("dotenv").config();
const canUseCommand = require("./utils/canUseCommand");
const client = require("./tmi-client");
const sayMessage = require("./utils/sayMessage");
const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

client.connect().catch(console.error);

client.on("message", (_channel, tags, message, self) => {
  if (self) return;

  const msg = message.toLowerCase();

  if (msg === "!feed") {
    io.emit("command", tags.username);
  } else if (msg.startsWith("!so") && canUseCommand(tags)) {
    const username = message.split(" ")[1];
    sayMessage(
      client,
      `GO CHECK OUT @${username} at https://twitch.tv/${username}!`
    );
  } else if (
    msg.startsWith("!raid") &&
    msg !== "!raiders" &&
    canUseCommand(tags)
  ) {
    const username = message.split(" ")[1];
    sayMessage(
      client,
      `Heading on over to https://twitch.tv/${username}! Be good my minions!`
    );
  } else if (msg.startsWith("!twit") && canUseCommand(tags)) {
    const username = message.split(" ")[1];
    sayMessage(
      client,
      `Here is ${username}'s Twitter: https://www.twitter.com/${username}`
    );
  } else if (msg === "!discord") {
    sayMessage(
      client,
      `Come join the little demon family on Discord! 21+ ONLY https://discord.com/invite/vBFqsB3s5k`
    );
  } else if (msg === "!commissions") {
    sayMessage(
      client,
      `See my commission menu & prices here: https://ko-fi.com/andouilles/commissions`
    );
  } else if (msg === "!request") {
    sayMessage(
      client,
      `
    --- SKETCH REQUEST RULES ---

    ---  1. if i do not draw your request DO NOT KEEP RE-REQUESTING IT IN CHAT ---
    
    ---  2. characters from existing fandoms only. ---
    
    ---  3. single subject only (no couples). ---
    
    ---  4. NO OCs! ---
    
    ---  5. no NSFW requests. ---
    
    ---  6. tips are appreciated but not required! ---
    `
    );
  } else if (msg === "!tip") {
    sayMessage(
      client,
      `You can tip me here! https://streamlabs.com/andouilles/tip`
    );
  } else if (
    msg === "!mostlove" &&
    (tags.username === process.env.BOT_ADMIN_USERNAME ||
      tags.username === "ky345")
  ) {
    io.emit("most-love");
  } else if (msg.toLowerCase() === process.env.FUNNY_COMMAND_1) {
    sayMessage(client, `nice`);
  } else if (msg.toLowerCase() === "!gimmemiku") {
    sayMessage(
      client,
      `MikuLegs MikuNyaa mikuJig mikuParty mikuDance MikuLegs MikuNyaa mikuJig mikuParty mikuDance MikuLegs MikuNyaa mikuJig mikuParty mikuDance MikuLegs MikuNyaa mikuJig mikuParty mikuDance MikuLegs MikuNyaa mikuJig mikuParty mikuDance MikuLegs MikuNyaa mikuJig mikuParty mikuDance MikuLegs MikuNyaa mikuJig mikuParty mikuDance MikuLegs MikuNyaa mikuJig mikuParty mikuDance MikuLegs MikuNyaa mikuJig mikuParty mikuDance MikuLegs MikuNyaa mikuJig mikuParty mikuDance MikuLegs MikuNyaa mikuJig mikuParty mikuDance MikuLegs MikuNyaa mikuJig mikuParty mikuDance`
    );
  } else if (msg.toLowerCase() === process.env.FUNNY_COMMAND_2) {
    sayMessage(client, process.env.FUNNY_COMMAND_2_OUT);
  } else if (msg.toLowerCase() === "!lurk") {
    sayMessage(client, `thanks for stopping by! enjoy lurking~`);
  } else if (msg.toLowerCase() === "!raiders") {
    sayMessage(
      client,
      `Stream Raiders is a community-based battle game played alongside the stream! It's a fun little game we can all participate in! Go place some units here: https://www.streamraiders.com/game/`
    );
  } else if (msg.toLowerCase() === "!kimi") {
    sayMessage(
      client,
      `Go follow my lovely co-host kimispice! https://www.twitch.tv/kimispice`
    );
  }
});

client.on("cheer", (_channel, userstate) => {
  io.emit("cheer", userstate);
});

client.on("subscription", (_channel, username) => {
  sayMessage(
    client,
    `@${username} just subbed! Say hello to my newest minion!`
  );
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("do-thank", (username) => {
    sayMessage(client, `Thanks for the food, @${username}!`);
  });
  socket.on("dont-thank", (username) => {
    sayMessage(client, `You already fed me, @${username}!`);
  });
  socket.on("bits-food", ({ username, bits }) => {
    sayMessage(client, `@${username} cheered for ${bits}! Thanks for the food`);
  });
  socket.on("bits-no-food", ({ username, bits }) => {
    sayMessage(client, `@${username} cheered for ${bits}!`);
  });
  socket.on("most-love-winner", ({ username, amount }) => {
    sayMessage(
      client,
      `Congrats @${username}! You gave me the most love with ${amount} heart${
        +amount !== 1 ? "s" : ""
      }!`
    );
  });
});

app.get("/", (_req, res) => {
  res.json({ message: "Online" });
});

const PORT = process.env.PORT || 8080;

http.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
