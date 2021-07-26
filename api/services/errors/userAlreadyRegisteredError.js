class UserAlreadyRegisteredError extends Error {
  constructor(message) {
    super(message, "USER_ALREADY_REGISTERED");
  }
}

module.exports = UserAlreadyRegisteredError;
