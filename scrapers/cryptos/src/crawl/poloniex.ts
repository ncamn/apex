import https from "https";

import { get } from "../utils/db";
import logger from "../utils/logger";

exports.name = "poloniex";
const apiUrl = "poloniex.com";

let api = (exports.api = {
  //TODO
  assets: {
    isEnabled: true,
    isLive: false,
    crawl: crawlAssets,
    query: "returnCurrencies",
    name: "currencies",
    store: storeAssets
  },
  //TODO
  ticker: {
    isEnabled: false,
    query: "returnTicker",
    name: "ticker"
  },
  //TODO
  volume24h: {
    isEnabled: false,
    query: "return24Volume",
    name: "volume24h"
  },
  //TODO
  orderBook: {
    isEnabled: false,
    query: "returnOrderBook",
    name: "orderBook"
  },
  //TODO
  tradeHistory: {
    isEnabled: false,
    query: "returnTradeHistory",
    name: "trades"
  },
  //TODO
  chartData: {
    isEnabled: false,
    query: "returnChartData",
    name: "chartData"
  },
  //TODO
  loanOrders: {
    isEnabled: false,
    query: "returnLoanOrders",
    name: "loanOrders"
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
    path: "/public?command=" + endpoint.query
  };

  https
    .get(options, res => {
      let body = "";

      res.on("data", d => {
        body += d;
      });

      res.on("end", () => {
        let json = JSON.parse(body);

        endpoint.store(json);
      });
    })
    .on("error", function (e) {
      logger.warn(e);
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
  for (let [assetName, asset] of Object.entries(assets)) {
    // Update name fields
    asset.displayName = asset["name"];
    asset.name = assetName;

    // Add exchange field
    asset.exchange = "poloniex";

    // Upsert fetched currency into MongoDB
    db.get()
      .collection("assets")
      .findOneAndReplace(
        {
          exchange: "poloniex",
          name: assetName
        },
        asset,
        {
          upsert: true
        }
      )
      .catch(function (error) {
        throw error;
      });
  }
}
