const { gql } = require("apollo-server-express");

const classTypeDefs = gql`
  type ClassUser {
    user: String!
    role: String!
  }

  type Class {
    name: String!
    image: String!
    users: [ClassUser!]
    id: String
    materials: [String]
  }
  extend type Query {
    getClasses: [Class!]
    getInvitations: [Class]
  }
  extend type Mutation {
    createClass(name: String!): Class!
    addUserToClass(class: String!, user: String!, role: String): Class
  }
`;

module.exports = classTypeDefs;
