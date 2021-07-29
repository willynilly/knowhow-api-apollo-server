const CACHE_MINUTE = 60;

// assumes that the table has an 'id' column
// assumes that the db is postgreSQL db

class KnexDbService {
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
      .orderBy("created_date", "asc")
      .orderBy("id", "asc");
  }

  async findFirstBy(where) {
    return this.knexDb
      .select("*")
      .from(this.tableName)
      .where(where)
      .first()
      .cache(this.CACHE_MINUTE);
  }

  async findById(id) {
    return this.findFirstBy({ id: id });
  }

  async create(entity) {
    const { id, ...entityWithoutId } = entity;
    return this.knexDb(this.tableName)
      .insert(entityWithoutId)
      .returning("*")
      .then((values) => {
        return values[0];
      });
  }

  async update(entity) {
    const { id, ...entityWithoutId } = entity;
    entity.updated_date = this.knexDb.fn.now();
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
    return this.hasWhere({ id: id });
  }

  async hasWhere(where) {
    return this.knexDb
      .select("id")
      .from(this.tableName)
      .where(where)
      .first()
      .then((entity) => {
        return !!entity;
      });
  }
}

module.exports = KnexDbService;
