class UserPasswordInvalidError extends Error {
  constructor(message) {
    super(message, "USER_PASSWORD_INVALID");
  }
}

module.exports = UserPasswordInvalidError;
