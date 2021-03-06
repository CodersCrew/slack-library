import { App } from "@slack/bolt";

import { UserDTO, Book } from "../../db/db";
import { createButton } from "../../utils/slack_buttons";
import { renderBookCard } from "./book_card";

const renderBook = (
  acc: any[],
  {
    name,
    description,
    _id,
    owners,
    isCreator,
    image,
    rating,
    amazonURL,
    store,
  }: Book,
) => {
  let bookButtonList = [];

  if (isCreator) {
    bookButtonList.push(createButton("Remove book", "remove_book", _id));
  } else {
    bookButtonList.push(createButton("I got this book too", "add_owner", _id));
  }

  bookButtonList.push(createButton("Reserve book", "reserve_book", _id));

  return [
    ...acc,
    renderBookCard({
      image,
      name,
      amazonURL,
      rating,
      description,
      owners: owners.length,
      store: store.length,
    }),
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
  books: Book[] = [],
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
