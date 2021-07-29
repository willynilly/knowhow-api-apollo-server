const TokenService = require("./tokenService");

let tokenService;

describe("TokenService", () => {
  beforeAll(async () => {
    require("dotenv").config();
  });

  beforeEach(async () => {
    tokenService = new TokenService();
  });

  describe("createUserWithRolesJWT(user, roles, expiresIn)", () => {
    const user = { id: "1" };
    const roles = ["role1", "role2"];
    const expiresIn = "1d";

    test("should return a non-empty string", () => {
      return expect(
        tokenService.createUserWithRolesJWT(user, roles, expiresIn)
      ).resolves.not.toBe("");
    });

    test("should encode the roles of the user", () => {
      return expect(
        tokenService
          .createUserWithRolesJWT(user, roles, expiresIn)
          .then((jwt) => {
            return tokenService.getUserRolesFromJWT(jwt);
          })
      ).resolves.toEqual(roles);
    });

    test("should encode the user id as the Subject claim", () => {
      return expect(
        tokenService
          .createUserWithRolesJWT(user, roles, expiresIn)
          .then((jwt) => {
            return tokenService.getUserIdFromJWT(jwt);
          })
      ).resolves.toBe(user.id);
    });
  });
});
