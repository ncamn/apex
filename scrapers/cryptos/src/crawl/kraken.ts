import https from "https";
import querystring from "querystring";

import { get } from "../utils/db";
import logger from "../utils/logger";

export const name = "kraken";

let api = (exports.api = {
  assets: {
    isEnabled: true,
    isLive: false,
    crawl: crawlAssets,
    name: "assets",
    path: "/Assets",
    store: storeAssets
  },
  pairs: {
    isEnabled: true,
    isLive: false,
    crawl: crawlPairs,
    name: "pairs",
    path: "/AssetPairs",
    store: storePairs
  },
  ticker: {
    isEnabled: false,
    isLive: true,
    crawl: crawlTicker,
    name: "ticker",
    path: "/Ticker",
    store: storeTicker
  },
  ohlc: {
    isEnabled: false,
    isLive: false,
    crawl: crawlOHLC,
    name: "ohlc",
    path: "/OHLC",
    store: storeOHLC
  },
  depth: {
    isEnabled: false,
    isLive: false,
    crawl: crawlDepth,
    name: "depth",
    path: "/Depth",
    store: storeDepth
  },
  trades: {
    isEnabled: false,
    isLive: false,
    crawl: crawlTrades,
    name: "trades",
    path: "/Trades",
    store: storeTrades
  },
  spread: {
    isEnabled: false,
    isLive: false,
    crawl: crawlSpread,
    name: "spread",
    path: "/Spread",
    store: storeSpread
  }
});

/**
 * Fetch data function
 * @param endpoint
 * @param input
 * @param pair
 */

function fetchUrl(endpoint, input, pair) {
  const apiUrl = "api.kraken.com";

  const options = {
    hostname: apiUrl,
    method: "POST",
    path: "/0/public" + endpoint.path
  };

  let req = https.request(options, res => {
    let body = "";

    res.on("data", function(d) {
      body += d;
    });

    res.on("end", function() {
      let json = JSON.parse(body);

      if (0 < json.error.length)
        logger.warn(apiUrl + " answered with error: " + json.error);
      else if (input) endpoint.store(json.result, input, pair);
      else endpoint.store(json.result);
    });
  });

  req.on("error", error => {
    logger.warn(error);
  });

  if (input) req.write(querystring.stringify(input));

  req.end();
}

/**
 * Helper function to rename kraken-defined asset names
 * @param asset Kraken defined asset name
 * @returns {*} Mainstream name
 */
// TODO Replace with db-stored infos ?
function getRealAssetName(asset) {
  switch (asset) {
    case "XETC":
      return "ETC";
    case "XETH":
      return "ETH";
    case "XICN":
      return "ICN";
    case "XLTC":
      return "LTC";
    case "XREP":
      return "REP";
    case "XXBT":
      return "XBT";
    case "XXLM":
      return "XLM";
    case "XXMR":
      return "XMR";
    case "XXRP":
      return "XRP";
    case "ZCAD":
      return "CAD";
    case "ZEUR":
      return "EUR";
    case "ZUSD":
      return "USD";
    default:
      return asset;
  }
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
    asset.name = asset["altname"];
    asset.altname = assetName;

    // Add exchange field
    asset.exchange = "kraken";

    // Upsert fetched currency into MongoDB
    db.get()
      .collection("assets")
      .findOneAndReplace(
        {
          altname: asset["altname"],
          exchange: "kraken"
        },
        asset,
        {
          upsert: true
        }
      )
      .catch(error => {
        throw error;
      });
  }
}

/**
 * Crawl Pairs
 */
function crawlPairs() {
  fetchUrl(api.pairs);
}

/**
 * Store fetched Pairs
 */
function storePairs(pairs) {
  for (let [pairName, pair] of Object.entries(pairs)) {
    // Copy and update pair's name
    pair.name = pair["altname"];
    pair.altname = pairName;

    // Add exchange field
    pair.exchange = "kraken";

    // Copy and update base/quote currencies's name
    pair.base_altname = pair["base"];
    pair.base = getRealAssetName(pair["base"]);
    pair.quote_altname = pair["quote"];
    pair.quote = getRealAssetName(pair["quote"]);

    // Upsert fetched pairs into MongoDB
    db.get()
      .collection("pairs")
      .findOneAndReplace(
        {
          name: pair.name,
          exchange: "kraken"
        },
        pair,
        {
          upsert: true
        }
      )
      .catch(error => {
        throw error;
      });
  }
}

/**
 * Crawl Ticker
 */
function crawlTicker() {
  db.get()
    .collection("pairs")
    .distinct("name", {
      exchange: "kraken"
    })
    .then(res => {
      let pairs = res.filter(item => {
        return /^[A-Z]+$/.test(item);
      });

      logger.info(pairs.join());

      fetchUrl(api.ticker, {
        pair: pairs.join()
      });
    })
    .catch(error => {
      throw error;
    });
}

/**
 * Store fetched Ticker
 */
function storeTicker() {}

/**
 * Crawl OHLC
 */
function crawlOHLC() {
  db.get()
    .collection("krakenPairs")
    .find({ name: { $regex: "^[A-Z]+$" } })
    .forEach(
      pair => {
        if (pair) {
          fetchUrl(
            api.ohlc,
            {
              pair: pair["name"],
              interval: 60
            },
            pair
          );
        }
      },
      error => {
        throw error;
      }
    );
}

/**
 * Store fetched OHLC
 */
function storeOHLC(newDoc, input, pair) {
  // Insert field 'name for better indexing
  newDoc.name = input.pair;

  // Rename OHLC array
  if (newDoc[pair["altname"]]) {
    newDoc.ohlc = newDoc[pair["altname"]];
    delete newDoc[pair["altname"]];
  } else {
    logger.error(`kraken: error formatting ${pair["altname"]} ohlc`);
  }

  db.get()
    .collection("krakenOHLC")
    .findOneAndReplace(
      {
        name: input.pair
      },
      newDoc,
      {
        upsert: true
      }
    )
    .catch(error => {
      throw error;
    });
}

/**
 * Crawl Depth (aka order book)
 */
function crawlDepth() {
  db.get()
    .collection("krakenPairs")
    .find({ name: { $regex: "^[A-Z]+$" } })
    .forEach(
      pair => {
        if (pair) {
          fetchUrl(
            api.depth,
            {
              pair: pair["name"]
            },
            pair
          );
        }
      },
      error => {
        throw error;
      }
    );
}

/**
 * Store fetched Depth (aka order book)
 */
function storeDepth(newDoc, input, pair) {
  // Insert field 'name for better indexing
  newDoc.name = input.pair;

  // Move asks and bids arrays to document root
  if (newDoc[pair["altname"]]) {
    newDoc.asks = newDoc[pair["altname"]].asks;
    newDoc.bids = newDoc[pair["altname"]].bids;
    delete newDoc[pair["altname"]];
  } else {
    logger.error(`kraken: error formatting ${pair["altname"]} depth`);
  }

  db.get()
    .collection("krakenDepth")
    .findOneAndReplace({ name: input.pair }, newDoc, { upsert: true })
    .catch(error => {
      throw error;
    });
}

/**
 * Crawl Trades
 */
function crawlTrades() {
  db.get()
    .collection("krakenPairs")
    .find({ name: { $regex: "^[A-Z]+$" } })
    .forEach(
      pair => {
        if (pair) {
          fetchUrl(
            api.trades,
            {
              pair: pair["name"]
            },
            pair
          );
        }
      },
      error => {
        throw error;
      }
    );
}

/**
 * Store fetched Trades
 */
function storeTrades(newDoc, input, pair) {
  // Insert field 'name for better indexing
  newDoc.name = input.pair;

  // Rename trades array
  if (newDoc[pair["altname"]]) {
    newDoc.trades = newDoc[pair["altname"]];
    delete newDoc[pair["altname"]];
  } else {
    logger.error(`kraken: error formatting ${pair["altname"]} trades`);
  }

  db.get()
    .collection("krakenTrades")
    .findOneAndReplace({ name: input.pair }, newDoc, { upsert: true })
    .catch(error => {
      throw error;
    });
}

/**
 * Crawl Spread
 */
function crawlSpread() {
  db.get()
    .collection("krakenPairs")
    .find({ name: { $regex: "^[A-Z]+$" } })
    .forEach(
      pair => {
        if (pair) {
          fetchUrl(
            api.spread,
            {
              pair: pair["name"]
            },
            pair
          );
        }
      },
      error => {
        throw error;
      }
    );
}

/**
 * Store fetched Spread
 */
function storeSpread(newDoc, input, pair) {
  // Insert field 'name for better indexing
  newDoc.name = input.pair;

  // Rename spread array
  if (newDoc[pair["altname"]]) {
    newDoc.spread = newDoc[pair["altname"]];
    delete newDoc[pair["altname"]];
  } else {
    logger.error(`kraken: error formatting ${pair["altname"]} spread`);
  }

  db.get()
    .collection("krakenSpread")
    .findOneAndReplace(
      {
        name: input.pair
      },
      newDoc,
      {
        upsert: true
      }
    )
    .catch(error => {
      throw error;
    });
}
