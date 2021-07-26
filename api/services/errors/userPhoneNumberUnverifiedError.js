class UserPhoneNumberUnverifiedError extends Error {
  constructor(message) {
    super(message, "USER_PHONE_NUMBER_UNVERIFIED");
  }
}

module.exports = UserPhoneNumberUnverifiedError;
