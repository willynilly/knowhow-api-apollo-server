const jwt = require("jsonwebtoken");

const ROLE_AUTHENTICATED = "authenticated";
const ROLE_CAN_VERIFY_EMAIL_ADDRESS = "can_verify_email_address";
const ROLE_CAN_VERIFY_PHONE_NUMBER = "can_verify_phone_number";
const ROLE_ADMIN = "admin";

class TokenService {
  async createUserWithRolesJWT(user, roles, expiresIn) {
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
      expiresIn: expiresIn,
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

  async createRegisterByEmailAddressJWT(user) {
    let roles = await this._getDefaultLoginRoles(user);
    roles.push(ROLE_CAN_VERIFY_EMAIL_ADDRESS);
    const expiresIn = process.env.API_REGISTER_BY_EMAIL_ADDRESS_JWT_EXPIRES_IN;
    return this.createUserWithRolesJWT(user, roles, expiresIn);
  }

  async createRegisterByPhoneNumberJWT(user) {
    let roles = await this._getDefaultLoginRoles(user);
    roles.push(ROLE_CAN_VERIFY_PHONE_NUMBER);
    const expiresIn = process.env.API_REGISTER_BY_PHONE_NUMBER_JWT_EXPIRES_IN;
    return this.createUserWithRolesJWT(user, roles, expiresIn);
  }

  async createLoginByEmailAddressJWT(user) {
    const roles = await this._getDefaultLoginRoles(user);
    const expiresIn = process.env.API_LOGIN_BY_EMAIL_ADDRESS_JWT_EXPIRES_IN;
    return this.createUserWithRolesJWT(user, roles, expiresIn);
  }

  async createLoginByPhoneNumberJWT(user) {
    const roles = await this._getDefaultLoginRoles(user);
    const expiresIn = process.env.API_LOGIN_BY_PHONE_NUMBER_JWT_EXPIRES_IN;
    return this.createUserWithRolesJWT(user, roles, expiresIn);
  }

  async createResetPasswordByEmailAddressJWT(user) {
    const roles = await this._getDefaultLoginRoles(user);
    roles.push(ROLE_CAN_VERIFY_EMAIL_ADDRESS);
    const expiresIn =
      process.env.API_RESET_PASSWORD_BY_EMAIL_ADDRESS_JWT_EXPIRES_IN;
    return this.createUserWithRolesJWT(user, roles, expiresIn);
  }

  async createResetPasswordByPhoneNumberJWT(user) {
    let roles = await this._getDefaultLoginRoles(user);
    roles.push(ROLE_CAN_VERIFY_PHONE_NUMBER);
    const expiresIn =
      process.env.API_RESET_PASSWORD_BY_PHONE_NUMBER_JWT_EXPIRES_IN;
    return this.createUserWithRolesJWT(user, roles, expiresIn);
  }

  async _getDefaultLoginRoles(user) {
    let roles = [ROLE_AUTHENTICATED];
    if (user.is_admin) {
      roles.push(ROLE_ADMIN);
    }
    return roles;
  }
}

module.exports = TokenService;
