const Service = require("./service");
const UserService = require("./userService");

const TABLE_NAME = "reviews";
const ENTITY_NAME = "review";

class ReviewService extends Service {
  constructor(knexDb) {
    super(knexDb, TABLE_NAME, ENTITY_NAME);
  }

  async findByRequesterUserId(requester_user_id) {
    return this.knexDb
      .select("*")
      .from(this.tableName)
      .where({ requester_user_id: requester_user_id })
      .orderBy("created_date", "asc");
  }

  async findByReviewerUserId(reviewer_user_id) {
    return this.knexDb
      .select("*")
      .from(this.tableName)
      .where({ reviewer_user_id: reviewer_user_id })
      .orderBy("created_date", "asc");
  }

  async inviteReviewByUserId(badgeId, requesterUserId, reviewerUserId) {
    let hasBadge = await badgeService.has(id);
    if (hasBadge) {
      let hasRequesterUser = await UserService.has(requesterUserId);
      if (hasRequesterUser) {
        let hasReviewerUser = await UserService.has(reviewerUserId);
        if (hasReviewerUser) {
          let review = {
            badge_id: badgeId,
            requester_user_id: "1",
            reviewer_user_id: "2",
            requester_invite:
              "Mr. El Din, I finished baking the rye bread. Can you submit a review for my work?",
            reviewer_comment: "Well done.",
            requester_comment: "Thank you.",
            is_approved: true,
          };
          return this.create(review);
        } else {
          throw Error("Invalid Reviewer User.");
        }
      } else {
        throw Error("Invalid Requester User.");
      }
    } else {
      throw Error("Invalid Badge.");
    }
  }
}

module.exports = ReviewService;
