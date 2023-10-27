import { credentials } from "../constants/utils";
const loginUrl =
  "https://shopee.com.my/buyer/login?is_from_login=true&next=https%3A%2F%2Fshopee.com.my%2F%3Fis_from_login%3Dtrue";

const loginServices = {
  login: async (page: any): Promise<any> => {
    try {
      await page.goto(loginUrl, { waitUntil: "domcontentloaded" });

      //   choose english language
      await page.$$eval(
        "language-selection__list-item.button",
        async (btns: any) => {
          if (btns) {
            await page.click(btns[0]);
          }
        }
      );

      await page.type("input[name=loginKey]", credentials.email);
      await page.type("input[name=password]", credentials.password);
      await page.click("button.wyhvVD");

      return true;
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  },
};

export default loginServices;
