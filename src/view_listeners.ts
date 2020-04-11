import { App } from "@slack/bolt";
import { addBook } from "./db/book_repository";

export const setViewListeners = (app: App) => {
  app.view("add-book-modal", async ({ ack, body }) => {
    const title = body.view.state.values["title_book"]["input"].value;

    addBook(title);

    await ack();
  });
};
