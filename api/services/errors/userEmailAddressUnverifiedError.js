class UnverifiedUserEmailAddressError extends Error {
  constructor(message) {
    super(message, "UNVERIFIED_USER_EMAIL_ADDRESS");
  }
}

module.exports = UnverifiedUserEmailAddressError;
