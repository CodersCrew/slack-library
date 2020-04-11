import { App } from "@slack/bolt";
import localtunnel from "localtunnel";
import * as dotenv from "dotenv";

dotenv.config();

import { setHomeView } from "./home_view";
import { setCommands } from "./commands";
import { setActionListeners } from "./action_listeners";
import { setViewListeners } from "./view_listeners";
import { setEventListeners } from "./event_listener";

if (process.env.NODE_ENV !== "production") {
  localtunnel({
    port: 3000,
    host: process.env.TUNNEL_HOST,
    subdomain: process.env.TUNNEL_SUBDOMAIN,
  })
    .then(() => {
      console.log("⚡️ Tunnel is running!");
    })
    .catch(() => {
      console.log("errr");
    });
}

const app = new App({
  token: process.env.BOT_TOKEN,
  signingSecret: process.env.BOT_SECRET,
  endpoints: {
    events: "/slack/events",
    commands: "/slack/commands",
  },
});

setCommands(app);
setActionListeners(app);
setViewListeners(app);
setEventListeners(app);

app.message("hello", async ({ message, say }) => {
  await say({
    text: "text",
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `Hey there <@${message.user}>!`,
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Click Me",
          },
          action_id: "button_click",
        },
      },
      {
        type: "actions",
        elements: [
          {
            type: "button",
            text: {
              type: "plain_text",
              text: "Reply to review",
              emoji: false,
            },
            action_id: "button_click",
          },
        ],
      },
    ],
  });
});

(async () => {
  await app.start(3000);

  console.log("⚡️ Bot is running!");
})();
