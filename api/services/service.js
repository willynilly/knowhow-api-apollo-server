const EntityNotFoundError = require("../../graphql/errors/entityNotFoundError");

const CACHE_MINUTE = 60;

class Service {
  constructor(knexDb, tableName, entityName) {
    this.knexDb = knexDb;
    this.tableName = tableName;
    this.entityName = entityName;
    this.CACHE_MINUTE = CACHE_MINUTE;
  }

  findAll() {
    return this.knexDb
      .select("*")
      .from(this.tableName)
      .orderBy("created_date", "asc");
  }

  findById(id) {
    return this.knexDb
      .select("*")
      .from(this.tableName)
      .where({ id: id })
      .first()
      .cache(this.CACHE_MINUTE)
      .then((entity) => {
        if (!entity) {
          throw new EntityNotFoundError(
            "The " + this.entityName + " could not be found."
          );
        }
        return entity;
      });
  }
}

module.exports = Service;
