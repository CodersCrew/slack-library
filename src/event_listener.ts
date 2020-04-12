import { App } from "@slack/bolt";
import { setHomeView, updateHomeView } from "./home_view";
import { getBookList } from "./db/book_repository";
import { getUserDetails } from "./slack_user_repository";
import { getUserIdFromAppHomeEvent } from "./utils/slack_utils";

export const setEventListeners = (app: App) => {
  app.event("app_home_opened", async ({ event, context, body }) => {
    try {
      const { view } = await setHomeView(app, context.botToken, event.user);

      const books = await getBookList();

      const booksWithOwners = books.map(async (book) => {
        const owners = book.owners.map(async (owner: string) => {
          return getUserDetails(app, context.botToken, owner);
        });

        const userId = getUserIdFromAppHomeEvent(body);

        return {
          ...book,
          owners: await Promise.all(owners),
          isCreator: userId === book.createdBy,
        };
      });

      updateHomeView(
        app,
        context.botToken,
        (view as any).id,
        await Promise.all(booksWithOwners),
      );
    } catch (error) {
      console.error(error);
    }
  });
};
