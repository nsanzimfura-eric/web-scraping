import { listOfProductUrl } from "../constants/utils";

const ProductsServices = {
  getAllProducts: async (page: any): Promise<any> => {
    try {
      await page.goto(listOfProductUrl, { waitUntil: "networkidle0" });

      const products = await page.$$eval(
        "div.shop-search-result-view",
        (all_items) => {}
      );
      await page.waitForSelector("div.shop-search-result-view", {
        timeout: 60000,
      });
      console.log(products, "bfjdhsjfhdj");

      const productsList: any[] = [];

      // Loop through each product card and extract information
      for (let i = 0; i < products.length; i++) {
        const singleProduct = products[i];
        const card = singleProduct.querySelector("a");
        const aLink = card?.querySelector("a").href || "N/A";
        const img = card.querySelector("img.HWfRmU");
        const imgUrl = img?.src || "";
        const discountEl = card.querySelector("span.Nv7uAa");
        const discount = discountEl?.innerText || "";
        const overImgWrapper = card.querySelector(".customized-overlay-image");
        const imgCover = overImgWrapper?.querySelector("img")?.src || "";
        const description = card.querySelector("div.Od5Z3o")?.innerText;
        const price =
          {
            number: card.querySelector("span._6czwxx")?.innerText || null,
            currency: card.querySelector("span.MQbiLE")?.innerText || null,
          } || {};
        const ratings = card.querySelector("div._2VNMCr")?.innerText || null;

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
