import { App } from "@slack/bolt";

import { UserDTO, Book } from "../db/db";
import { createButton } from "../utils/slack_buttons";

const renderBook = (
  acc: any[],
  { name, description, _id, owners, isCreator, image, rating, amazonURL }: Book,
) => {
  let bookButtonList = [];

  if (isCreator) {
    bookButtonList.push(createButton("Remove book", "remove_book", _id));
  } else {
    bookButtonList.push(createButton("I got this book too", "add_owner", _id));
  }

  return [
    ...acc,
    renderSectionImage(image, name, amazonURL, rating, description),
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

function mapRatingToStars(rating: number): string {
  return Array(Math.floor(rating)).fill("★").join("");
}

function mapTitle(title: string, url: string) {
  if (url.length === 0) return title;

  return `<${url}|${title}>`;
}

function renderSectionImage(
  image: string,
  name: string,
  amazonURL: string,
  rating: number,
  description: string,
) {
  const placeholder =
    "https://d827xgdhgqbnd.cloudfront.net/wp-content/uploads/2016/04/09121712/book-cover-placeholder.png";

  return {
    type: "section",
    text: {
      type: "mrkdwn",
      text: `*${mapTitle(name, amazonURL)}*\n${mapRatingToStars(
        rating,
      )}\n${description}`,
    },
    accessory: {
      type: "image",
      image_url: image.length === 0 ? placeholder : image,
      alt_text: name,
    },
  };
}
