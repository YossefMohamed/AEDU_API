const { gql } = require("apollo-server-express");

const userTypeDefs = gql`
  type User {
    id: String!
    name: String!
    email: String!
    image: String
    updatedAt: String!
    verified: Boolean
    createdAt: String!
    classes: [String]
    invitations: [String]
  }
  extend type Query {
    getUsers: [User!]!
    login(email: String!, password: String!): AuthPayload!
    getUser: User!
  }
  extend type Mutation {
    deleteUser: User!
    register(
      name: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): AuthPayload!
    updateUser(name: String, email: String, password: String): AuthPayload!
  }
  type AuthPayload {
    token: String!
    user: User!
  }
`;
module.exports = userTypeDefs;
