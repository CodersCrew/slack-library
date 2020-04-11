import { App } from "@slack/bolt";
import { openAddBookModal } from "./add_book_modal";

export const setCommands = (app: App) => {
  app.command("/add-book", async ({ ack, body, context }) => {
    try {
      openAddBookModal(app, context.botToken, body.trigger_id);
      await ack();
    } catch (error) {
      console.error(error);
    }
  });
};
