const PasswordService = require("./passwordService");

let passwordService;

describe("PasswordService", () => {
  const password = "somepassword";
  const otherPassword = "otherpassword";

  beforeAll(async () => {
    require("dotenv").config();
  });

  beforeEach(async () => {
    passwordService = new PasswordService();
  });

  describe("createSaltedPasswordHash(password)", () => {
    test("should return a non-empty string", () => {
      return expect(
        passwordService.createSaltedPasswordHash(password)
      ).resolves.not.toBe("");
    });
    test("should return a string that is not equal to password", () => {
      return expect(
        passwordService.createSaltedPasswordHash(password)
      ).resolves.not.toBe(password);
    });
  });

  describe("isPasswordSameAsSaltedPasswordHash(password, saltedPasswordHash)", () => {
    test("should return false when password decoded from salted hash is not equal to the password that was salted and hashed", () => {
      return expect(
        passwordService
          .createSaltedPasswordHash(password)
          .then((saltedPasswordHash) => {
            return passwordService.isPasswordSameAsSaltedPasswordHash(
              otherPassword,
              saltedPasswordHash
            );
          })
      ).resolves.toBe(false);
    });
    test("should return true when password decoded from salted hash is equal to the password that was salted and hashed", () => {
      return expect(
        passwordService
          .createSaltedPasswordHash(password)
          .then((saltedPasswordHash) => {
            console.log(saltedPasswordHash);
            return passwordService.isPasswordSameAsSaltedPasswordHash(
              password,
              saltedPasswordHash
            );
          })
      ).resolves.toBe(true);
    });
  });
});
