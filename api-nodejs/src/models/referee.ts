import Joi from "joi";
import mongodb from "mongodb";

import db from "../db.js";

const { ObjectId } = mongodb;

/**
 *
 */
export const Referee = Joi.object({
  avatar: Joi.string(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  birthday: Joi.date()
});

export const typeDef = `
  type Referee {
    _id: ID
    avatar: String
    firstName: String
    lastName: String
    birthday: Date
  }

  extend type Query {
    referee(id: ID): Referee
    referees(offset: Int, limit: Int): [Referee] 
  }
`;

const referee = (parent: any, { id }: { id: string }) =>
  db.collection("referees").findOne({ _id: new ObjectId(id) });

const referees = (parent: any, { offset = 0, limit = 20 }) =>
  db
    .collection("referees")
    .find({})
    .skip(offset)
    .limit(limit)
    .toArray();

export const resolvers = {
  Query: {
    referee,
    referees
  }
};

export default Referee;
