const { gql } = require("apollo-server-express");

const commentTypeDefs = gql`
  type Comment {
    content: String!
    author: String!
    post: String!
  }
  extend type Mutation {
    addComment(content: String!, post: String!): Comment!
    updateComment(content: String, comment: String!): Comment!
    deleteComment(content: String, comment: String!): Comment!
  }
`;
module.exports = commentTypeDefs;
