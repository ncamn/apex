import fs from "fs";
import puppeteer from "puppeteer";
import readline from "readline";
import yaml from "js-yaml";

const ScrollIterations = +process.env.SCROLLS_COUNT || 100;

type Config = {
  selectors: {
    messageSpan: string;
    conversationContainer: string;
    scrollableView: string;
    spinner: string;
  };
};

async function fetchMessages() {
  // Read configuration
  const rawConfig = fs.readFileSync("./config.yml", "utf8");
  let config: Config = yaml.safeLoad(rawConfig);

  // Override the default config if necessary
  if (fs.existsSync("./config.override.yml")) {
    const rawConfigOverride = fs.readFileSync("./config.override.yml", "utf8");
    const configOverride: Config = yaml.safeLoad(rawConfigOverride);
    config = { ...config, ...configOverride };
  }

  // Launch browser
  const headless = process.env.HEADLESS !== "false";
  process.stdout.write(`Starting ${headless} browser ... `);
  const browser = await puppeteer.launch({ headless });
  const page = await browser.newPage();

  // Go to conversation page
  process.stdout.write("done\nReaching messenger.com ... ");
  await page.goto(`https://messenger.com/t/${process.env.CONVERSATION_ID}`, {
    waitUntil: "networkidle2",
  });
  process.stdout.write("done\n");

  // Login
  process.stdout.write("Logging in ... ");
  await page.type("#email", process.env.MESSENGER_EMAIL);
  await page.type("#pass", process.env.MESSENGER_PASSWORD);
  await page.keyboard.press("Enter");
  await page.waitForNavigation();
  process.stdout.write("done\n");

  // Scroll conversation view to lazy load older messages
  await page.waitForSelector(config.selectors.scrollableView);

  // Throttle
  // const client = await page.target().createCDPSession();
  // await client.send("Network.emulateNetworkConditions", {
  //   offline: false,
  //   downloadThroughput: (100 * 1024) / 8,
  //   uploadThroughput: (100 * 1024) / 8,
  //   latency: 20,
  // });

  const hrstart = process.hrtime();
  for (const idx in [...new Array(ScrollIterations)]) {
    // Log progress
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(
      `Scrolling ... ${((+idx / ScrollIterations) * 100).toFixed(0)}%`
    );

    await page.$eval(config.selectors.scrollableView, (el) => {
      el.scrollIntoView();
    });

    // Wait for spinner to appear
    // TODO Improve
    await page.waitFor(100);

    // Wait for spinner to disappear
    await page.waitForFunction(
      (selector) => document.querySelector(selector) === null,
      {},
      config.selectors.spinner
    );
  }
  const hrend = process.hrtime(hrstart);
  readline.cursorTo(process.stdout, 0);
  process.stdout.write(
    `Scrolling ... done in ${hrend[0]}s ${(hrend[1] / 1000000).toFixed(0)}ms\n`
  );

  // Extract conversation from page and save it locally
  process.stdout.write("Saving conversation ... ");
  const conversation = await page.$(config.selectors.conversationContainer);
  fs.writeFileSync(
    "output/conversation.html",
    `${await (await conversation.getProperty("innerHTML")).jsonValue()}`
  );
  process.stdout.write("done\n");

  // Extract messages text from page and save it locally
  process.stdout.write("Saving messages text ... ");
  const messages = await page.$$(config.selectors.messageSpan);
  const writeStream = fs.createWriteStream("output/messages.txt");
  writeStream.on("error", (err) => {
    throw err;
  });
  await Promise.all(
    messages.map(async (message) => {
      const chunk = await message.getProperty("innerText");
      writeStream.write(`${await chunk.jsonValue()}\n`);
    })
  );
  writeStream.end();
  process.stdout.write("done\n");

  // Clean up
  await browser.close();
}

// async function processMessages() {}

// async function createPlaylist() {
//   await fetch(
//     `https://api.spotify.com/v1/users/${process.env.SPOTIFY_USER_ID}/playlists`,
//     {
//       method: "POST",
//     }
//   );
// }

async function main() {
  await fetchMessages();
  // await processMessages();
  // await createPlaylist();
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
