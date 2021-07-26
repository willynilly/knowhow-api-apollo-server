const { gql } = require("apollo-server-express");

// bigInteger is used for id columns in the knowhowapi postgre database
// and this is returned as strings.  thus, I define the id columns below
// as strings

const typeDefs = gql`
  scalar Date

  type Query {
    users: [User]!
    user(id: String!): User!
    badges: [Badge]!
    badge(id: String!): Badge!
    badgesByAuthor(author_user_id: String!): [Badge]!
    reviews: [Review]!
    review(id: String!): Review!
    reviewsByRequester(requester_user_id: String!): [Review]!
    reviewsByReviewer(reviewer_user_id: String!): [Review]!
  }

  type Mutation {
    registerUserByEmailAddressAndPassword(
      email_address: String!
      password: String!
    ): JWT!
    registerUserByPhoneNumberAndPassword(
      phone_number: String!
      password: String!
    ): JWT!

    verifyEmailAddress(jwt: String!): JWT!
    verifyPhoneNumber(jwt: String!): JWT!

    loginByEmailAddressAndPassword(
      email_address: String!
      password: String!
    ): JWT!
    loginByPhoneNumberAndPassword(
      phone_number: String!
      password: String!
    ): JWT!

    resetPasswordByEmailAddress(email_address: String!): JWT!
    resetPasswordByPhoneNumber(phone_number: String!): JWT!
    updatePassword(update_password_input: UpdatePasswordInput): Boolean!

    updateUser(update_user_input: UpdateUserInput): User!
    deleteUser(id: String): Boolean!

    createBadge(create_badge_input: CreateBadgeInput): Badge!
    deleteBadge(id: String): Boolean!

    inviteReviewByUserId(
      invite_review_by_user_id_input: InviteReviewByUserIdInput
    ): Review!
    inviteReviewByEmailAddress(
      invite_review_by_email_address_input: InviteReviewByEmailAddressInput
    ): Review!
    inviteReviewByPhoneNumber(
      invite_review_by_phone_number_input: InviteReviewByPhoneNumberInput
    ): Review!
    doReview(do_review_input: DoReviewInput): Review!
    replyReview(reply_review_input: ReplyReviewInput): Review!
    deleteReview(id: String): Boolean!
  }

  type User {
    id: String
    email_address: String
    phone_number: String

    first_name: String
    last_name: String
    description: String

    is_admin: Boolean
    is_verified_by_email_address: Boolean
    is_verified_by_phone_number: Boolean
    is_active: Boolean

    created_date: Date
    updated_date: Date
  }

  type JWT {
    jwt: String!
  }

  input UpdateUserInput {
    id: String
    first_name: String
    last_name: String
    description: String
  }

  input UpdatePasswordInput {
    user_id: String
    password: String
  }

  type Badge {
    id: String
    achievement: String
    author: User

    is_active: Boolean

    created_date: Date
    updated_date: Date
  }

  input CreateBadgeInput {
    author_user_id: String!
    achievement: String!
  }

  type Review {
    id: String
    badge: Badge
    requester: User
    reviewer: User

    is_not_reviewed: Boolean
    review_due_date: Date
    reviewed_date: Date

    is_approved: Boolean
    approval_is_expired: Boolean
    approval_expiration_date: Date

    is_denied: Boolean
    denial_is_expired: Boolean
    denial_expiration_date: Date

    reviewer_comment: String
    reviewer_comment_date: Date

    requester_invite: String
    requester_invite_date: Date

    requester_comment: String
    requester_comment_date: Date

    is_active: Boolean

    created_date: Date
    updated_date: Date
  }

  input InviteReviewByUserIdInput {
    badge_id: String!
    requester_user_id: String!
    requester_invite: String!
    reviewer_user_id: String!
  }

  input InviteReviewByEmailAddressInput {
    badge_id: String!
    requester_user_id: String!
    requester_invite: String!
    reviewer_email_address: String!
  }

  input InviteReviewByPhoneNumberInput {
    badge_id: String!
    requester_user_id: String!
    requester_invite: String!
    reviewer_phone_number: String!
  }

  input DoReviewInput {
    review_id: String!
    is_approved: Boolean!
    is_denied: Boolean!
    reviewer_comment: String
  }

  input ReplyReviewInput {
    review_id: String!
    requester_comment: String!
  }
`;

module.exports = typeDefs;
