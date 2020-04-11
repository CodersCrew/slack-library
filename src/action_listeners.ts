import { App } from "@slack/bolt";
import { openAddBookModal } from "./add_book_modal";
import { openFilterBookModal } from "./filter_modal";
import { removeBook } from "./db/book_repository";

export const setActionListeners = (app: App) => {
  app.action("add_book", async ({ body, ack, context }) => {
    try {
      openAddBookModal(app, context.botToken, (body as any).trigger_id);
      await ack();
    } catch (error) {
      console.error(error);
    }
  });

  app.action("remove_book", async ({ body, ack, context, action }) => {
    try {
      removeBook((action as any).value);
      await ack();
    } catch (error) {
      console.error(error);
    }
  });

  app.action("set_filter", async ({ body, ack, context }) => {
    try {
      openFilterBookModal(app, context.botToken, (body as any).trigger_id);
      await ack();
    } catch (error) {
      console.error(error);
    }
  });
};
