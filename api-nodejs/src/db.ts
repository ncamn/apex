import mongodb from "mongodb";

import logger from "./logger.js";

const { MongoClient } = mongodb;

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost:27017";

export const client = await MongoClient.connect(mongoUrl, {
  useUnifiedTopology: true
});

logger.info(`mongodb: connected to ${mongoUrl}`);

export default client.db(process.env.MONGO_DB || "apex");
