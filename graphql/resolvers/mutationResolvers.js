const mutationResolvers = {
  registerUserByEmailAddressAndPassword: async (
    parent,
    args,
    context,
    info
  ) => {
    let userService = context.dataSources.knowHowAPI.userService;
    return userService.registerByEmailAddressAndPassword(
      args.email_address,
      args.password
    );
  },

  registerUserByPhoneNumberAndPassword: async (parent, args, context, info) => {
    let userService = context.dataSources.knowHowAPI.userService;
    return userService.registerByPhoneNumberAndPassword(
      args.phone_number,
      args.password
    );
  },

  verifyEmailAddress: async (parent, args, context, info) => {
    let userService = context.dataSources.knowHowAPI.userService;
    return userService.verifyEmailAddress(context.userId);
  },

  verifyPhoneNumber: async (parent, args, context, info) => {
    let userService = context.dataSources.knowHowAPI.userService;
    return userService.verifyPhoneNumber(context.userId);
  },

  loginByEmailAddressAndPassword: async (parent, args, context, info) => {
    let userService = context.dataSources.knowHowAPI.userService;
    return userService.loginByEmailAddressAndPassword(
      args.email_address,
      args.password
    );
  },

  loginByPhoneNumberAndPassword: async (parent, args, context, info) => {
    let userService = context.dataSources.knowHowAPI.userService;
    return userService.loginByPhoneNumberAndPassword(
      args.phone_number,
      args.password
    );
  },

  resetPasswordByEmailAddress: async (parent, args, context, info) => {
    let userService = context.dataSources.knowHowAPI.userService;
    return userService.resetPasswordByEmailAddress(args.email_address);
  },

  resetPasswordByPhoneNumber: async (parent, args, context, info) => {
    let userService = context.dataSources.knowHowAPI.userService;
    return userService.resetPasswordByPhoneNumber(args.phone_number);
  },

  updatePassword: async (parent, args, context, info) => {
    let userService = context.dataSources.knowHowAPI.userService;
    return userService.updatePassword(
      args.update_password_input.user_id,
      args.update_password_input.password
    );
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
      args.invite_review_by_user_id_input.requester_invite,
      args.invite_review_by_user_id_input.reviewer_user_id
    );
  },

  inviteReviewByEmailAddress: async (parent, args, context, info) => {
    let reviewService = context.dataSources.knowHowAPI.reviewService;
    return reviewService.inviteReviewByEmailAddress(
      args.invite_review_by_email_address_input.badge_id,
      args.invite_review_by_email_address_input.requester_user_id,
      args.invite_review_by_email_address_input.requester_invite,
      args.invite_review_by_email_address_input.reviewer_email_address
    );
  },

  inviteReviewByPhoneNumber: async (parent, args, context, info) => {
    let reviewService = context.dataSources.knowHowAPI.reviewService;
    return reviewService.inviteReviewByPhoneNumber(
      args.invite_review_by_phone_number_input.badge_id,
      args.invite_review_by_phone_number_input.requester_user_id,
      args.invite_review_by_phone_number_input.requester_invite,
      args.invite_review_by_phone_number_input.reviewer_phone_number
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
