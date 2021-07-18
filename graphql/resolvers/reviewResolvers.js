const reviewResolvers = {
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
};

module.exports = reviewResolvers;
