import { Request, Response } from "express";
import playwright from "playwright";
import RandomUserAgent from "random-useragent";
import { listOfProductUrl } from "../constants/utils";

const ProductsController = {
  getAllProducts: async (req: Request, res: Response): Promise<any> => {
    //get random agent
    const agent = RandomUserAgent.getRandom();
    try {
      const browser = await playwright.chromium.launch({ headless: true });
      const context = await browser.newContext({
        bypassCSP: true,
        userAgent: agent,
      });

      const page = await context.newPage();
      await page.setDefaultTimeout(3000);
      // await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto(listOfProductUrl);

      //get data
      const productsList = await page.$$eval(
        "div.shop-page_product-list",
        (products: any) => {
          return products?.map((singleProduct: any) => {
            const card = singleProduct.querySelector(
              ".shop-search-result-view__item"
            );
            //a tag link
            const aTag = card.querySelector("a");
            const aLink = aTag?.href || "N/A";
            const img = card.querySelector("img.HWfRmU");
            const imgUrl = img?.src || "";
            const discountEl = card.querySelector("span.Nv7uAa");
            const discount = discountEl?.innerText || "";
            const overImgWrapper = card.querySelector(
              ".customized-overlay-image"
            );
            const imgCover = overImgWrapper?.querySelector("img")?.src || "";
            const description = card.querySelector("div.Od5Z3o")?.innerText;
            const price =
              {
                number: card.querySelector("span._6czwxx")?.innerText || null,
                currency: card.querySelector("span.MQbiLE")?.innerText || null,
              } || {};
            const ratings =
              card.querySelector("div._2VNMCr")?.innerText || null;

            return {
              aLink,
              imgUrl,
              discount,
              imgCover,
              description,
              price,
              ratings,
            };
          });
        }
      );

      console.log(productsList, "test products");

      //store data

      await browser.close();
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  },
};

export default ProductsController;
