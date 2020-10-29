import Joi from "joi";
import mongodb from "mongodb";

import db from "../db.js";

const { ObjectId } = mongodb;

export const User = Joi.object({
  email: Joi.string(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  password: Joi.string()
});

export const typeDef = `
  type User {
    _id: ID
    email: String
    firstName: String
    lastName: String
    password: String
  }

  extend type Query {
    user(id: ID): User
  }
`;

const user = (parent: any, { id }: { id: string }) =>
  db.collection("users").findOne({ _id: new ObjectId(id) });

export const resolvers = {
  Query: {
    user
  }
};

export default User;
