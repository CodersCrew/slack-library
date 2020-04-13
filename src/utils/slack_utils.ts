import { SlackViewAction, SlackAction, ButtonAction } from "@slack/bolt";

interface AppHomeEventOnOpen {
  event: {
    user: string;
  };
  user: {
    id: string;
  };
}

export const getUserIdFrom = (body: SlackViewAction | SlackAction) => {
  return body.user.id;
};

export const getUserIdFromAppHomeEvent = <T extends AppHomeEventOnOpen>(
  body: T,
) => {
  if (body.event) {
    return body.event.user;
  }

  return body.user.id;
};

export const getValueFrom = (action: ButtonAction) => {
  return action.value;
};
