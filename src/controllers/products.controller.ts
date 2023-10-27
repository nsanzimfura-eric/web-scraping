import { Request, Response } from "express";
import playwright from "playwright";
import RandomUserAgent from "random-useragent";
import loginServices from "../services/login.service";
import ProductsServices from "../services/products.service";

const ProductsController = {
  getAllProducts: async (req: Request, res: Response): Promise<any> => {
    //get random agent
    const agent = RandomUserAgent.getRandom();
    try {
      const browser = await playwright.chromium.launch({ headless: false });
      const context = await browser.newContext({
        bypassCSP: true,
        userAgent: agent,
      });

      const page = await context.newPage();
      await page.setViewportSize({ width: 1920, height: 1080 });
      //login
      await loginServices.login(page);

      //get all products
      const productsList = await ProductsServices.getAllProducts(page);

      await browser.close();
      return res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        data: productsList,
      });
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  },
};

export default ProductsController;
