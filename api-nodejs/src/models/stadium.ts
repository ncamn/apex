import Joi from "joi";
import mongodb from "mongodb";

import db from "../db.js";

const { ObjectId } = mongodb;

/**
 *
 */
export const Stadium = Joi.object({
  name: Joi.string()
});

export const typeDef = `
  type Stadium {
    _id: ID
    name: String
    city: String
  }

  extend type Query {
    stadium(id: ID): Stadium
    stadiums(offset: Int, limit: Int): [Stadium] 
  }
`;

const stadium = (parent: any, { id }: { id: string }) =>
  db.collection("stadiums").findOne({ _id: new ObjectId(id) });

const stadiums = (parent: any, { offset = 0, limit = 20 }) =>
  db
    .collection("stadiums")
    .find({})
    .skip(offset)
    .limit(limit)
    .toArray();

export const resolvers = {
  Query: {
    stadium,
    stadiums
  }
};

export default Stadium;
