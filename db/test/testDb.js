const {
  up,
  down,
} = require("../migrations/20210714095506_migration_create_tables");
const addTables = up;
const dropTables = down;
const knex = require("knex");
const knexCleaner = require("knex-cleaner");
const knexConfig = require("../../knexfile");

class TestDb {
  constructor(devEnvironment) {
    this.devEnvironment = devEnvironment || "development";
    this.devKnexDbConfig = knexConfig[this.devEnvironment];
    this.devDbName = this.devKnexDbConfig.connection.database;
    this.devKnexDbConfig.debug = false;
    this.knex = knex(this.devKnexDbConfig);
  }

  async getKnexDb() {
    return this.knex;
  }

  async resetDb() {
    const knexCleanerOptions = {
      mode: "truncate",
      restartIdentity: true,
      ignoreTables: [],
    };
    return await knexCleaner.clean(this.knex, knexCleanerOptions);
  }

  async destroy() {
    return await this.knex.destroy();
  }
}

module.exports = TestDb;
