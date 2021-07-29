require("dotenv").config();
const express = require("express");
const expressJwt = require("express-jwt");
const { ApolloServer, ApolloError } = require("apollo-server-express");

const schema = require("./graphql/schema");
const dataSources = require("./graphql/dataSources");
const { response } = require("express");

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
      context.userId = userByJwt.sub;
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

// catch all internal errors so that the stacktrace is not returned
// in the in response.
// log the error to the console
// for example, this prevents express-jwt from spitting back a stacktrace
// error when a malformed jwt is sent in the body of a request
app.use(function (err, req, res, next) {
  if (err) {
    console.log(err);
    const errors = [
      {
        message: "Not Authorised!",
      },
    ];
    return res.status(401).send({ errors, data: null });
  } else {
    next();
  }
});

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
