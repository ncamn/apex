import cors from "@koa/cors";
import apolloServerKoa from "apollo-server-koa";
import Koa from "koa";
import _ from "lodash";
import morgan from "koa-morgan";

/**
 * Routers
 */
import index from "./routes/index.js";
import healthz from "./routes/healthz.js";

/**
 * GraphQL
 */
import {
  ClubResolvers,
  ClubTypeDef,
  LeagueResolvers,
  LeagueTypeDef,
  MatchResolvers,
  MatchTypeDef,
  PlayerResolvers,
  PlayerTypeDef,
  RefereeResolvers,
  RefereeTypeDef,
  StadiumResolvers,
  StadiumTypeDef,
  UserResolvers,
  UserTypeDef
} from "./models/index.js";

const { ApolloServer } = apolloServerKoa;

// Koa app
const app = new Koa();

// Requests logger
if (process.env.NODE_ENV !== "test") {
  app.use(morgan("common"));
}

// CORS policy
app.use(cors());

// Construct a schema, using GraphQL schema language
const typeDefs = [
  `
  scalar Date
  type Query
  `,
  ClubTypeDef,
  LeagueTypeDef,
  MatchTypeDef,
  PlayerTypeDef,
  RefereeTypeDef,
  StadiumTypeDef,
  UserTypeDef
];

// The root provides a resolver function for each API endpoint
const resolvers = _.merge(
  ClubResolvers,
  LeagueResolvers,
  MatchResolvers,
  PlayerResolvers,
  RefereeResolvers,
  StadiumResolvers,
  UserResolvers
);

/**
 * Routes
 */
app.use(
  new ApolloServer({
    typeDefs,
    resolvers
  }).getMiddleware()
);
app.use(healthz);
app.use(index);

export default app;
