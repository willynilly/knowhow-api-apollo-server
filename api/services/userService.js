const UserAlreadyRegisteredError = require("./errors/userAlreadyRegisteredError");
const UserNotFoundError = require("./errors/userNotFoundError");
const UserInactiveError = require("./errors/userInactiveError");
const UserPasswordInvalidError = require("./errors/userPasswordInvalidError");
const UserEmailAddressUnverifiedError = require("./errors/userEmailAddressUnverifiedError");
const UserPhoneNumberUnverifiedError = require("./errors/userEmailAddressUnverifiedError");

const KnexDbService = require("./knexDbService");
const TokenService = require("./tokenService");
const PasswordService = require("./passwordService");

const TABLE_NAME = "users";
const ENTITY_NAME = "user";

class UserService extends KnexDbService {
  constructor(knexDb) {
    super(knexDb, TABLE_NAME, ENTITY_NAME);
    this.tokenService = new TokenService();
    this.passwordService = new PasswordService();
  }

  async registerByEmailAddressAndPassword(emailAddress, password) {
    const oldUser = await this.findFirstBy({
      email_address: emailAddress,
    });
    if (oldUser) {
      throw new UserAlreadyRegisteredError(
        "A user is already registered for the email address: " +
          emailAddress +
          "."
      );
    }
    const user = await this._createByEmailAddressAndPassword(
      emailAddress,
      password
    );
    return { jwt: this.tokenService.createUserCanVerifyEmailAddressJWT(user) };
  }

  async registerByPhoneNumberAndPassword(phoneNumber, password) {
    const oldUser = await this.findFirstBy({
      email_address: emailAddress,
    });
    if (oldUser) {
      throw new UserAlreadyRegisteredError(
        "A user is already registered for the email address: " +
          emailAddress +
          "."
      );
    }
    const user = await this._createByPhoneNumberAndPassword(
      phoneNumber,
      password
    );
    return { jwt: this.tokenService.createUserCanVerifyEmailAddressJWT(user) };
  }

  async verifyEmailAddress(userId) {
    const user = await this.findById(userId);
    if (!user) {
      throw new UserNotFoundError(
        "The user with the following id cannot be found: " + userId + "."
      );
    }
    if (!user.is_active) {
      throw new UserInactiveError(
        "The user with the following id is inactive: " + userId + "."
      );
    }
    user.is_verified_by_email_address = true;
    const updatedUser = await this.update(user);
    if (updatedUser) {
      // send the user back a login token
      return { jwt: this.tokenService.createUserAuthenticatedJWT(user) };
    } else {
      throw Error("Could not update email verification.");
    }
  }

  async verifyPhoneNumber(userId) {
    const user = await this.findById(userId);
    if (!user) {
      throw new UserNotFoundError(
        "The user with the following id cannot be found: " + userId + "."
      );
    }
    if (!user.is_active) {
      throw new UserInactiveError(
        "The user with the following id is inactive: " + userId + "."
      );
    }
    user.is_verified_by_phone_number = true;
    const updatedUser = await this.update(user);
    if (updatedUser) {
      // send the user back a login token
      return { jwt: this.tokenService.createUserAuthenticatedJWT(user) };
    } else {
      throw Error("Could not update phone number verification.");
    }
  }

  async loginByEmailAddressAndPassword(emailAddress, password) {
    const user = await this.findFirstBy({
      email_address: emailAddress,
    });
    if (!user) {
      throw new UserNotFoundError(
        "The user with the following email address cannot be found: " +
          emailAddress +
          "."
      );
    }
    if (!user.is_active) {
      throw new UserInactiveError(
        "The user with the following email address is inactive: " +
          emailAddress +
          "."
      );
    }
    if (!user.is_verified_by_email_address) {
      throw new UserEmailAddressUnverifiedError(
        "The following email address has not yet been verified: " +
          emailAddress +
          "."
      );
    }
    const isSamePassword =
      await this.passwordService.isPasswordSameAsSaltedPasswordHash(
        password,
        user.password
      );
    if (!isSamePassword) {
      throw new UserPasswordInvalidError(
        "The password is invalid for the user."
      );
    }
    return { jwt: this.tokenService.createUserAuthenticatedJWT(user) };
  }

  async loginByPhoneNumberAndPassword(phoneNumber, password) {
    const user = await this.findFirstBy({
      phone_number: phoneNumber,
    });
    if (!user) {
      throw new UserNotFoundError(
        "The user with the following phone number cannot be found: " +
          phoneNumber +
          "."
      );
    }
    if (!user.is_active) {
      throw new UserInactiveError(
        "The user with the following phone number is inactive: " +
          phoneNumber +
          "."
      );
    }
    if (!user.is_verified_by_phone_number) {
      throw new UserPhoneNumberUnverifiedError(
        "The phone number for the user has not yet been verified."
      );
    }
    const isSamePassword =
      await this.passwordService.isPasswordSameAsSaltedPasswordHash(
        password,
        user.password
      );
    if (!isSamePassword) {
      throw new UserPasswordInvalidError(
        "The password is invalid for the user."
      );
    }
    return { jwt: this.tokenService.createUserAuthenticatedJWT(user) };
  }

  async resetPasswordByEmailAddress(emailAddress) {
    const user = await this.findFirstBy({
      email_address: emailAddress,
    });
    if (!user) {
      throw new UserNotFoundError(
        "The user with the following email address cannot be found: " +
          emailAddress +
          "."
      );
    }
    if (!user.is_active) {
      throw new UserInactiveError(
        "The user with the following email address is inactive: " +
          emailAddress +
          "."
      );
    }
    return { jwt: this.tokenService.createUserCanResetPasswordJWT(user) };
  }

  async resetPasswordByPhoneNumber(phoneNumber) {
    const user = await this.findFirstBy({
      phone_number: phoneNumber,
    });
    if (!user) {
      throw new UserNotFoundError(
        "The user with the following phone number cannot be found: " +
          phoneNumber +
          "."
      );
    }
    if (!user.is_active) {
      throw new UserInactiveError(
        "The user with the following phone number is inactive: " +
          phoneNumber +
          "."
      );
    }
    return { jwt: this.tokenService.createUserCanResetPasswordJWT(user) };
  }

  async updatePassword(userId, password) {
    const user = await this.findById(userId);
    if (!user) {
      throw new UserNotFoundError(
        "The user with the following id cannot be found: " + userId + "."
      );
    }
    if (!user.is_active) {
      throw new UserInactiveError(
        "The user with the following id is inactive: " + userId + "."
      );
    }
    const saltedPasswordHash =
      await this.passwordService.createSaltedPasswordHash(password);
    user.password = saltedPasswordHash;
    const updatedUser = await this.update(user);
    if (updatedUser) {
      return true;
    } else {
      throw Error("Could not update user password.");
    }
  }

  async _createByEmailAddress(emailAddress) {
    const phoneNumber = "";
    const password = "";
    return this._createByEmailAddressAndPhoneNumberAndPassword(
      emailAddress,
      phoneNumber,
      password
    );
  }

  async _createByPhoneNumber(phoneNumber) {
    const emailAddress = "";
    const password = "";
    return this._createByEmailAddressAndPhoneNumberAndPassword(
      emailAddress,
      phoneNumber,
      password
    );
  }

  async _createByEmailAddressAndPassword(emailAddress, password) {
    const phoneNumber = "";
    return this._createByEmailAddressAndPhoneNumberAndPassword(
      emailAddress,
      phoneNumber,
      password
    );
  }

  async _createByPhoneNumberAndPassword(phoneNumber, password) {
    const emailAddress = "";
    return this._createByEmailAddressAndPhoneNumberAndPassword(
      emailAddress,
      phoneNumber,
      password
    );
  }

  async _createByEmailAddressAndPhoneNumberAndPassword(
    emailAddress,
    phoneNumber,
    password
  ) {
    const saltedPasswordHash =
      await this.passwordService.createSaltedPasswordHash(password);

    const user = {
      email_address: emailAddress,
      phone_number: phoneNumber,
      password: saltedPasswordHash,
      first_name: "",
      last_name: "",
      description: "",
      is_admin: false,
      is_verified_by_email_address: false,
      is_verified_by_phone_number: false,
      is_active: true,
    };

    return this.create(user);
  }
}

module.exports = UserService;
