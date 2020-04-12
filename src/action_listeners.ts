import { App, ButtonAction } from "@slack/bolt";

import { openAddBookModal } from "./add_book_modal";
import { openFilterBookModal } from "./filter_modal";
import { removeBook } from "./db/book_repository";
import { getUserIdFrom, getValueFrom } from "./utils/slack_utils";

export const setActionListeners = (app: App) => {
  app.action("add_book", async ({ body, ack, context }) => {
    try {
      openAddBookModal(app, context.botToken, (body as any).trigger_id);
      await ack();
    } catch (error) {
      console.error(error);
    }
  });

  app.action("remove_book", async ({ body, ack, action }) => {
    try {
      if (!isButtonAction(action)) return await ack();

      removeBook(getValueFrom(action), getUserIdFrom(body));
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

function isButtonAction(
  action: unknown | ButtonAction,
): action is ButtonAction {
  return !!(action as ButtonAction).value;
}
