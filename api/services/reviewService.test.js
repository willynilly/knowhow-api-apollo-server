const TestDb = require("../../db/test/testDb");
const ReviewService = require("./reviewService");
const BadgeService = require("./badgeService");
const UserService = require("./userService");

let testDb;
let reviewService;
let requesterUser;
let requesterInvite;
let reviewerUser;
let badge;

// we can't mock this service because the db enforces key constraints,
// and we don't want mock the db call for inserting reviews.
// so we actually need to add users and a badge to the db
let badgeService;
let userService;

beforeAll(async () => {
  testDb = new TestDb();
});

beforeEach(async () => {
  return testDb.resetDb().then(async () => {
    const knexDb = await testDb.getKnexDb();
    reviewService = new ReviewService(knexDb);
    badgeService = new BadgeService(knexDb);
    userService = new UserService(knexDb);
  });
});

afterAll(async () => {
  return testDb.destroy();
});

describe("ReviewService", () => {
  describe("inviteReviewByUserId(badgeId, requesterUserId, requesterInvite, reviewerUserId)", () => {
    beforeEach(async () => {
      requesterUser = await userService._createByEmailAddress(
        "requester_email_address"
      );
      reviewerUser = await userService._createByEmailAddress(
        "reviewer_email_address"
      );
      const achievement = "some achievement";
      requesterInvite = "some invite message";
      badge = await badgeService.createBadgeByAuthorUserIdAndAchievement(
        requesterUser.id,
        achievement
      );
    });

    describe("when user does NOT exist for requester user id", () => {
      test("should return error about invalid requester user id", () => {
        const badRequesterUserId = requesterUser.id + "" + reviewerUser.id;
        return expect(
          reviewService.inviteReviewByUserId(
            badge.id,
            badRequesterUserId,
            requesterInvite,
            reviewerUser.id
          )
        ).rejects.toThrow(
          "Cannot create review because the requester user id is invalid."
        );
      });
    });

    describe("when ids are valid for badge, requester user, and reviewer user", () => {
      test("should return object with badge id, requester user id, reviewer user id, and requester invite", () => {
        return expect(
          reviewService.inviteReviewByUserId(
            badge.id,
            requesterUser.id,
            requesterInvite,
            reviewerUser.id
          )
        ).resolves.toMatchObject({
          badge_id: badge.id,
          requester_user_id: requesterUser.id,
          requester_invite: requesterInvite,
          reviewer_user_id: reviewerUser.id,
        });
      });

      test("should return object with id as a string", () => {
        return expect(
          reviewService.inviteReviewByUserId(
            badge.id,
            requesterUser.id,
            requesterInvite,
            reviewerUser.id
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
