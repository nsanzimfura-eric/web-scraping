import { listOfProductUrl } from "../constants/utils";

const ProductsServices = {
  getAllProducts: async (page: any): Promise<any> => {
    try {
      await page.goto(listOfProductUrl, { waitUntil: "domcontentloaded" });
      // Find all product cards
      const productElements = await page.$$("div.shop-search-result-view");

      const productsList: any[] = [];

      // const productsList = await page.querySelectorAll(
      //   "div.shop-search-result-view",
      //   (products: any) => {
      //     return products?.map((singleProduct: any) => {
      //       const card = singleProduct.querySelector("a");
      //       const aLink = card?.querySelector("a").href || "N/A";
      //       const img = card.querySelector("img.HWfRmU");
      //       const imgUrl = img?.src || "";
      //       const discountEl = card.querySelector("span.Nv7uAa");
      //       const discount = discountEl?.innerText || "";
      //       const overImgWrapper = card.querySelector(
      //         ".customized-overlay-image"
      //       );
      //       const imgCover = overImgWrapper?.querySelector("img")?.src || "";
      //       const description = card.querySelector("div.Od5Z3o")?.innerText;
      //       const price =
      //         {
      //           number: card.querySelector("span._6czwxx")?.innerText || null,
      //           currency: card.querySelector("span.MQbiLE")?.innerText || null,
      //         } || {};
      //       const ratings =
      //         card.querySelector("div._2VNMCr")?.innerText || null;

      //       return {
      //         aLink,
      //         imgUrl,
      //         discount,
      //         imgCover,
      //         description,
      //         price,
      //         ratings,
      //       };
      //     });
      //   }
      // );

      // Loop through each product card and extract information
      console.log(productElements, "xxxxx");
      for (const singleProduct of productElements) {
        const card = await singleProduct.$("a");

        const aLink = (await card?.getAttribute("href")) || "N/A";
        const imgUrl =
          (await singleProduct.$eval(
            "img.HWfRmU",
            (img) => (img as HTMLImageElement).src
          )) || "";
        const discount =
          (await singleProduct.$eval("span.Nv7uAa", (el) => el.textContent)) ||
          "";
        const imgCover =
          (await singleProduct.$eval(
            ".customized-overlay-image img",
            (img) => (img as HTMLImageElement).src
          )) || "";
        const description =
          (await singleProduct.$eval("div.Od5Z3o", (el) => el.textContent)) ||
          "";

        const priceNumber =
          (await singleProduct.$eval("span._6czwxx", (el) => el.textContent)) ||
          null;
        const priceCurrency =
          (await singleProduct.$eval("span.MQbiLE", (el) => el.textContent)) ||
          null;

        const price = {
          number: priceNumber,
          currency: priceCurrency,
        };

        const ratings =
          (await singleProduct.$eval("div._2VNMCr", (el) => el.textContent)) ||
          null;

        productsList.push({
          aLink,
          imgUrl,
          discount,
          imgCover,
          description,
          price,
          ratings,
        });
      }

      console.log(productsList, "test products");

      return productsList;
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  },
};

export default ProductsServices;
