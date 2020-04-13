import { App } from "@slack/bolt";
import { addBook } from "./db/book_repository";
import { getUserIdFrom } from "./utils/slack_utils";

export const setViewListeners = (app: App) => {
  app.view(
    "add-book-modal",
    async ({ ack, body, context, payload, ...rest }) => {
      const title = body.view.state.values["title_book"]["input"].value;

      await addBook(title, getUserIdFrom(body));

      await ack();
    },
  );
};
