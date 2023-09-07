const Pusher = require("pusher");
const { pusherConfig } = require("./config");
module.exports = new Pusher(pusherConfig);
