const { App } = require("@slack/bolt");
const localtunnel = require("localtunnel");
const dotenv = require("dotenv");

dotenv.config();

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
});

app.message("hello", async ({ message, say }) => {
  await say({
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

app.action("button_click", async ({ body, ack, say }) => {
  await ack();
  await say(`<@${body.user.id}> clicked the button`);
});

(async () => {
  await app.start(3000);

  console.log("⚡️ Bot is running!");
})();
