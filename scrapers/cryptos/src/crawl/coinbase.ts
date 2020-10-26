import https from "https";

import { get } from "../utils/db";
import logger from "../utils/logger";

const apiUrl = "api.coinbase.com";

let api = (exports.api = {
  assets: {
    isEnabled: true,
    isLive: false,
    crawl: crawlAssets,
    name: "assets",
    path: "/currencies",
    store: storeAssets
  },
  exchangeRates: {
    isEnabled: false,
    isLive: false,
    crawl: null,
    name: "rates",
    path: "/exchange-rates",
    store: null
  }
});

/**
 * Fetch data function
 * @param endpoint
 */

function fetchUrl(endpoint) {
  const options = {
    hostname: apiUrl,
    method: "GET",
    path: "/v2" + endpoint.path
  };

  https
    .request(options, function(res) {
      let body = "";

      res.on("data", function(d) {
        body += d;
      });

      res.on("end", function() {
        try {
          let json = JSON.parse(body);

          endpoint.store(json.data);
        } catch (error) {
          logger.error(body);
          logger.error(error);
        }
      });
    })
    .on("error", error => {
      logger.warn(error);
    })
    .end();
}

/**
 * Crawl Assets
 */
function crawlAssets() {
  fetchUrl(api.assets);
}

/**
 * Store fetched Assets
 */
function storeAssets(assets) {
  assets.forEach(function(asset) {
    // Update name fields
    asset.displayName = asset["name"];
    asset.name = asset["id"];
    delete asset["id"];

    // Add exchange field
    asset.exchange = "coinbase";

    // Upsert fetched currency into MongoDB
    db.get()
      .collection("assets")
      .findOneAndReplace(
        {
          exchange: "coinbase",
          name: asset.name
        },
        asset,
        {
          upsert: true
        }
      )
      .catch(error => {
        throw error;
      });
  });
}
