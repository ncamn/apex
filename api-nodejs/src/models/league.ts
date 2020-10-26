import Joi from "joi";
import mongodb from "mongodb";

import db from "../db.js";

const { ObjectId } = mongodb;

/**
 *
 */
export const League = Joi.object({
  name: Joi.string()
});

export const typeDef = `
  type League {
    _id: ID
    name: String
  }

  extend type Query {
    league(id: ID): League
    leagues(offset: Int, limit: Int): [League] 
  }
`;

export const league = (parent: any, { id }: { id: string }) =>
  db.collection("leagues").findOne({ _id: new ObjectId(id) });

export const leagues = (parent: any, { offset = 0, limit = 20 }) =>
  db
    .collection("leagues")
    .find({})
    .skip(offset)
    .limit(limit)
    .toArray();

export const resolvers = {
  Query: {
    league,
    leagues
  }
};

export default League;
