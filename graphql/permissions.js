const { rule, shield, and, or, not } = require("graphql-shield");

const isAuthenticated = rule({ cache: "contextual" })(
  async (parent, args, context, info) => {
    return (
      context.user !== null && context.user.roles.includes("authenticated")
    );
  }
);

const isAdmin = rule({ cache: "contextual" })(
  async (parent, args, context, info) => {
    return context.user.roles.includes("admin");
  }
);

// Permissions

const permissions = shield({
  Query: {
    users: isAuthenticated,
    user: isAuthenticated,
    badges: isAuthenticated,
    badge: isAuthenticated,
    badgesByAuthor: isAuthenticated,
    reviews: isAuthenticated,
    review: isAuthenticated,
    reviewsByRequester: isAuthenticated,
    reviewsByReviewer: isAuthenticated,
  },
  Mutation: {
    loginByEmailAddress: not(isAuthenticated),
    loginByPhoneNumber: not(isAuthenticated),

    createUserByEmailAddress: isAuthenticated,
    createUserByPhoneNumber: isAuthenticated,
    updateUser: isAuthenticated,
    deleteUser: isAuthenticated,

    createBadge: isAuthenticated,
    deleteBadge: isAuthenticated,

    inviteReviewByUserId: isAuthenticated,
    inviteReviewByEmailAddress: isAuthenticated,
    inviteReviewByPhoneNumber: isAuthenticated,
    doReview: isAuthenticated,
    replyReview: isAuthenticated,
    deleteReview: isAuthenticated,
  },
});

module.exports = permissions;
