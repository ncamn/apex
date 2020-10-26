import Joi from "joi";
import mongodb from "mongodb";

import db from "../db.js";

const { ObjectId } = mongodb;

/**
 * TODO
 * Check the performance impact when merging the cards, goal and substitution subdocuments
 * into a common "events" document array, which can be filtered with an enum representing the event type
 *
 * Example:
 *
 * enum EventType {
 *   GOAL,
 *   RED_CARD,
 *   SUBSTITUTION,
 *   YELLOW_CARD
 * }
 *
 * const Event = Joi.object({
 *   player: Joi.string(), // Player _id
 *   time: Joi.number() // In seconds
 *   type: Joi.string() // EventType enum
 * })
 */

export enum CardType {
  // eslint-disable-next-line no-unused-vars
  Red = "RED",
  // eslint-disable-next-line no-unused-vars
  Yellow = "YELLOW"
}

/**
 *
 */
const Card = Joi.object({
  player: Joi.string(), // Player _id
  time: Joi.number(), // In seconds
  type: Joi.string() // CardType
});

/**
 *
 */
const Goal = Joi.object({
  scorer: Joi.string(), // Player _id
  time: Joi.number() // In seconds
});

/**
 *
 */
const Substitution = Joi.object({
  player: Joi.string(), // Player _id
  substitute: Joi.string(), // Player _id
  time: Joi.number() // In seconds
});

/**
 *
 */
const ClubMatchPerformance = Joi.object({
  atHome: Joi.boolean(),
  cards: Joi.array().items(Card),
  club: Joi.string(), // Club _id
  players: Joi.array().items(Joi.string()), // Player _id
  goals: Joi.array().items(Goal),
  substitutions: Joi.array().items(Substitution)
});

/**
 *
 */
export const Match = Joi.object({
  date: Joi.date(),
  stadium: Joi.string(), // Stadium _id
  club1: ClubMatchPerformance,
  club2: ClubMatchPerformance,
  referee: Joi.string() // Referee _id
});

export const typeDef = `
  enum CardType {
    RED
    YELLOW
  }
  
  type Card {
    player: Player
    time: Date
    type: CardType
  }
  
  type Goal {
    player: Player
    time: Date
  }

  type Substitution {
    player: Player
    substitute: Player
    time: Date
  }

  type ClubMatchPerformance {
    atHome: Boolean
    cards: [Card]
    club: Club,
    players: [Player]
    goals: [Goal],
    substitutions: [Substitution]
  }

  type Match {
    _id: ID
    club1: ClubMatchPerformance
    club2: ClubMatchPerformance
    date: Date
    referee: Referee
    stadium: Stadium
  }

  extend type Query {
    match(id: ID): Match
    matches(offset: Int, limit: Int): [Match]
  }
`;

const club = ({ club: clubId }: { club: string }) =>
  db.collection("clubs").findOne({ _id: new ObjectId(clubId) });

const match = (parent: any, { id }: { id: string }) =>
  db.collection("matches").findOne({ _id: new ObjectId(id) });

const matches = (parent: any, { offset = 0, limit = 20 }) =>
  db
    .collection("matches")
    .find({})
    .skip(offset)
    .limit(limit)
    .toArray();

const referee = ({ referee: refereeId }: { referee: string }) =>
  db.collection("referees").findOne({ _id: new ObjectId(refereeId) });

const stadium = ({ stadium: stadiumId }: { stadium: string }) =>
  db.collection("stadiums").findOne({ _id: new ObjectId(stadiumId) });

const player = ({ player: playerId }: { player: string }) =>
  db.collection("players").findOne({ _id: new ObjectId(playerId) });

export const resolvers = {
  Query: {
    match,
    matches
  },
  Match: {
    referee,
    stadium
  },
  ClubMatchPerformance: {
    club
  },
  Card: {
    player
  },
  Goal: {
    player
  }
};

export default Match;
