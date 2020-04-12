import {
  SlackViewAction,
  SlackAction,
  InteractiveMessage,
  BasicElementAction,
  ButtonAction,
  AppHomeOpenedEvent,
} from "@slack/bolt";

interface AppHomeEventOnOpen {
  event: {
    user: string;
  };
}

export const getUserIdFrom = (body: SlackViewAction | SlackAction) => {
  return body.user.id;
};

export const getUserIdFromAppHomeEvent = <T extends AppHomeEventOnOpen>(
  body: T,
) => {
  return body.event.user;
};

export const getValueFrom = (action: ButtonAction) => {
  return action.value;
};
