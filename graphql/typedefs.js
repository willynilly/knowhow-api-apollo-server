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

  type User {
    id: String
    email_address: String
    phone_number: String
    password: String

    first_name: String
    last_name: String
    description: String

    is_admin: Boolean
    is_verified: Boolean

    created_date: Date
    updated_date: Date
    is_active: Boolean
  }

  type Badge {
    id: String
    achievement: String
    author: User

    created_date: Date
    updated_date: Date
    is_active: Boolean
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

    created_date: Date
    updated_date: Date
    is_active: Boolean
  }
`;

module.exports = typeDefs;
