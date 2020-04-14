export function renderBookCard({
  image,
  name,
  amazonURL,
  rating,
  description,
  owners,
  store,
}: {
  image: string;
  name: string;
  amazonURL: string;
  rating: number;
  description: string;
  owners: number;
  store: number;
}) {
  const placeholder =
    "https://d827xgdhgqbnd.cloudfront.net/wp-content/uploads/2016/04/09121712/book-cover-placeholder.png";

  return {
    type: "section",
    text: {
      type: "mrkdwn",
      text: `*${mapTitle(name, amazonURL)}*\n${mapRatingToStars(rating)}\n${
        owners - store
      } of ${owners} :books: \n${description}`,
    },
    accessory: {
      type: "image",
      image_url: image.length === 0 ? placeholder : image,
      alt_text: name,
    },
  };
}

function mapRatingToStars(rating: number): string {
  return Array(Math.floor(rating)).fill("★").join("");
}

function mapTitle(title: string, url: string) {
  if (url.length === 0) return title;

  return `<${url}|${title}>`;
}
