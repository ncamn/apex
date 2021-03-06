import faker from "faker";

import db, { client } from "../db.js";
import logger from "../logger.js";
import { CardType } from "../models/match.js";

const redo = process.argv.reduce(
  (previous, arg) => previous || arg === "--redo",
  false
);

const undo = process.argv.reduce(
  (previous, arg) => previous || arg === "--undo",
  false
);

if (redo || undo) {
  await db.collection("clubs").deleteMany({});
  logger.info("mongoose: clubs collection pruned");

  await db.collection("leagues").deleteMany({});
  logger.info("mongoose: leagues collection pruned");

  await db.collection("matches").deleteMany({});
  logger.info("mongoose: matches collection pruned");

  await db.collection("players").deleteMany({});
  logger.info("mongoose: players collection pruned");

  await db.collection("referees").deleteMany({});
  logger.info("mongoose: referees collection pruned");

  await db.collection("stadiums").deleteMany({});
  logger.info("mongoose: stadiums collection pruned");

  if (undo) process.exit();
}

const getRandomMatchTime = () => faker.random.number(5400);

/**
 * Leagues
 */
const leagues = [...Array(10)].map((_, index) => ({
  name: `Ligue ${index}`
}));
await db.collection("leagues").insertMany(leagues);
logger.info("mongodb: leagues collection seeded");

/**
 * Stadiums
 */
const stadiums = [...Array(100)].map(() => ({
  name: `${faker.company.companyName()} Arena`,
  city: faker.address.city()
}));
await db.collection("stadiums").insertMany(stadiums);
logger.info("mongodb: stadiums collection seeded");

/**
 * Clubs
 */
const clubs = [...Array(100)].map(() => ({
  name: faker.address.city()
}));
await db.collection("clubs").insertMany(clubs);
logger.info("mongodb: clubs collection seeded");

/**
 * Players
 */
const players = [...Array(1000)].map(() => ({
  avatar: faker.image.avatar(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  birthday: faker.date.past(),
  birthplace: faker.address.city()
}));
await db.collection("players").insertMany(players);
logger.info("mongodb: players collection seeded");

/**
 * Referees
 */
const referees = [...Array(100)].map(() => ({
  avatar: faker.image.avatar(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  birthday: faker.date.past()
}));
await db.collection("referees").insertMany(referees);
logger.info("mongodb: referees collection seeded");

/**
 * Matches
 */
const matches = await Promise.all(
  [...Array(10000)].map(async () => {
    const club1 = await db
      .collection("clubs")
      .find({})
      .limit(1)
      .skip(faker.random.number(clubs.length - 1))
      .next();

    const players1 = await db
      .collection("players")
      .find({})
      .limit(11)
      .skip(faker.random.number(players.length - 11))
      .toArray();

    const club2 = await db
      .collection("clubs")
      .find({})
      .limit(1)
      .skip(faker.random.number(clubs.length - 1))
      .next();

    const players2 = await db
      .collection("players")
      .find({})
      .limit(11)
      .skip(faker.random.number(players.length - 11))
      .toArray();

    const stadium = await db
      .collection("stadiums")
      .find({})
      .limit(1)
      .skip(faker.random.number(stadiums.length - 1))
      .next();

    const referee = await db
      .collection("referees")
      .find({})
      .limit(1)
      .skip(faker.random.number(referees.length - 1))
      .next();

    return {
      date: faker.date.recent(),
      club1: {
        atHome: faker.random.boolean(),
        cards: [...Array(6)].map(() => ({
          player: players1[faker.random.number(10)]._id,
          time: getRandomMatchTime(),
          type: CardType.Red
        })),
        club: club1._id,
        players: players1.map(({ _id }) => _id),
        goals: [...Array(faker.random.number(6))].map(() => ({
          player: players1[faker.random.number(10)]._id,
          time: getRandomMatchTime()
        })),
        substitutions: [...Array(faker.random.number(4))].map(() => ({
          player: players1[faker.random.number(10)]._id,
          substitute: players1[faker.random.number(10)]._id,
          time: getRandomMatchTime()
        }))
      },
      club2: {
        atHome: faker.random.boolean(),
        cards: [...Array(faker.random.number(6))].map(() => ({
          player: players2[faker.random.number(10)]._id,
          time: getRandomMatchTime(),
          type: CardType.Red
        })),
        club: club2._id,
        players: players2.map(({ _id }) => _id),
        goals: [...Array(faker.random.number(6))].map(() => ({
          player: players2[faker.random.number(10)]._id,
          time: getRandomMatchTime()
        })),
        substitutions: [...Array(faker.random.number(4))].map(() => ({
          player: players2[faker.random.number(10)]._id,
          substitute: players2[faker.random.number(10)]._id,
          time: getRandomMatchTime()
        }))
      },
      referee: referee._id,
      stadium: stadium._id
    };
  })
);
await db.collection("matches").insertMany(matches);
logger.info("mongodb: matches collection seeded");

await client.close();
