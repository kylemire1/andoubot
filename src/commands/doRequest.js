function doRequest(client) {
  client.say(
    `#${process.env.TWITCH_CHANNEL_NAME}`,
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
}

module.exports = doRequest;
