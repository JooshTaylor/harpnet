// const puppeteer = require("puppeteer");

// let browser, page;

// beforeEach(async () => {
//   browser = await puppeteer.launch({
//     headless: false
//   });
//   page = await browser.newPage();
//   await page.goto("localhost:3050");
// });

// afterEach(async () => {
//   await browser.close();
// });

// describe("All links when not logged in work", () => {
//   test("Register route works", async () => {
//     await page.click("a#nav-register");
//     let url = await page.url();
//     expect(url).toMatch(/Register/);
//   });

//   test("Login route works", async () => {
//     await page.click("a#nav-login");
//     url = await page.url();
//     expect(url).toMatch(/Login/);
//   });

//   test("Home route works", async () => {
//     await page.click("a#nav-login");
//     await page.click("a#nav-home-1");
//     url = await page.url();
//     expect(url).toEqual(expect.not.stringMatching(/login/));
//   });
// });

test("Dummy test", () => {});
