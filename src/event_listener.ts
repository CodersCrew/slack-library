import { App } from "@slack/bolt";
import { getBookListWithOwners } from "./services/update_view_with_booklist";

export const setEventListeners = (app: App) => {
  app.event("app_home_opened", async ({ event, context, body }) => {
    try {
      if (event.view) {
        await getBookListWithOwners(app, context, body, (event.view as any).id);
      }
    } catch (error) {
      console.error(error);
    }
  });
};
