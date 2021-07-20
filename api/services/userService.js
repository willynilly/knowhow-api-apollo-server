const Service = require("./service");
const jwt = require("jsonwebtoken");

const TABLE_NAME = "users";
const ENTITY_NAME = "user";

class UserService extends Service {
  constructor(knexDb) {
    super(knexDb, TABLE_NAME, ENTITY_NAME);
  }

  async loginByEmailAddress(emailAddress, password) {
    const user = await this.findFirstBy({
      email_address: emailAddress,
      password: password,
    });
    return { jwt: this.createJWTForUser(user) };
  }

  async loginByPhoneNumber(phoneNumber, password) {
    const user = await this.findFirstBy({
      phone_number: phoneNumber,
      password: password,
    });
    return { jwt: this.createJWTForUser(user) };
  }

  async createJWTForUser(user) {
    let url =
      process.env.API_PROTOCOL +
      process.env.API_HOST +
      ":" +
      process.env.API_PORT +
      process.env.API_GRAPHQL_PATH;
    let roles = ["authenticated"];
    if (user.is_admin) {
      roles.push("admin");
    }
    let payload = { url, roles };
    return jwt.sign(payload, process.env.API_JWT_SECRET, {
      algorithm: process.env.API_JWT_ALGORITHM,
      subject: user.id,
      expiresIn: process.env.API_JWT_EXPIRES_IN,
    });
  }

  async createByEmailAddress(emailAddress) {
    let user = {
      email_address: emailAddress,
      phone_number: "",
      password: "",
      first_name: "",
      last_name: "",
      description: "",
      is_admin: false,
      is_verified: false,
      is_active: true,
    };

    return this.create(user);
  }

  async createByPhoneNumber(phoneNumber) {
    let user = {
      email_address: "",
      phone_number: phoneNumber,
      password: "",
      first_name: "",
      last_name: "",
      description: "",
      is_admin: false,
      is_verified: false,
      is_active: true,
    };

    return this.create(user);
  }
}

module.exports = UserService;
