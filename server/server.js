const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cron = require("node-cron");
const { sendNotification } = require("./firebase");
const pusher = require("./pusher");
const { applicationConfig } = require("./config");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("PORT", applicationConfig.port || 5555);
app.get("/", (req, res) => {
  res.send({
    status: "UP",
  });
});
app.post("/message", async (req, res) => {
  const payload = req.body;
  if (!payload) return;
  await pusher.trigger(payload.channelId, "message", payload);
  res.send(payload);
});

// DEUBG: "*/5 * * * * *" Run every 5 seconds.
// PRODUCTION: 0 * * * * Run at the 0th minute (i.e., the beginning) of every hour, every day, every month, and every day of the week.
cron.schedule("0 * * * *", async () => {
  await sendNotification();
  console.log("Cron job executed!");
});

app.listen(app.get("PORT"), () =>
  console.log("Listening at " + app.get("PORT"))
);
module.exports=app