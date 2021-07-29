const TestDb = require("../../db/test/testDb");
const BadgeService = require("./badgeService");
const UserService = require("./userService");

let testDb;
let badgeService;
let authorUser;
let achievement;

// we can't mock this service because the db enforces key constraints,
// and we don't want mock the db call for inserting badges.
// so we actually need to add a user to the db
let userService;

beforeAll(async () => {
  testDb = new TestDb();
});

beforeEach(async () => {
  return testDb.resetDb().then(async () => {
    const knexDb = await testDb.getKnexDb();
    badgeService = new BadgeService(knexDb);
    userService = new UserService(knexDb);
  });
});

afterAll(async () => {
  return testDb.destroy();
});

describe("BadgeService", () => {
  describe("createBadgeByAuthorUserIdAndAchievement(authorUserId, achievement)", () => {
    beforeEach(async () => {
      authorUser = await userService._createByEmailAddress(
        "someemailaddress@quietsimple.com"
      );
      achievement = "some achievement";
    });

    describe("when user does NOT exist for author user id", () => {
      test("should return error about invalid author user id", () => {
        let badUserId = authorUser.id + "1";
        return expect(
          badgeService.createBadgeByAuthorUserIdAndAchievement(
            badUserId,
            achievement
          )
        ).rejects.toThrow("Cannot create badge bacause of invalid author id.");
      });
    });

    describe("when user exists for author user id", () => {
      test("should return object with achievement", () => {
        return expect(
          badgeService.createBadgeByAuthorUserIdAndAchievement(
            authorUser.id,
            achievement
          )
        ).resolves.toHaveProperty("achievement", achievement);
      });

      test("should return object with author user id", () => {
        return expect(
          badgeService.createBadgeByAuthorUserIdAndAchievement(
            authorUser.id,
            achievement
          )
        ).resolves.toHaveProperty("author_user_id", authorUser.id);
      });

      test("should return object with id as a string", () => {
        return expect(
          badgeService.createBadgeByAuthorUserIdAndAchievement(
            authorUser.id,
            achievement
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
