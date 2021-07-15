const Service = require("./service");

const TABLE_NAME = "reviews";
const ENTITY_NAME = "review";

class ReviewService extends Service {
  constructor(knexDb) {
    super(knexDb, TABLE_NAME, ENTITY_NAME);
  }

  findByRequesterUserId(requester_user_id) {
    return this.knexDb
      .select("*")
      .from(this.tableName)
      .where({ requester_user_id: requester_user_id })
      .orderBy("created_date", "asc");
  }

  findByReviewerUserId(reviewer_user_id) {
    return this.knexDb
      .select("*")
      .from(this.tableName)
      .where({ reviewer_user_id: requester_user_id })
      .orderBy("created_date", "asc");
  }
}

module.exports = ReviewService;
