class UserNotFoundError extends Error {
  constructor(message) {
    super(message, "USER_NOT_FOUND");
  }
}

module.exports = UserNotFoundError;
