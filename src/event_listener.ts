import { App } from "@slack/bolt";
import { setHomeView } from "./home_view";

export const setEventListeners = (app: App) => {
  app.event("app_home_opened", async ({ event, context }) => {
    try {
      setHomeView(app, context.botToken, event.user);
    } catch (error) {
      console.error(error);
    }
  });
};
