const EmailService = require("./emailService");

let emailService;

describe("EmailService", () => {
  const validEmailAddress = "somepassword@quietsimple.com";
  const invalidEmailAddress = "somepassword";

  beforeAll(async () => {
    require("dotenv").config();
  });

  beforeEach(async () => {
    emailService = new EmailService();
  });

  describe("isValidEmailAddress(emailAddress)", () => {
    test("should return true for a valid email address", () => {
      return expect(
        emailService.isValidEmailAddress(validEmailAddress)
      ).toEqual(true);
    });
    test("should return false for an invalid email address", () => {
      return expect(
        emailService.isValidEmailAddress(invalidEmailAddress)
      ).toEqual(false);
    });
  });
});
