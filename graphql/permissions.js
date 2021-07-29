const { rule, shield, and, or, not } = require("graphql-shield");
const { badge } = require("./resolvers/queryResolvers");

const createHasUserRoleRule = (roleName) => {
  return rule({ cache: "contextual" })(async (parent, args, context, info) => {
    return context.userId !== null && context.userRoles.includes(roleName);
  });
};

const isAuthenticated = createHasUserRoleRule("authenticated");
const isAdmin = createHasUserRoleRule("admin");

const isAnyone = rule({ cache: "contextual" })(
  async (parent, args, context, info) => {
    return true;
  }
);

const isUserForUpdatePassword = rule({ cache: "strict" })(
  async (parent, args, context, info) => {
    return (
      context.userId !== null &&
      args.update_password_input.user_id == context.userId
    );
  }
);

const isUserForUpdateUser = rule({ cache: "strict" })(
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

const isUserForCreateBadge = rule({ cache: "strict" })(
  async (parent, args, context, info) => {
    return (
      context.userId !== null &&
      args.create_badge_input.author_user_id == context.userId
    );
  }
);

const isUserForDeleteBadge = rule({ cache: "strict" })(
  async (parent, args, context, info) => {
    let badgeService = context.dataSources.knowHowAPI.badgeService;
    badge = await badgeService.findById(args.id);
    if (!badge) {
      return false;
    }
    return context.userId !== null && badge.author_user_id == context.userId;
  }
);

const isUserForInviteReview = rule({ cache: "strict" })(
  async (parent, args, context, info) => {
    if (args.invite_review_by_user_id_input) {
      requesterUserId = args.invite_review_by_user_id_input.requester_user_id;
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

const isUserForDoReview = rule({ cache: "strict" })(
  async (parent, args, context, info) => {
    let reviewService = context.dataSources.knowHowAPI.reviewService;
    const review = await reviewService.findById(args.do_review_input.review_id);
    if (!review) {
      return false;
    }
    return context.userId !== null && review.reviewer_user_id == context.userId;
  }
);

const isUserForReplyReview = rule({ cache: "strict" })(
  async (parent, args, context, info) => {
    let reviewService = context.dataSources.knowHowAPI.reviewService;
    const review = await reviewService.findById(
      args.reply_review_input.review_id
    );
    if (!review) {
      return false;
    }
    return (
      context.userId !== null && review.requester_user_id == context.userId
    );
  }
);

const isUserForDeleteReview = rule({ cache: "strict" })(
  async (parent, args, context, info) => {
    let reviewService = context.dataSources.knowHowAPI.reviewService;
    const review = await reviewService.findById(args.id);
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
  User: {
    id: isAuthenticated,
    email_address: isAdmin,
    phone_number: isAdmin,
    first_name: isAuthenticated,
    last_name: isAuthenticated,
    description: isAuthenticated,
    is_admin: isAdmin,
    is_verified_by_email_address: isAdmin,
    is_verified_by_phone_number: isAdmin,
    is_active: isAdmin,
    created_date: isAuthenticated,
    updated_date: isAuthenticated,
  },
  Badge: {
    id: isAuthenticated,
    achievement: isAuthenticated,
    author: isAuthenticated,
    is_active: isAdmin,
    created_date: isAuthenticated,
    updated_date: isAuthenticated,
  },
  Review: {
    id: isAuthenticated,
    badge: isAuthenticated,
    requester: isAuthenticated,
    reviewer: isAuthenticated,

    review_due_date: isAuthenticated,
    reviewed_date: isAuthenticated,

    is_approved: isAuthenticated,
    approval_is_expired: isAuthenticated,
    approval_expiration_date: isAuthenticated,

    denial_is_expired: isAuthenticated,
    denial_expiration_date: isAuthenticated,

    reviewer_comment: isAuthenticated,
    reviewer_comment_date: isAuthenticated,

    requester_invite: isAuthenticated,
    requester_invite_date: isAuthenticated,

    requester_comment: isAuthenticated,
    requester_comment_date: isAuthenticated,

    is_active: isAdmin,
    created_date: isAuthenticated,
    updated_date: isAuthenticated,
  },
  Mutation: {
    registerUserByEmailAddressAndPassword: isAnyone,
    registerUserByPhoneNumberAndPassword: isAnyone,

    verifyEmailAddress: isAnyone,
    verifyPhoneNumber: isAnyone,

    loginByEmailAddressAndPassword: isAnyone,
    loginByPhoneNumberAndPassword: isAnyone,

    resetPasswordByEmailAddress: isAnyone,
    resetPasswordByPhoneNumber: isAnyone,

    updatePassword: or(isAdmin, and(isAuthenticated, isUserForUpdatePassword)),
    updateUser: or(isAdmin, and(isAuthenticated, isUserForUpdateUser)),
    deleteUser: or(isAdmin, and(isAuthenticated, isUserForDeleteUser)),

    createBadge: or(isAdmin, and(isAuthenticated, isUserForCreateBadge)),
    deleteBadge: or(isAdmin, and(isAuthenticated, isUserForDeleteBadge)),

    inviteReviewByUserId: or(
      isAdmin,
      and(isAuthenticated, isUserForInviteReview)
    ),
    inviteReviewByEmailAddress: or(
      isAdmin,
      and(isAuthenticated, isUserForInviteReview)
    ),
    inviteReviewByPhoneNumber: or(
      isAdmin,
      and(isAuthenticated, isUserForInviteReview)
    ),

    doReview: and(isAuthenticated, isUserForDoReview),
    replyReview: and(isAuthenticated, isUserForReplyReview),
    deleteReview: or(isAdmin, and(isAuthenticated, isUserForDeleteReview)),
  },
});

module.exports = permissions;
