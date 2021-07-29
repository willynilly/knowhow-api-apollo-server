const emailValidator = require("email-validator");
const TokenService = require("./tokenService");

class EmailService {
  constructor() {
    this.tokenService = new TokenService();
  }

  async sendEmailToRegisterByEmailAddress(user) {
    if (!this.isValidEmailAddress(user.email_address)) {
      throw Error("Invalid email address: " + user.email_address);
    }
    const jwt = await this.tokenService.createRegisterByEmailAddressJWT(user);
    const url =
      process.env.API_PROTOCOL +
      process.env.API_HOST +
      ":" +
      process.env.API_PORT +
      "/verify/" +
      jwt;
    const message = `
    To verify your email address and complete the registration process, please click the link below:
    
    ${url}    
    `;
    const subject = "KnowHowAPI Registration - Email Verification";
    this.sendEmail(user.email_address, subject, message);
  }

  async sendEmailToResetPassword(user) {
    if (!this.isValidEmailAddress(user.email_address)) {
      throw Error("Invalid email address: " + user.email_address);
    }
    const jwt = await this.tokenService.createResetPasswordByEmailAddressJWT(
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
    this.sendEmail(user.email_address, subject, message);
  }

  async sendEmail(toEmailAddress, subject, message) {
    if (!this.isValidEmailAddress(toEmailAddress)) {
      throw Error("Invalid email address: " + toEmailAddress);
    }
    console.log("Sent Email", { toEmailAddress, subject, message });
  }

  isValidEmailAddress(emailAddress) {
    if (emailAddress === undefined || emailAddress === null) {
      return false;
    }
    return emailValidator.validate(emailAddress);
  }
}

module.exports = EmailService;
