import { App } from "@slack/bolt";
import { createSelect } from "../../utils/slack_selects";
import { createInput } from "../../utils/slack_inputs";

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
        createInput({ name: "Title", blockId: "title_book", minLength: 3 }),
        createInput({
          name: "Description",
          blockId: "description_book",
          multiline: true,
        }),
        createInput({
          name: "Amazon URL",
          blockId: "amazon_book",
        }),
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
