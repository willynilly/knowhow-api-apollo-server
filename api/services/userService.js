const Service = require("./service");

const TABLE_NAME = "users";
const ENTITY_NAME = "user";

class UserService extends Service {
  constructor(knexDb) {
    super(knexDb, TABLE_NAME, ENTITY_NAME);
  }
}

module.exports = UserService;
