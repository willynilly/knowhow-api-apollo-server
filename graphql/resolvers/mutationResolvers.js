const mutationResolvers = {
  loginByEmailAddress: async (parent, args, context, info) => {
    let userService = context.dataSources.knowHowAPI.userService;
    return userService.loginByEmailAddress(args.email_address, args.password);
  },

  loginByPhoneNumber: async (parent, args, context, info) => {
    let userService = context.dataSources.knowHowAPI.userService;
    return userService.loginByPhoneNumber(args.phone_number, args.password);
  },

  createUserByEmailAddress: async (parent, args, context, info) => {
    let userService = context.dataSources.knowHowAPI.userService;
    return userService.createByEmailAddress(args.email_address);
  },

  createUserByPhoneNumber: async (parent, args, context, info) => {
    let userService = context.dataSources.knowHowAPI.userService;
    return userService.createByPhoneNumber(args.phone_number);
  },

  updateUser: async (parent, args, context, info) => {
    let userService = context.dataSources.knowHowAPI.userService;
    return userService.update(args.update_user_input);
  },

  deleteUser: async (parent, args, context, info) => {
    let userService = context.dataSources.knowHowAPI.userService;
    return userService.delete(args.id);
  },

  createBadge: async (parent, args, context, info) => {
    let badgeService = context.dataSources.knowHowAPI.badgeService;
    return badgeService.createBadgeByAuthorUserIdAndAchievement(
      args.create_badge_input.author_user_id,
      args.create_badge_input.achievement
    );
  },

  deleteBadge: async (parent, args, context, info) => {
    let badgeService = context.dataSources.knowHowAPI.badgeService;
    return badgeService.delete(args.id);
  },

  inviteReviewByUserId: async (parent, args, context, info) => {
    let reviewService = context.dataSources.knowHowAPI.reviewService;
    return reviewService.inviteReviewByUserId(
      args.invite_review_by_user_id_input.badge_id,
      args.invite_review_by_user_id_input.requester_user_id,
      args.invite_review_by_user_id_input.reviewer_user_id
    );
  },

  inviteReviewByEmailAddress: async (parent, args, context, info) => {
    let reviewService = context.dataSources.knowHowAPI.reviewService;
    return reviewService.inviteReviewByEmailAddress(
      args.invite_review_by_user_id_input.badge_id,
      args.invite_review_by_user_id_input.requester_user_id,
      args.invite_review_by_user_id_input.reviewer_email_address
    );
  },

  inviteReviewByPhoneNumber: async (parent, args, context, info) => {
    let reviewService = context.dataSources.knowHowAPI.reviewService;
    return reviewService.inviteReviewByPhoneNumber(
      args.invite_review_by_user_id_input.badge_id,
      args.invite_review_by_user_id_input.requester_user_id,
      args.invite_review_by_user_id_input.reviewer_phone_number
    );
  },

  doReview: async (parent, args, context, info) => {
    let reviewService = context.dataSources.knowHowAPI.reviewService;
    return reviewService.doReview(
      args.review_id,
      args.is_approved,
      args.is_denied,
      args.reviewerComment
    );
  },

  replyReview: async (parent, args, context, info) => {
    let reviewService = context.dataSources.knowHowAPI.reviewService;
    return reviewService.replyReview(args.review_id, args.requester_comment);
  },

  deleteReview: async (parent, args, context, info) => {
    let reviewService = context.dataSources.knowHowAPI.reviewService;
    return reviewService.delete(args.id);
  },
};

module.exports = mutationResolvers;
