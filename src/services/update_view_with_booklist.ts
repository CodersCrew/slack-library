import { App } from "@slack/bolt";

import { getBookList } from "../db/book_repository";
import { getUserDetails } from "../utils/slack_user_repository";
import { getUserIdFromAppHomeEvent } from "../utils/slack_utils";
import { updateHomeView } from "../modals/home_view";

export const getBookListWithOwners = async (
  app: App,
  context: any,
  body: any,
  viewId: string,
) => {
  const books = await getBookList();

  const booksWithOwners = books.map(async (book) => {
    const owners = book.owners.map(async (owner: string) => {
      return getUserDetails(app, context.botToken, owner);
    });

    const userId = getUserIdFromAppHomeEvent(body);

    return {
      ...book,
      owners: await Promise.all(owners),
      isCreator: userId === book.createdBy,
    };
  });

  updateHomeView(
    app,
    context.botToken,
    viewId,
    await Promise.all(booksWithOwners),
  );
};
