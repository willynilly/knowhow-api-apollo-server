const dateScalar = require("./dateScalar");

const resolvers = {
  Date: dateScalar,
  Query: {
    users: (parent, args, context, info) => {
      let userService = context.dataSources.knowHowAPI.userService;
      console.log("users");
      console.log(args);
      return userService.findAll();
    },
    user: (parent, args, context, info) => {
      let userService = context.dataSources.knowHowAPI.userService;
      console.log("user");
      console.log(args);
      return userService.findById(args.id);
    },
    badges: (parent, args, context, info) => {
      let badgeService = context.dataSources.knowHowAPI.badgeService;
      console.log("badges");
      console.log(args);
      return badgeService.findAll();
    },
    badge: (parent, args, context, info) => {
      let badgeService = context.dataSources.knowHowAPI.badgeService;
      console.log("badge");
      console.log(args);
      return badgeService.findById(args.id);
    },
    badgesByAuthor: (parent, args, context, info) => {
      let badgeService = context.dataSources.knowHowAPI.badgeService;
      console.log("badgesBuAuthor");
      console.log(args);
      return badgeService.findByAuthorUserId(args.author_user_id);
    },
    reviews: (parent, args, context, info) => {
      let reviewService = context.dataSources.knowHowAPI.reviewService;
      console.log("reviews");
      console.log(args);
      return reviewService.findAll();
    },
    review: (parent, args, context, info) => {
      let reviewService = context.dataSources.knowHowAPI.reviewService;
      console.log("review");
      console.log(args);
      return reviewService.findById(args.id);
    },
    reviewsByRequester: (parent, args, context, info) => {
      let reviewService = context.dataSources.knowHowAPI.reviewService;
      console.log("reviewsByRequester");
      console.log(args);
      return reviewService.findByRequesterUserId(args.requester_user_id);
    },
    reviewsByReviewer: (parent, args, context, info) => {
      let reviewService = context.dataSources.knowHowAPI.reviewService;
      console.log("reviewsByRequester");
      console.log(args);
      return reviewService.findByReviewerUserId(args.reviewer_user_id);
    },
  },

  Badge: {
    author: (parent, args, context, info) => {
      let userService = context.dataSources.knowHowAPI.userService;
      console.log("badge author user");
      console.log(args);
      return userService.findById(parent.author_user_id);
    },
  },

  Review: {
    badge: (parent, args, context, info) => {
      let badgeService = context.dataSources.knowHowAPI.badgeService;
      console.log("review badge");
      console.log(args);
      return badgeService.findById(parent.badge_id);
    },

    requester: (parent, args, context, info) => {
      let userService = context.dataSources.knowHowAPI.userService;
      console.log("review requester user");
      console.log(args);
      return userService.findById(parent.requester_user_id);
    },

    reviewer: (parent, args, context, info) => {
      let userService = context.dataSources.knowHowAPI.userService;
      console.log("review reviewer user");
      console.log(args);
      return userService.findById(parent.reviewer_user_id);
    },
  },
};

module.exports = resolvers;
