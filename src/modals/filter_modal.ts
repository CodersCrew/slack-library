import { App } from "@slack/bolt";
import { createCheckbox } from "../utils/slack_selects";

export const openFilterBookModal = (
  app: App,
  token: string,
  triggerId: string,
) => {
  return app.client.views.open({
    token,
    trigger_id: triggerId,
    view: {
      type: "modal",
      callback_id: "filter-book-modal",
      title: {
        type: "plain_text",
        text: "Filter",
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
        createCheckbox({
          label: "Please select books",
          options: ["Web development", "Marketing", "Design"],
        }),
      ],
    },
  });
};
