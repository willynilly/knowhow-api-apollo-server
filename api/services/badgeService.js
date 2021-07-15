const Service = require("./service");

const TABLE_NAME = "badges";
const ENTITY_NAME = "badge";

class BadgeService extends Service {
  constructor(knexDb) {
    super(knexDb, TABLE_NAME, ENTITY_NAME);
  }

  findByAuthorUserId(author_user_id) {
    return this.knexDb
      .select("*")
      .from(this.tableName)
      .where({ author_user_id: author_user_id })
      .orderBy("created_date", "asc");
  }
}

module.exports = BadgeService;
