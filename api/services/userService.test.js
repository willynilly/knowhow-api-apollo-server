const TestDb = require("../../db/test/testDb");
const UserService = require("./userService");

let testDb;
let userService;
let emailAddress;
let phoneNumber;
let password;
let invalidEmailAddress;

beforeAll(async () => {
  testDb = new TestDb();
});

beforeEach(async () => {
  return testDb.resetDb().then(async () => {
    const knexDb = await testDb.getKnexDb();
    userService = new UserService(knexDb);
  });
});

afterAll(async () => {
  return testDb.destroy();
});

describe("UserService", () => {
  describe("_createByEmailAddressAndPhoneNumberAndPassword(emailAddress, phoneNumber, password)", () => {
    describe("with invalid emailAddress", () => {
      beforeEach(async () => {
        invalidEmailAddress = "invalidEmailAddress";
        phoneNumber = "somePhoneNumber";
        password = "somePassword";
      });

      test("should thow an error", async () => {
        return expect(
          userService._createByEmailAddressAndPhoneNumberAndPassword(
            invalidEmailAddress,
            phoneNumber,
            password
          )
        ).rejects.toThrow(
          Error(
            "The following email address is invalid: " + invalidEmailAddress
          )
        );
      });
    });

    describe("with valid emailAddress", () => {
      beforeEach(async () => {
        emailAddress = "someEmailAddress@quietsimple.com";
        phoneNumber = "4041111111";
        password = "somePassword";
      });

      test("should return object with email address", () => {
        return expect(
          userService._createByEmailAddressAndPhoneNumberAndPassword(
            emailAddress,
            phoneNumber,
            password
          )
        ).resolves.toHaveProperty("email_address", emailAddress);
      });

      test("should return object with phone number", () => {
        return expect(
          userService._createByEmailAddressAndPhoneNumberAndPassword(
            emailAddress,
            phoneNumber,
            password
          )
        ).resolves.toHaveProperty("phone_number", phoneNumber);
      });

      test("should NOT return object with the password", () => {
        return expect(
          userService._createByEmailAddressAndPhoneNumberAndPassword(
            emailAddress,
            phoneNumber,
            password
          )
        ).resolves.not.toHaveProperty("password", password);
      });

      test("should return object with a password as a string", () => {
        return expect(
          userService._createByEmailAddressAndPhoneNumberAndPassword(
            emailAddress,
            phoneNumber,
            password
          )
        ).resolves.toEqual(
          expect.objectContaining({
            password: expect.any(String),
          })
        );
      });

      test("should return object with id as a string", () => {
        return expect(
          userService._createByEmailAddressAndPhoneNumberAndPassword(
            emailAddress,
            phoneNumber,
            password
          )
        ).resolves.toEqual(
          expect.objectContaining({
            id: expect.any(String),
          })
        );
      });
    });
  });
});
