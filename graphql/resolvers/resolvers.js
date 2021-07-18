const dateScalar = require("../dateScalar");
const queryResolvers = require("./queryResolvers");
const badgeResolvers = require("./badgeResolvers");
const reviewResolvers = require("./reviewResolvers");
const mutationResolvers = require("./mutationResolvers");

const resolvers = {
  Date: dateScalar,
  Query: queryResolvers,
  Badge: badgeResolvers,
  Review: reviewResolvers,
  Mutation: mutationResolvers,
};

module.exports = resolvers;
