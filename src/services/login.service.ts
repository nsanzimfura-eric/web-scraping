import { credentials } from "../constants/utils";
const loginUrl =
  "https://shopee.com.my/buyer/login?is_from_login=true&next=https%3A%2F%2Fshopee.com.my%2F%3Fis_from_login%3Dtrue";

const loginServices = {
  login: async (page: any): Promise<any> => {
    try {
      await page.goto(loginUrl, { waitUntil: "domcontentloaded" });

      //   choose english language
      const buttonElement = await page.$(
        "language-selection__list-item.button"
      );
      if (buttonElement) {
        await buttonElement.click();
      }

      await page.type("input[name=loginKey]", credentials.email);
      await page.waitForSelector("input[name=loginKey]", { timeout: 60000 });
      await page.type("input[name=password]", credentials.password);
      await page.waitForSelector("input[name=password]", { timeout: 60000 });
      await page.click("button.wyhvVD");

      return true;
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  },
};

export default loginServices;
