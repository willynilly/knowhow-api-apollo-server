class EntityNotFoundError extends Error {
  constructor(message) {
    super(message, "ENTITY_NOT_FOUND");
  }
}

module.exports = EntityNotFoundError;
