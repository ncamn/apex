import Joi from "@hapi/joi";
import mongodb from "mongodb";

import db from "../db.js";

const { ObjectId } = mongodb;

/**
 *
 */
export const Club = Joi.object({
  name: Joi.string()
});

export const typeDef = `
  type Club {
    _id: ID
    name: String
    matches: [Match]
    players: [Player]
    stadium: Stadium
  }

  extend type Query {
    club(id: ID): Club
    clubs(offset: Int, limit: Int): [Club] 
  }
`;

const club = (parent: any, { id }: { id: string }) =>
  db.collection("clubs").findOne({ _id: new ObjectId(id) });

const clubs = (parent: any, { offset = 0, limit = 20 }) =>
  db
    .collection("clubs")
    .find({})
    .skip(offset)
    .limit(limit)
    .toArray();

const matches = ({ _id }: { _id: mongodb.ObjectID }) =>
  db
    .collection("matches")
    .find({
      $or: [{ "club1.club": _id }, { "club2.club": _id }]
    })
    .toArray();

const players = ({ _id }: { _id: mongodb.ObjectID }) =>
  // Query the database for all matches where the club has played
  db
    .collection("matches")
    .find({
      $or: [{ "club1.club": _id }, { "club2.club": _id }]
    })
    .toArray()
    // Retrieve an array of array of players who played this match
    .then(matches =>
      matches.map((match: any) =>
        _id.toString() === match.club1.club.toString()
          ? match.club1.players
          : match.club2.players
      )
    )
    // Flatten of array of array of players
    .then(players => players.flat())
    .then(players => players.map(player => player.toString()))
    // Remove duplicates from the array of players
    .then(players => [...new Set(players)])
    .then(players => players.map(player => new ObjectId(player)))
    // Retrieve players documents from the database using their IDs found previously
    .then(players =>
      db
        .collection("players")
        .find({
          _id: { $in: players }
        })
        .toArray()
    );

const stadium = ({ stadium: stadiumId }: { stadium: mongodb.ObjectID }) =>
  db.collection("stadiums").findOne({ _id: stadiumId });

export const resolvers = {
  Query: {
    club,
    clubs
  },
  Club: {
    matches,
    players,
    stadium
  }
};

export default Club;
