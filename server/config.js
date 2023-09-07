const { config } = require("dotenv");
config();

const configuration = {
  pusherConfig: {
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
    useTLS: true,
  },
  applicationConfig: {
    threadholdUnreadMessage: process.env.THREADHOLD_UNREAD_MESSAGE,
    port: process.env.PORT
  },
};
module.exports = configuration;
