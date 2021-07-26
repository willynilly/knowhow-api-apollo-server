class UserInactiveError extends Error {
  constructor(message) {
    super(message, "USER_INACTIVE");
  }
}

module.exports = UserInactiveError;
