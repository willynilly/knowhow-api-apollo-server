const KnexDbService = require("./knexDbService");
const UserService = require("./userService");
const BadgeService = require("./badgeService");

const TABLE_NAME = "reviews";
const ENTITY_NAME = "review";

const CANNOT_CREATE_REVIEW_INVALID_BADGE_ID =
  "Cannot create review because the badge id is invalid.";
const CANNOT_CREATE_REVIEW_INVALID_REQUESTER_USER_ID =
  "Cannot create review because the requester user id is invalid.";
const CANNOT_CREATE_REVIEW_INVALID_REVIEWER_USER_ID =
  "Cannot create review because the reviewer user id is invalid.";
const CANNOT_DO_REVIEW_INVALID_REVIEW_ID =
  "Cannot do review because the review id is invalid.";
const CANNOT_REPLY_REVIEW_INVALID_REVIEW_ID =
  "Cannot reply to review because the review id is invalid.";

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
    if (requesterUserId == reviewerUserId) {
      throw Error(CANNOT_CREATE_REVIEW_INVALID_REVIEWER_USER_ID);
    }
    const hasBadge = await this.badgeService.has(badgeId);
    if (!hasBadge) {
      throw Error(CANNOT_CREATE_REVIEW_INVALID_BADGE_ID);
    }
    const hasRequesterUser = await this.userService.has(requesterUserId);
    if (!hasRequesterUser) {
      throw Error(CANNOT_CREATE_REVIEW_INVALID_REQUESTER_USER_ID);
    }
    const hasReviewerUser = await this.userService.has(reviewerUserId);
    if (!hasReviewerUser) {
      throw Error(CANNOT_CREATE_REVIEW_INVALID_REVIEWER_USER_ID);
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
      throw Error(CANNOT_CREATE_REVIEW_INVALID_BADGE_ID);
    }
    const hasRequesterUser = await this.userService.has(requesterUserId);
    if (!hasRequesterUser) {
      throw Error(CANNOT_CREATE_REVIEW_INVALID_REQUESTER_USER_ID);
    }
    const reviewerUser = await this.userService.findFirstBy({
      email_address: reviewerEmailAddress,
    });
    if (!reviewerUser || requesterUserId == reviewerUser.id) {
      throw Error(CANNOT_CREATE_REVIEW_INVALID_REVIEWER_USER_ID);
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
      throw Error(CANNOT_CREATE_REVIEW_INVALID_BADGE_ID);
    }
    const hasRequesterUser = await this.userService.has(requesterUserId);
    if (!hasRequesterUser) {
      throw Error(CANNOT_CREATE_REVIEW_INVALID_REQUESTER_USER_ID);
    }
    const reviewerUser = await this.userService.findFirstBy({
      phone_number: reviewerPhoneNumber,
    });
    if (!reviewerUser || requesterUserId == reviewerUser.id) {
      throw Error(CANNOT_CREATE_REVIEW_INVALID_REVIEWER_USER_ID);
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

  async doReview(reviewId, isApproved, reviewerComment) {
    const review = await this.findById(reviewId);
    if (!review) {
      throw Error(CANNOT_DO_REVIEW_INVALID_REVIEW_ID);
    }
    review.is_approved = isApproved;
    review.reviewed_date = this.knexDb.fn.now();

    review.reviewer_comment = reviewerComment;
    review.reviewer_comment_date = this.knexDb.fn.now();
    await this.update(review);
    return true;
  }

  async replyReview(reviewId, requesterComment) {
    const review = await this.findById(reviewId);
    if (!review) {
      throw Error(CANNOT_REPLY_REVIEW_INVALID_REVIEW_ID);
    }
    review.requester_comment = requesterComment;
    review.requester_comment_date = this.knexDb.fn.now();
    await this.update(review);
    return true;
  }
}

module.exports = ReviewService;
