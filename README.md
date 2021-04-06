# Andoubot server

A very basic server that listens to Twitch chat and handles custom chat commands and interactivity using [TMI.js](https://tmijs.com/) & [Socket.io](https://socket.io/)

## Andou-gotchi Interaction

Uses web sockets to respond to chat interaction in real time. Viewers can use the "!feed" command to feed one heart to the character on the streamer's overlay for free (once per stream). Viewers can give additional hearts by cheering at least 100 bits. 2 hearts will be fed for every 100 bits cheered. 

[View Client-side source code](https://github.com/kylemire1/andou-gatchi)

## Supported Custom Commands
1. **!feed** - Feeds 1 heart to the Andou tamagotchi for free (once per stream).
2. **!so [username]** - Outputs a shoutout to the specified user's twitch channel.
3. **!raid [username]** - Outputs a link to the specified user's channel and a raid call.
4. **!twit [username]** - Outputs a link to the specified user's Twitter profile.
5. **!discord** - Promotes the streamer's discord channel.
6. **!commissions** - Promotes the streamer's art commission menu and prices.
7. **!request** - Outputs the streamer's rules regarding sketch requests.
8. **!tip** - Outputs a link viewers can use to tip the streamer money.
9. **!mostlove** - Outputs whoever contributed the most hearts to the Andou tamagotchi during the current stream and congratulates them.
+ Many more humorous ones for viewers to figure out
