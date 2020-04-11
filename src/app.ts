import { App } from "@slack/bolt";
import localtunnel from "localtunnel";
import * as dotenv from "dotenv";

dotenv.config();

import { addBook } from "./db/book_repository";
import { setEventListeners } from "./event_listener";

if (process.env.NODE_ENV !== "production") {
  (async () => {
    await localtunnel({
      port: 3000,
      host: process.env.TUNNEL_HOST,
      subdomain: process.env.TUNNEL_SUBDOMAIN,
    });

    console.log("⚡️ Tunnel is running!");
  })();
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



app.view("add-book-modal", async ({ ack, body }) => {
  const title = body.view.state.values["title_book"]["input"].value;

  addBook(title);

  await ack();
});

(async () => {
  await app.start(3000);

  console.log("⚡️ Bot is running!");
})();
