import { App } from "@slack/bolt";

export const setHomeView = (app: App, token: string, userId: string) => {
  return app.client.views.publish({
    token,
    user_id: userId,
    view: {
      type: "home",
      callback_id: "home_view",
      blocks: [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "*Welcome to your _App's Home_* :tada:",
          },
        },
        {
          type: "divider",
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text:
              "This button won't do much for now but you can set up a listener for it using the `actions()` method and passing its unique `action_id`. See an example in the `examples` folder within your Bolt app.",
          },
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "Add book",
              },
              action_id: "add_book",
            },
          ],
        },
      ],
    },
  });
};
