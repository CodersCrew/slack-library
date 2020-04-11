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
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "Filters",
              },
              action_id: "set_filter",
            },
          ],
        },
      ],
    },
  });
};

const renderBook = (
  acc: any[],
  { name, _id, owners }: { name: string; _id: string; owners: {}[] },
) => {
  return [
    ...acc,
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${name}*\nHis book is very compatible with XP. It is not about drawing pictures of a domain; it is about how you think of it, the language you use to talk about it, and how you organize your software to reflect your improving understanding of it. Eric thinks that learning about your problem domain is as likely to happen at the end of your project as at the beginning, and so refactoring is a big part of his technique.`,
      },
    },
    {
      type: "actions",
      elements: [
        {
          type: "button",
          text: {
            type: "plain_text",
            text: "Remove book",
          },
          action_id: "remove_book",
          value: _id,
        },
      ],
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: "Owners",
        },
        ...owners.map(
          (owner: {
            real_name: string;
            name: string;
            profile: { image_24: string };
          }) => {
            return {
              type: "image",
              image_url: owner.profile.image_24,
              alt_text: owner.real_name || owner.name,
            };
          },
        ),
      ],
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
      blocks: [
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
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "Filters",
              },
              action_id: "set_filter",
            },
          ],
        },
        ...books.reduce(renderBook, []),
      ],
    },
  });
};
