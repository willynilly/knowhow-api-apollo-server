const PhoneService = require("./phoneService");

let phoneService;

describe("PhoneService", () => {
  const validPhoneNumber = "404-222-2222";
  const invalidPhoneNumber = "some invalid phone number";
  const normalizedPhoneNumber = "+14042222222";
  const countryCode = "+1";

  beforeAll(async () => {
    require("dotenv").config();
  });

  beforeEach(async () => {
    phoneService = new PhoneService();
  });

  describe("isValidPhoneNumber(phoneNumber)", () => {
    test("should return true for a valid phone number", () => {
      expect(phoneService.isValidPhoneNumber(validPhoneNumber)).toEqual(true);
    });
    test("should return false for an invalid phone number", () => {
      expect(phoneService.isValidPhoneNumber(invalidPhoneNumber)).toEqual(
        false
      );
    });
  });

  describe("getNormalizedPhoneNumber(phoneNumber)", () => {
    test("should return a normalized phonenumber beginning with a plus sign and country code for a valid phone number", () => {
      expect(phoneService.getNormalizedPhoneNumber(validPhoneNumber)).toEqual(
        normalizedPhoneNumber
      );
    });
    test("should throw an error for an invalid phone number", async () => {
      expect(() =>
        phoneService.getNormalizedPhoneNumber(invalidPhoneNumber)
      ).toThrow("The following phone number is invalid: " + invalidPhoneNumber);
    });
  });

  describe("getCountryCode(phoneNumber)", () => {
    test("should return a country code for a valid phone number", () => {
      expect(phoneService.getCountryCode(validPhoneNumber)).toEqual(
        countryCode
      );
    });
    test("should throw an error for an invalid phone number", () => {
      expect(() => phoneService.getCountryCode(invalidPhoneNumber)).toThrow(
        "The following phone number is invalid: " + invalidPhoneNumber
      );
    });
  });
});
