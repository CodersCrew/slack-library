import { App } from "@slack/bolt";
import { openAddBookModal } from "./add_book_modal";

export const setActionListeners = (app: App) => {
  app.action("add_book", async ({ body, ack, context }) => {
    try {
      openAddBookModal(app, context.botToken, (body as any).trigger_id);
      await ack();
    } catch (error) {
      console.error(error);
    }
  });
};
