const { phone } = require("phone");
const TokenService = require("./tokenService");

class PhoneService {
  constructor() {
    this.tokenService = new TokenService();
  }

  async sendSMSToRegisterByPhoneNumber(user) {
    if (!this.isValidPhoneNumber(user.phone_number)) {
      throw Error(
        "The following phone number is invalid: " + user.phone_number
      );
    }
    const jwt = await this.tokenService.createRegisterByPhoneNumberJWT(user);
    const url =
      process.env.API_PROTOCOL +
      process.env.API_HOST +
      ":" +
      process.env.API_PORT +
      "/verify/" +
      jwt;
    const message = `
    To verify your phone number and complete the registration process, please click the link below:
    
    ${url}    
    `;
    const subject = "KnowHowAPI Registration - Phone Number Verification";
    this.sendSMS(user.phone_number, subject, message);
  }

  async sendSMSToResetPassword(user) {
    if (!this.isValidPhoneNumber(user.phone_number)) {
      throw Error(
        "The following phone number is invalid: " + user.phone_number
      );
    }
    const jwt = await this.tokenService.createResetPasswordByPhoneNumberJWT(
      user
    );
    const url =
      "http://" +
      process.env.API_HOST +
      ":" +
      process.env.API_PORT +
      "/resetpassword/" +
      jwt;
    const message = `
    To reset your password, please click the link below:
    
    ${url}    
    `;
    const subject = "KnowHowAPI Reset Password";
    this.sendSMS(user.phone_number, subject, message);
  }

  async sendSMS(toPhoneNumber, subject, message) {
    if (!this.isValidPhoneNumber(toPhoneNumber)) {
      throw Error("The following phone number is invalid: " + toPhoneNumber);
    }
    console.log("Sent SMS", { toPhoneNumber, subject, message });
  }

  isValidPhoneNumber(phoneNumber) {
    if (phoneNumber === undefined || phoneNumber === null) {
      return false;
    }
    const { isValid } = phone(phoneNumber);
    return isValid;
  }

  getNormalizedPhoneNumber(phoneNumber) {
    if (!this.isValidPhoneNumber(phoneNumber)) {
      throw Error("The following phone number is invalid: " + phoneNumber);
    }
    return phone(phoneNumber).phoneNumber;
  }

  getCountryCode(phoneNumber) {
    if (!this.isValidPhoneNumber(phoneNumber)) {
      throw Error("The following phone number is invalid: " + phoneNumber);
    }
    const { countryCode } = phone(phoneNumber);
    return countryCode || null;
  }
}

module.exports = PhoneService;
