import { App } from "@slack/bolt";
import { addBook } from "./db/book_repository";
import { getUserIdFrom } from "./utils/slack_utils";
import { getUserConfig } from "./local_db/config";
import { getBookListWithOwners } from "./services/update_view_with_booklist";

export const setViewListeners = (app: App) => {
  app.view(
    "add-book-modal",
    async ({ ack, body, context, payload, ...rest }) => {
      const title = body.view.state.values["title_book"]["input"].value;
      const description =
        body.view.state.values["description_book"]["input"].value;

      const config = getUserConfig(body.user.id);

      await addBook(title, description, getUserIdFrom(body));

      await getBookListWithOwners(app, context, body, config.homeViewId);

      await ack();
    },
  );
};
