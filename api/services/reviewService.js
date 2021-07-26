const KnexDbService = require("./knexDbService");
const UserService = require("./userService");
const BadgeService = require("./badgeService");

const TABLE_NAME = "reviews";
const ENTITY_NAME = "review";

class ReviewService extends KnexDbService {
  constructor(knexDb) {
    super(knexDb, TABLE_NAME, ENTITY_NAME);
    this.userService = new UserService(knexDb);
    this.badgeService = new BadgeService(knexDb);
  }

  async findByRequesterUserId(requesterUserId) {
    return this.knexDb
      .select("*")
      .from(this.tableName)
      .where({ requester_user_id: requesterUserId })
      .orderBy("created_date", "asc");
  }

  async findByReviewerUserId(reviewerUserId) {
    return this.knexDb
      .select("*")
      .from(this.tableName)
      .where({ reviewer_user_id: reviewerUserId })
      .orderBy("created_date", "asc");
  }

  async inviteReviewByUserId(
    badgeId,
    requesterUserId,
    requesterInvite,
    reviewerUserId
  ) {
    const hasBadge = await this.badgeService.has(badgeId);
    if (!hasBadge) {
      throw Error("Invalid Badge.");
    }
    const hasRequesterUser = await this.userService.has(requesterUserId);
    if (!hasRequesterUser) {
      throw Error("Invalid Requester User.");
    }
    const hasReviewerUser = await this.userService.has(reviewerUserId);
    if (!hasReviewerUser) {
      throw Error("Invalid Reviewer User.");
    }
    if (!requesterInvite) {
      requesterInvite = "";
    }
    const review = {
      badge_id: badgeId,
      requester_user_id: requesterUserId,
      reviewer_user_id: reviewerUserId,
      requester_invite: requesterInvite,
      requester_invite_date: this.knexDb.fn.now(),
      reviewer_comment: "",
      requester_comment: "",
      is_approved: false,
    };
    return this.create(review);
  }

  async inviteReviewByEmailAddress(
    badgeId,
    requesterUserId,
    requesterInvite,
    reviewerEmailAddress
  ) {
    const hasBadge = await this.badgeService.has(badgeId);
    if (!hasBadge) {
      throw Error("Invalid Badge.");
    }
    const hasRequesterUser = await this.userService.has(requesterUserId);
    if (!hasRequesterUser) {
      throw Error("Invalid Requester User.");
    }
    const reviewerUser = await this.userService.findFirstBy({
      email_address: reviewerEmailAddress,
    });
    if (!reviewerUser) {
      throw Error("Invalid Reviewer User.");
    }
    if (!requesterInvite) {
      requesterInvite = "";
    }
    const review = {
      badge_id: badgeId,
      requester_user_id: requesterUserId,
      reviewer_user_id: reviewerUser.id,
      requester_invite: requesterInvite,
      requester_invite_date: this.knexDb.fn.now(),
      reviewer_comment: "",
      requester_comment: "",
      is_approved: false,
    };
    return this.create(review);
  }

  async inviteReviewByPhoneNumber(
    badgeId,
    requesterUserId,
    requesterInvite,
    reviewerPhoneNumber
  ) {
    const hasBadge = await this.badgeService.has(badgeId);
    if (!hasBadge) {
      throw Error("Invalid Badge.");
    }
    const hasRequesterUser = await this.userService.has(requesterUserId);
    if (!hasRequesterUser) {
      throw Error("Invalid Requester User.");
    }
    const reviewerUser = await this.userService.findFirstBy({
      phone_number: reviewerPhoneNumber,
    });
    if (!reviewerUser) {
      throw Error("Invalid Reviewer User.");
    }
    if (!requesterInvite) {
      requesterInvite = "";
    }
    const review = {
      badge_id: badgeId,
      requester_user_id: requesterUserId,
      reviewer_user_id: reviewerUser.id,
      requester_invite: requesterInvite,
      requester_invite_date: this.knexDb.fn.now(),
      reviewer_comment: "",
      requester_comment: "",
      is_approved: false,
    };
    return this.create(review);
  }

  async doReview(reviewId, isApproved, isDenied, reviewerComment) {
    const review = this.findById(reviewId);
    if (!review) {
      throw Error("Invalid review.");
    }
    review.is_approved = isApproved;
    review.is_denied = isDenied;
    review.reviewer_comment = reviewerComment;
    review.reviewer_comment_date = this.knexDb.fn.now();
    return this.update(review);
  }

  async replyReview(reviewId, requesterComment) {
    const review = this.findById(reviewId);
    if (!review) {
      throw Error("Invalid review.");
    }
    review.requester_comment = requesterComment;
    review.requester_comment_date = this.knexDb.fn.now();
    return this.update(review);
  }
}

module.exports = ReviewService;
