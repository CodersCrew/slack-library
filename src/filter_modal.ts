import { App } from "@slack/bolt";

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
        {
          type: "input",
          element: {
            type: "checkboxes",
            options: [
              {
                text: {
                  type: "plain_text",
                  text: "Web development",
                  emoji: true,
                },
                value: "value-0",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Marketing",
                  emoji: true,
                },
                value: "value-1",
              },
              {
                text: {
                  type: "plain_text",
                  text: "Design",
                  emoji: true,
                },
                value: "value-2",
              },
            ],
          },
          label: {
            type: "plain_text",
            text: "Please select books",
            emoji: true,
          },
        } as any,
      ],
    },
  });
};
