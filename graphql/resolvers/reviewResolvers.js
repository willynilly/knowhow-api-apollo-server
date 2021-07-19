const reviewResolvers = {
  badge: (parent, args, context, info) => {
    let badgeService = context.dataSources.knowHowAPI.badgeService;
    return badgeService.findById(parent.badge_id);
  },

  requester: (parent, args, context, info) => {
    let userService = context.dataSources.knowHowAPI.userService;
    return userService.findById(parent.requester_user_id);
  },

  reviewer: (parent, args, context, info) => {
    let userService = context.dataSources.knowHowAPI.userService;
    return userService.findById(parent.reviewer_user_id);
  },
};

module.exports = reviewResolvers;
