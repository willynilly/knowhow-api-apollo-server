const KnexDbService = require("./knexDbService");
const UserService = require("./userService");

const TABLE_NAME = "badges";
const ENTITY_NAME = "badge";

class BadgeService extends KnexDbService {
  constructor(knexDb) {
    super(knexDb, TABLE_NAME, ENTITY_NAME);
    this.userService = new UserService(knexDb);
  }

  async findByAuthorUserId(authorUserId) {
    return this.knexDb
      .select("*")
      .from(this.tableName)
      .where({ author_user_id: authorUserId })
      .orderBy("created_date", "asc");
  }

  async createBadgeByAuthorUserIdAndAchievement(authorUserId, achievement) {
    const hasUser = await this.userService.has(authorUserId);
    if (!hasUser) {
      throw Error("Invalid Author User.");
    }
    let badge = {
      author_user_id: authorUserId,
      achievement: achievement,
    };
    return this.create(badge);
  }
}

module.exports = BadgeService;
