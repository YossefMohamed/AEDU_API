const { gql } = require("apollo-server-express");

const postTypeDefs = gql`
  type Post {
    image: String
    content: String!
    author: String!
    likes: [String]
    id: String!
    class: String!
  }
  extend type Query {
    getPosts(class: String!): [Post]
  }
  extend type Mutation {
    addPost(content: String!, class: String!): Post!
    updatePost(post: String!, content: String, image: String): Post!
    deletePost(post: String!): Post!
  }
`;
module.exports = postTypeDefs;
