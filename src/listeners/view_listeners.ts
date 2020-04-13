import { App } from "@slack/bolt";
import { addBook } from "../db/book_repository";
import { getUserIdFrom } from "../utils/slack_utils";
import { getUserConfig } from "../local_db/config";
import { getBookListWithOwners } from "../services/update_view_with_booklist";
import { fetchBookDetails } from "../services/fetch_book_details";

export const setViewListeners = (app: App) => {
  app.view(
    "add-book-modal",
    async ({ ack, body, context, payload, ...rest }) => {
      let bookDetails = {
        title: body.view.state.values["title_book"]["input"].value,
        description: body.view.state.values["description_book"]["input"].value,
        amazonURL:
          (body.view.state.values["amazon_book"]["input"].value as
            | string
            | undefined) || "",
        rating: 0,
        image: "",
      };

      await ack();

      if (bookDetails.amazonURL.length > 0) {
        const result = await fetchBookDetails(bookDetails.amazonURL);

        bookDetails = { ...bookDetails, ...result };
      }

      const config = getUserConfig(body.user.id);

      await addBook(bookDetails, getUserIdFrom(body));

      await getBookListWithOwners(app, context, body, config.homeViewId);
    },
  );
};
