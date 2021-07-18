const queryResolvers = {
  users: async (parent, args, context, info) => {
    let userService = context.dataSources.knowHowAPI.userService;
    console.log("users");
    console.log(args);
    return userService.findAll();
  },
  user: async (parent, args, context, info) => {
    let userService = context.dataSources.knowHowAPI.userService;
    console.log("user");
    console.log(args);
    return userService.findById(args.id);
  },
  badges: async (parent, args, context, info) => {
    let badgeService = context.dataSources.knowHowAPI.badgeService;
    console.log("badges");
    console.log(args);
    return badgeService.findAll();
  },
  badge: async (parent, args, context, info) => {
    let badgeService = context.dataSources.knowHowAPI.badgeService;
    console.log("badge");
    console.log(args);
    return badgeService.findById(args.id);
  },
  badgesByAuthor: async (parent, args, context, info) => {
    let badgeService = context.dataSources.knowHowAPI.badgeService;
    console.log("badgesBuAuthor");
    console.log(args);
    return badgeService.findByAuthorUserId(args.author_user_id);
  },
  reviews: async (parent, args, context, info) => {
    let reviewService = context.dataSources.knowHowAPI.reviewService;
    console.log("reviews");
    console.log(args);
    return reviewService.findAll();
  },
  review: async (parent, args, context, info) => {
    let reviewService = context.dataSources.knowHowAPI.reviewService;
    console.log("review");
    console.log(args);
    return reviewService.findById(args.id);
  },
  reviewsByRequester: async (parent, args, context, info) => {
    let reviewService = context.dataSources.knowHowAPI.reviewService;
    console.log("reviewsByRequester");
    console.log(args);
    return reviewService.findByRequesterUserId(args.requester_user_id);
  },
  reviewsByReviewer: async (parent, args, context, info) => {
    let reviewService = context.dataSources.knowHowAPI.reviewService;
    console.log("reviewsByRequester");
    console.log(args);
    return reviewService.findByReviewerUserId(args.reviewer_user_id);
  },
};

module.exports = queryResolvers;
