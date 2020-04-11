import { App } from "@slack/bolt";
import { setHomeView, updateHomeView } from "./home_view";
import { getBookList } from "./db/book_repository";

export const setEventListeners = (app: App) => {
  app.event("app_home_opened", async ({ event, context }) => {
    try {
      setHomeView(app, context.botToken, event.user).then((result) => {
        getBookList().then((books) => {
          updateHomeView(app, context.botToken, (result.view as any).id, books);
        });
      });
    } catch (error) {
      console.error(error);
    }
  });
};
