import { App } from "@slack/bolt";
import { getBookListWithOwners } from "../services/update_view_with_booklist";
import { setUserConfig } from "../local_db/config";

export const setEventListeners = (app: App) => {
  app.event("app_home_opened", async ({ event, context, body }) => {
    try {
      if (event.view) {
        const rootViewId = (event.view as any).id;

        setUserConfig(body.event.user, { homeViewId: rootViewId });

        await getBookListWithOwners(app, context, body, rootViewId);
      }
    } catch (error) {
      console.error(error);
    }
  });
};
