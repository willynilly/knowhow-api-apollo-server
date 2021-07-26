const jwt = require("jsonwebtoken");

class TokenService {
  async createUserWithRolesJWT(user, roles) {
    const url =
      process.env.API_PROTOCOL +
      process.env.API_HOST +
      ":" +
      process.env.API_PORT +
      process.env.API_GRAPHQL_PATH;
    const payload = { url, roles };
    return jwt.sign(payload, process.env.API_JWT_SECRET, {
      algorithm: process.env.API_JWT_ALGORITHM,
      subject: user.id,
      expiresIn: process.env.API_JWT_EXPIRES_IN,
    });
  }

  async getPayloadFromJWT(token) {
    return jwt.verify(token, process.env.API_JWT_SECRET, {
      algorithm: process.env.API_JWT_ALGORITHM,
    });
  }

  async getUserRolesFromJWT(token) {
    const payload = await this.getPayloadFromJWT(token);
    return payload.roles;
  }

  async getUserIdFromJWT(token) {
    const payload = await this.getPayloadFromJWT(token);
    return payload.sub;
  }

  async createUserAuthenticatedJWT(user) {
    let roles = ["authenticated"];
    if (user.is_admin) {
      roles.push("admin");
    }
    return this.createUserWithRolesJWT(user, roles);
  }

  async createUserCanVerifyEmailAddressJWT(user) {
    let roles = ["can_verify_email_address"];
    return this.createUserWithRolesJWT(user, roles);
  }

  async createUserCanVerifyPhoneNumberJWT(user) {
    let roles = ["can_verify_phone_number"];
    return this.createUserWithRolesJWT(user, roles);
  }

  async createUserCanResetPasswordJWT(user) {
    let roles = ["can_reset_password"];
    return this.createUserWithRolesJWT(user, roles);
  }
}

module.exports = TokenService;
