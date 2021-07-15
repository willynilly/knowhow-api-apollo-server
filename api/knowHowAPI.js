const { SQLDataSource } = require("datasource-sql");
const UserService = require("./services/userService");
const BadgeService = require("./services/badgeService");
const ReviewService = require("./services/reviewService");

class KnowHowAPI extends SQLDataSource {
  constructor(knexConfig) {
    super(knexConfig);
    this.userService = new UserService(this.knex);
    this.badgeService = new BadgeService(this.knex);
    this.reviewService = new ReviewService(this.knex);
  }
}

module.exports = KnowHowAPI;
