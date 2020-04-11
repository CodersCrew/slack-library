import { App } from "@slack/bolt";

import { UserDTO } from "./db/db";

export const getUserDetails = (app: App, token: string, id: string) => {
  return app.client.users
    .info({
      token,
      user: id,
      include_locale: true,
    })
    .then(({ user }) => user) as Promise<UserDTO>;
};
