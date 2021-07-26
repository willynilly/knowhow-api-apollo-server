const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

class PasswordService {
  async createSaltedPasswordHash(password) {
    return bcrypt.hash(password, SALT_ROUNDS).then((saltedPasswordHash) => {
      return saltedPasswordHash;
    });
  }

  async isPasswordSameAsSaltedPasswordHash(password, saltedPasswordHash) {
    return bcrypt.compare(password, saltedPasswordHash).then((isSame) => {
      return isSame;
    });
  }
}

module.exports = PasswordService;
