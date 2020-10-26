import Joi from "joi";
import mongodb from "mongodb";

import db from "../db.js";

const { ObjectId } = mongodb;

/**
 *
 */
export const Player = Joi.object({
  avatar: Joi.string(),
  firstName: Joi.string(),
  lastName: Joi.string(),
  birthday: Joi.date(),
  birthplace: Joi.string()
});

export const typeDef = `
  type Player {
    _id: ID
    avatar: String
    firstName: String
    lastName: String
    birthday: Date
    birthplace: String
    clubs: [Club]
    matches: [Match]
  }

  extend type Query {
    player(id: ID): Player
    players(offset: Int, limit: Int): [Player]
  }
`;

const clubs = ({ _id }: { _id: mongodb.ObjectId }) =>
  // Query the database for all the matches where the player was on field
  db
    .collection("matches")
    .find({
      $or: [{ "club1.players": _id }, { "club2.players": _id }]
    })
    .toArray()
    // Retrieve the array of player's clubs IDs from the matches he played
    .then(matches =>
      matches.map(({ club1, club2 }) =>
        club1.players.includes(_id.toString())
          ? club1.club.toString()
          : club2.club.toString()
      )
    )
    // Remove duplicates
    .then(clubs => [...new Set(clubs)])
    // Convert each club ID to a MongoDB ObjectId
    .then(clubs => clubs.map(clubId => new ObjectId(clubId)))
    // Retrieve clubs documents from the database using their IDs found previously
    .then(clubs =>
      db
        .collection("clubs")
        .find({
          _id: { $in: clubs }
        })
        .toArray()
    );

const matches = ({ _id }: { _id: mongodb.ObjectId }) =>
  db
    .collection("matches")
    .find({
      $or: [{ "club1.players": _id }, { "club2.players": _id }]
    })
    .toArray();

const player = (parent: any, { id }: { id: string }) =>
  db.collection("players").findOne({ _id: new ObjectId(id) });

const players = (parent: any, { offset = 0, limit = 20 }) =>
  db
    .collection("players")
    .find({})
    .skip(offset)
    .limit(limit)
    .toArray();

export const resolvers = {
  Query: {
    player,
    players
  },
  Player: {
    matches,
    clubs
  }
};

export default Player;
