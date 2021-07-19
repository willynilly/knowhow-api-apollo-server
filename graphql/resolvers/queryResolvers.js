const queryResolvers = {
  users: async (parent, args, context, info) => {
    let userService = context.dataSources.knowHowAPI.userService;
    return userService.findAll();
  },
  user: async (parent, args, context, info) => {
    let userService = context.dataSources.knowHowAPI.userService;
    return userService.findById(args.id);
  },
  badges: async (parent, args, context, info) => {
    let badgeService = context.dataSources.knowHowAPI.badgeService;
    return badgeService.findAll();
  },
  badge: async (parent, args, context, info) => {
    let badgeService = context.dataSources.knowHowAPI.badgeService;
    return badgeService.findById(args.id);
  },
  badgesByAuthor: async (parent, args, context, info) => {
    let badgeService = context.dataSources.knowHowAPI.badgeService;
    return badgeService.findByAuthorUserId(args.author_user_id);
  },
  reviews: async (parent, args, context, info) => {
    let reviewService = context.dataSources.knowHowAPI.reviewService;
    return reviewService.findAll();
  },
  review: async (parent, args, context, info) => {
    let reviewService = context.dataSources.knowHowAPI.reviewService;
    return reviewService.findById(args.id);
  },
  reviewsByRequester: async (parent, args, context, info) => {
    let reviewService = context.dataSources.knowHowAPI.reviewService;
    return reviewService.findByRequesterUserId(args.requester_user_id);
  },
  reviewsByReviewer: async (parent, args, context, info) => {
    let reviewService = context.dataSources.knowHowAPI.reviewService;
    return reviewService.findByReviewerUserId(args.reviewer_user_id);
  },
};

module.exports = queryResolvers;
