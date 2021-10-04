const express = require("express");
const port = 5000;
const http = require("http");
const path = require("path");
const { gql } = require("apollo-server-express");

const userTypeDefs = require("./graphql/schema/user");
const rootResolver = require("./graphql/resolvers/index.js");
require("dotenv").config({ path: path.join(__dirname, "./.env") });
const { ApolloServer } = require("apollo-server-express");
const { ApolloServerPluginDrainHttpServer } = require("apollo-server-core");
const connectDB = require("./mongodb.js");
const classTypeDefs = require("./graphql/schema/class");
const postTypeDefs = require("./graphql/schema/post");
const messageTypeDefs = require("./graphql/schema/message");
const app = express();
const httpServer = http.createServer(app);
connectDB();
const rootTypeDef = gql`
  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
`;
app.use(express.json());

const server = new ApolloServer({
  typeDefs: [
    rootTypeDef,
    userTypeDefs,
    classTypeDefs,
    postTypeDefs,
    messageTypeDefs,
  ],
  resolvers: rootResolver,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  context: (req) => ({ ...req }),
});
server.start().then(() => {
  server.applyMiddleware({ app });
});

httpServer.listen({ port: 5000 });
console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`);
