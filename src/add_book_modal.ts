import { App } from "@slack/bolt";

export const openAddBookModal = (
  app: App,
  token: string,
  triggerId: string,
) => {
  return app.client.views.open({
    token,
    trigger_id: triggerId,
    view: {
      type: "modal",
      callback_id: "add-book-modal",
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
          block_id: "title_book",
          element: {
            type: "plain_text_input",
            action_id: "input",
            min_length: 3,
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
};
