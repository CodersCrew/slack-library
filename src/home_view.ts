import { App } from "@slack/bolt";

import { BookDTO, UserDTO } from "./db/db";
import { createButton } from "./utils/slack_buttons";


const renderBook = (
  acc: any[],
  { name, _id, owners, isCreator }: BookDTO & { isCreator: boolean },
) => {
  let bookButtonList = [];

  if (isCreator) {
    bookButtonList.push(createButton("Remove book", "remove_book", _id));
  } else {
    bookButtonList.push(createButton("I got this book too", "add_owner", _id));
  }

  return [
    ...acc,
    {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${name}*\nHis book is very compatible with XP. It is not about drawing pictures of a domain; it is about how you think of it, the language you use to talk about it, and how you organize your software to reflect your improving understanding of it. Eric thinks that learning about your problem domain is as likely to happen at the end of your project as at the beginning, and so refactoring is a big part of his technique.`,
      },
    },
    {
      type: "actions",
      elements: bookButtonList,
    },
    {
      type: "context",
      elements: [
        {
          type: "mrkdwn",
          text: "Owners",
        },
        ...createUserImagesList(owners as UserDTO[]),
      ],
    },
  ];
};

export const updateHomeView = (
  app: App,
  token: string,
  viewId: string,
  books: (BookDTO & { isCreator: boolean })[] = [],
) => {
  return app.client.views.update({
    token,
    view_id: viewId,
    view: {
      type: "modal",
      callback_id: "view_1",
      title: {
        type: "plain_text",
        text: "Updated modal",
      },
      blocks: [
        {
          type: "actions",
          elements: [
            createButton("Add book", "add_book"),
            createButton("Filters", "set_filter"),
          ],
        },
        ...books.reduce(renderBook, []),
      ],
    },
  });
};

const createUserImagesList = (owners: UserDTO[]) => {
  return owners.map(
    (owner: {
      real_name: string;
      name: string;
      profile: { image_24: string };
    }) => {
      return {
        type: "image",
        image_url: owner.profile.image_24,
        alt_text: owner.real_name || owner.name,
      };
    },
  );
};
