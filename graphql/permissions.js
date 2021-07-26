const { rule, shield, and, or, not } = require("graphql-shield");
const { badge } = require("./resolvers/queryResolvers");

const createHasUserRoleRule = (roleName) => {
  return rule({ cache: "contextual" })(async (parent, args, context, info) => {
    return context.userId !== null && context.userRoles.includes(roleName);
  });
};

const canResetPassword = createHasUserRoleRule("can_reset_password");
const canVerifyEmailAddress = createHasUserRoleRule("can_verify_email_address");
const canVerifyPhoneNumber = createHasUserRoleRule("can_verify_phone_number");
const isAuthenticated = createHasUserRoleRule("authenticated");
const isAdmin = createHasUserRoleRule("admin");

const isUserForUpdatePassword = rule({ cache: "contextual" })(
  async (parent, args, context, info) => {
    return (
      context.userId !== null &&
      args.update_password_input.user_id == context.userId
    );
  }
);

const isUserForUpdateUser = rule({ cache: "contextual" })(
  async (parent, args, context, info) => {
    return (
      context.userId !== null && args.update_user_input.id == context.userId
    );
  }
);

const isUserForDeleteUser = rule({ cache: "contextual" })(
  async (parent, args, context, info) => {
    return context.userId !== null && args.id == context.userId;
  }
);

const isUserForCreateBadge = rule({ cache: "contextual" })(
  async (parent, args, context, info) => {
    return (
      context.userId !== null &&
      args.create_badge_input.author_user_id == context.userId
    );
  }
);

const isUserForDeleteBadge = rule({ cache: "contextual" })(
  async (parent, args, context, info) => {
    let badgeService = context.dataSources.knowHowAPI.badgeService;
    badge = await badgeService.findById(args.id);
    if (!badge) {
      return false;
    }
    return context.userId !== null && badge.author_user_id == context.userId;
  }
);

const isUserForInviteReview = rule({ cache: "contextual" })(
  async (parent, args, context, info) => {
    if (args.invite_review_by_user_id_input) {
      requester_user_id = args.invite_review_by_user_id_input.requester_user_id;
    } else if (args.invite_review_by_email_address_input) {
      requesterUserId =
        args.invite_review_by_email_address_input.requester_user_id;
    } else if (args.invite_review_by_phone_number_input) {
      requesterUserId =
        args.invite_review_by_phone_number_input.requester_user_id;
    } else {
      requesterUserId = null;
    }
    return (
      context.userId !== null &&
      requesterUserId !== null &&
      requesterUserId === context.userId
    );
  }
);

const isUserForDoReview = rule({ cache: "contextual" })(
  async (parent, args, context, info) => {
    let reviewService = context.dataSources.knowHowAPI.reviewService;
    review = await reviewService.findById(args.id);
    if (!review) {
      return false;
    }
    return context.userId !== null && review.reviewer_user_id == context.userId;
  }
);

const isUserForReplyReview = rule({ cache: "contextual" })(
  async (parent, args, context, info) => {
    let reviewService = context.dataSources.knowHowAPI.reviewService;
    review = await reviewService.findById(args.id);
    if (!review) {
      return false;
    }
    return (
      context.userId !== null && review.requester_user_id == context.userId
    );
  }
);

const isUserForDeleteReview = rule({ cache: "contextual" })(
  async (parent, args, context, info) => {
    let reviewService = context.dataSources.knowHowAPI.reviewService;
    review = await reviewService.findById(args.id);
    if (!review) {
      return false;
    }
    return (
      context.userId !== null &&
      (review.requester_user_id == context.userId ||
        review.reviewer_user_id == context.userId)
    );
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
    registerUserByEmailAddressAndPassword: not(isAuthenticated),
    registerUserByPhoneNumberAndPassword: not(isAuthenticated),

    verifyEmailAddress: canVerifyEmailAddress,
    verifyPhoneNumber: canVerifyPhoneNumber,

    loginByEmailAddressAndPassword: not(isAuthenticated),
    loginByPhoneNumberAndPassword: not(isAuthenticated),

    resetPasswordByEmailAddress: not(isAuthenticated),
    resetPasswordByPhoneNumber: not(isAuthenticated),
    updatePassword: and(
      or(canResetPassword, isAuthenticated),
      isUserForUpdatePassword
    ),

    updateUser: or(isAdmin, and(isAuthenticated, isUserForUpdateUser)),
    deleteUser: or(isAdmin, and(isAuthenticated, isUserForDeleteUser)),

    createBadge: or(isAdmin, and(isAuthenticated, isUserForCreateBadge)),
    deleteBadge: or(isAdmin, and(isAuthenticated, isUserForDeleteBadge)),

    inviteReviewByUserId: and(isAuthenticated, isUserForInviteReview),
    inviteReviewByEmailAddress: and(isAuthenticated, isUserForInviteReview),
    inviteReviewByPhoneNumber: and(isAuthenticated, isUserForInviteReview),

    doReview: and(isAuthenticated, isUserForDoReview),
    replyReview: and(isAuthenticated, isUserForReplyReview),
    deleteReview: or(isAdmin, and(isAuthenticated, isUserForDeleteReview)),
  },
});

module.exports = permissions;
