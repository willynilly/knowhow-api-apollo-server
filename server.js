require("dotenv").config();
const express = require("express");
const expressJwt = require("express-jwt");
const { ApolloServer } = require("apollo-server-express");

const schema = require("./graphql/schema");
const dataSources = require("./graphql/dataSources");

const server = new ApolloServer({
  schema: schema,
  dataSources: dataSources,
  context: (context) => {
    // get the user object decoded by express-jwt and placed on the request object
    const userByJwt = context.req.user || null;
    // add the user id and user roles back to the context object
    if (userByJwt === null) {
      context.userId = null;
      context.userRoles = [];
    } else {
      context.userId = userByJwt.id;
      context.userRoles = userByJwt.roles;
    }
    return context;
  },
  debug: false,
  path: process.env.API_GRAPHQL_PATH,
});

const app = express();

// check the incoming token, decode it, and add the user info to the context
app.use(
  expressJwt({
    secret: process.env.API_JWT_SECRET,
    algorithms: [process.env.API_JWT_ALGORITHM],
    credentialsRequired: false,
  })
);

// start the server
(async () => {
  await server.start();

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
})();
