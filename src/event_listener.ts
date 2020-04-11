import { App } from "@slack/bolt";
import { setHomeView, updateHomeView } from "./home_view";
import { getBookList } from "./db/book_repository";

export const setEventListeners = (app: App) => {
  app.event("app_home_opened", async ({ event, context }) => {
    try {
      setHomeView(app, context.botToken, event.user).then((result) => {
        getBookList().then(async (books) => {
          const booksWithOwners = books.map(async (book) => {
            const owners = (book as any).owners.map(async (owner: any) => {

              return user.user;
            });

            return { ...book, owners: (await Promise.all(owners)) as any[] };
          });

          updateHomeView(
            app,
            context.botToken,
            (result.view as any).id,
            await Promise.all(booksWithOwners),
          );
          return getUserDetails(app, context.botToken, owner);
        });
      });
    } catch (error) {
      console.error(error);
    }
  });
};
