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

const renderBook = (acc: any[], { name }: { name: string }) => {
  return [
    ...acc,
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${name}*\nHis book is very compatible with XP. It is not about drawing pictures of a domain; it is about how you think of it, the language you use to talk about it, and how you organize your software to reflect your improving understanding of it. Eric thinks that learning about your problem domain is as likely to happen at the end of your project as at the beginning, and so refactoring is a big part of his technique.`,
      },
    },
  ];
};

export const updateHomeView = (
  app: App,
  token: string,
  viewId: string,
  books: any[] = [],
) => {
  return app.client.views.update({
    token,
    view_id: viewId,
    view: {
      type: "modal",
      callback_id: "view_1",
      title: {
        type: "plain_text",
        text: "Updated modal",
      },
      blocks: books.reduce(renderBook, []),
    },
  });
};
