import cron from "node-cron";
import logger from "../utils/logger";

let exchanges = [
  require("./bitstamp"),
  require("./btc-e"),
  require("./coinbase"),
  require("./kraken"),
  require("./paymium"),
  require("./poloniex")
]);

export const init = () => {
  // Live cron
  cron.schedule(
    "0-59 * * * *",
    () => {
      logger.log("verbose", "cron: live fetch triggered");

      exchanges.forEach(exchange => {
        if (!exchange.api) {
          logger.log("verbose", exchange.name + ": not implemented, skipping");
          return;
        }

        Object.keys(exchange.api).map(key => {
          if (exchange.api[key].isLive) {
            if (exchange.api[key].isEnabled) {
              //exchange.api[key].crawl();
              logger.log("verbose", exchange.name + ": fetching " + key);
            } else {
              logger.log("verbose", exchange.name + ": skipping " + key);
            }
          }
        });
      });
    },
  );

  // Periodic cron
  cron.schedule(
    "* * * * 0-7",
    () => {
      logger.log("verbose", "cron: daily fetch triggered");

      exchanges.forEach(exchange => {
        if (!exchange.api) {
          logger.log("verbose", exchange.name + ": not implemented, skipping");
          return;
        }

        Object.keys(exchange.api).map(key => {
          if (!exchange.api[key].isLive) {
            if (exchange.api[key].isEnabled) {
              //exchange.api[key].crawl();
              logger.log("verbose", exchange.name + ": fetching " + key);
            } else {
              logger.log("verbose", exchange.name + ": skipping " + key);
            }
          }
        });
      });
    },
  );
};

// Manual crawl
export const crawl = () => {
  exchanges.forEach(exchange => {
    if (!exchange.api) {
      logger.log("verbose", exchange.name + ": not implemented, skipping");
      return;
    }

    Object.keys(exchange.api).map(key => {
      if (!exchange.api[key].isLive) {
        if (exchange.api[key].isEnabled) {
          exchange.api[key].crawl();
          logger.log("verbose", exchange.name + ": fetching " + key);
        } else {
          logger.log("verbose", exchange.name + ": skipping " + key);
        }
      }
    });
  });
};

export const crawlLive = () => {
  exchanges.forEach(exchange => {
    if (!exchange.api) {
      logger.log("verbose", exchange.name + ": not implemented, skipping");
      return;
    }

    Object.keys(exchange.api).map(key => {
      if (exchange.api[key].isLive) {
        if (exchange.api[key].isEnabled) {
          exchange.api[key].crawl();
          logger.log("verbose", exchange.name + ": fetching " + key);
        } else {
          logger.log("verbose", exchange.name + ": skipping " + key);
        }
      }
    });
  });
};
