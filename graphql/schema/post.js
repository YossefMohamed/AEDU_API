const { gql } = require("apollo-server-express");

const postTypeDefs = gql`
  type Post {
    image: String
    content: String!
    author: String!
    likes: [String]
    id: String!
    class: String!
    comments: [Comment]
  }
  extend type Query {
    getPosts(class: String!): [Post]
    getPost(post: String!): Post!
  }
  extend type Mutation {
    addPost(content: String!, class: String!): Post!
    updatePost(post: String!, content: String, image: String): Post!
    deletePost(post: String!): Post!
    likePost(post: String!): Post!
  }
`;
module.exports = postTypeDefs;
