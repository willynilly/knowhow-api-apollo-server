require("dotenv").config();
const express = require("express");
const expressJwt = require("express-jwt");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/typedefs");
const resolvers = require("./graphql/resolvers/resolvers");
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
  context: (context) => {
    // get the user object decoded by express-jwt and placed on the request object
    const user = context.req.user || null;
    // add the user back to the context object
    context.user = user;
    return context;
  },
  debug: false,
  path: process.env.API_GRAPHQL_PATH,
});

const app = express();
app.use(
  expressJwt({
    secret: process.env.API_JWT_SECRET,
    algorithms: [process.env.API_JWT_ALGORITHM],
    credentialsRequired: false,
  })
);

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
