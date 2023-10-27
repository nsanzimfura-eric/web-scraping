import playwright from "playwright";
import { listOfProductUrl } from "./constants/utils";
import RandomUserAgent from "random-useragent";

const scrapProducts = async () => {
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
    console.log(page, "tes");
    await browser.close();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

scrapProducts();
