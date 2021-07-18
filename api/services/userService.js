const Service = require("./service");

const TABLE_NAME = "users";
const ENTITY_NAME = "user";

class UserService extends Service {
  constructor(knexDb) {
    super(knexDb, TABLE_NAME, ENTITY_NAME);
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
