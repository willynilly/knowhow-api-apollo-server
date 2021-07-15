const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/typedefs");
const resolvers = require("./graphql/resolvers");
const KnowHowAPI = require("./api/knowHowAPI");

const environment = process.env.NODE_ENV || "development";
const knexDbConfig = require("./knexfile")[environment];
const knowHowAPI = new KnowHowAPI(knexDbConfig);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return { knowHowAPI: knowHowAPI };
  },
  debug: false,
});

const app = express();
server.applyMiddleware({ app });

app.listen({ host: process.env.API_HOST, port: process.env.API_PORT }, () =>
  console.log(
    "Now browse to http://" +
      process.env.API_HOST +
      ":" +
      process.env.API_PORT +
      server.graphqlPath
  )
);
