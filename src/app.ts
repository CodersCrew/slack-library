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

app.command("/add-book", async ({ ack, body, context }) => {
  await ack();

  try {
    const result = await app.client.views.open({
      token: context.botToken,
      trigger_id: body.trigger_id,
      view: {
        type: "modal",
        title: {
          type: "plain_text",
          text: "Add new book",
          emoji: true,
        },
        submit: {
          type: "plain_text",
          text: "Submit",
          emoji: true,
        },
        close: {
          type: "plain_text",
          text: "Cancel",
          emoji: true,
        },
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\n *Please fill in the form:*",
            },
          },
          {
            type: "input",
            element: {
              type: "plain_text_input",
            },
            label: {
              type: "plain_text",
              text: "Title",
              emoji: true,
            },
          },
        ],
      },
    });
  } catch (error) {
    console.error(error);
  }
});

app.action("button_click", async ({ body, ack, say }) => {
  await ack();
  await say(`<@${body.user.id}> clicked the button`);
});

(async () => {
  await app.start(3000);

  console.log("⚡️ Bot is running!");
})();
