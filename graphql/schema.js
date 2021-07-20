const typeDefs = require("./typedefs");
const resolvers = require("./resolvers/resolvers");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { applyMiddleware } = require("graphql-middleware");
const permissions = require("./permissions");
const schema = applyMiddleware(
  makeExecutableSchema({ typeDefs, resolvers }), // build original schema
  permissions // add permissions to it using graphml-shield
);

module.exports = schema;
