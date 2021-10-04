const { gql } = require("apollo-server-express");

const messageTypeDefs = gql`
  type Message {
    from: String!
    to: String!
    id: String!
    content: String!
    createdAt: String!
  }
  extend type Query {
    getMessages(to: String!): [Message!]
  }
  extend type Mutation {
    sendMessage(to: String!, content: String!): Message!
    deleteMessage(message: String!): Message!
    updateMessage(message: String!, content: String!): Message
  }
`;
module.exports = messageTypeDefs;
