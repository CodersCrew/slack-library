import { App } from "@slack/bolt";
import { createSelect } from "../../utils/slack_selects";

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
        createSelect({
          label: "Category",
          placeholder: "select category",
          options: ["Web development", "Marketing", "Design"],
        }),
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
        {
          type: "input",
          block_id: "description_book",
          element: {
            type: "plain_text_input",
            action_id: "input",
            min_length: 3,
            multiline: true,
          },
          label: {
            type: "plain_text",
            text: "Description",
            emoji: true,
          },
        },
        {
          type: "input",
          block_id: "amazon_book",
          element: {
            type: "plain_text_input",
            action_id: "input",
            initial_value: "abc",
          },
          label: {
            type: "plain_text",
            text: "Amazon URL",
            emoji: true,
          },
          optional: true,
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "You can add a button alongside text in your message. ",
          },
          accessory: {
            type: "button",
            text: {
              type: "plain_text",
              text: "Scan",
              emoji: true,
            },
            value: "click_me_123",
            action_id: "scan_website",
          },
        },
      ],
    },
  });
};
