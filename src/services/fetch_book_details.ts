import puppeteer from "puppeteer";

export function fetchBookDetails(url: string) {
  return puppeteer
    .launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--window-size=1920,1080",
        '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36"',
      ],
    })
    .then(async (browser) => {
      const page = await browser.newPage();

      await page.goto(url);
      await page.waitForSelector("body");

      const productInfo = await evaluateBook(page);
      const bookDescription = await evaluateBookDescription(page);

      await browser.close();

      return { ...productInfo, ...bookDescription };
    })
    .catch(function (error) {
      console.error(error);
    });
}

async function evaluateBook(page: puppeteer.Page) {
  return await page.evaluate(() => {
    const title = (document.body.querySelector("#productTitle") as any)
      .innerText;

    const ratingElement = document.body
      .querySelector(".a-icon.a-icon-star")
      .getAttribute("class");
    const integer = ratingElement.replace(/[^0-9]/g, "").trim();
    const parsedRating = parseInt(integer) / 10;

    const image = document.body
      .querySelector("#imgBlkFront")
      .getAttribute("src");

    return {
      title: title,
      rating: parsedRating,
      image,
    };
  });
}

async function evaluateBookDescription(page: puppeteer.Page) {
  const descriptionIframe = page
    .frames()
    .find((frame) => frame.name().includes("bookDesc_iframe"));

  if (descriptionIframe) {
    const result = await descriptionIframe.evaluate(() => {
      const description = (document.body.querySelector("#iframeContent") as any)
        .innerText;

      return {
        description,
      };
    });

    return result;
  }

  return {
    description: "",
  };
}
