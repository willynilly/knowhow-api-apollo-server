const EntityNotFoundError = require("../../graphql/errors/entityNotFoundError");

const CACHE_MINUTE = 60;

class Service {
  constructor(knexDb, tableName, entityName) {
    this.knexDb = knexDb;
    this.tableName = tableName;
    this.entityName = entityName;
    this.CACHE_MINUTE = CACHE_MINUTE;
  }

  async findAll() {
    return this.knexDb
      .select("*")
      .from(this.tableName)
      .orderBy("created_date", "asc");
  }

  async findFirstBy(where) {
    return this.knexDb
      .select("*")
      .from(this.tableName)
      .where(where)
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

  async findById(id) {
    return this.findFirstBy({ id: id });
  }

  async create(entity) {
    return this.knexDb(this.tableName)
      .insert(entity)
      .returning("*")
      .then((values) => {
        return values[0];
      });
  }

  async update(entity) {
    let { id, ...entityWithoutId } = entity;
    return this.knexDb(this.tableName)
      .where({ id: id })
      .update(entityWithoutId)
      .returning("*")
      .then((values) => {
        return values[0];
      });
  }

  async delete(id) {
    return this.knexDb(this.tableName).where({ id: id }).del();
  }

  async has(id) {
    return this.knexDb
      .select("id")
      .from(this.tableName)
      .where({ id: id })
      .first()
      .cache(this.CACHE_MINUTE)
      .then((entity) => {
        return !!entity;
      });
  }
}

module.exports = Service;
