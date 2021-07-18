const badgeResolvers = {
  author: async (parent, args, context, info) => {
    let userService = context.dataSources.knowHowAPI.userService;
    return userService.findById(parent.author_user_id);
  },
};

module.exports = badgeResolvers;
