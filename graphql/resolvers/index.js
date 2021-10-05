const userResolvers = require("./userResolvers");
const classResolvers = require("./classResolver");
const postResolvers = require("./postResolver");
const messageResolvers = require("./messageResolver");
const commentResolvers = require("./commentResolver");
const rootResolver = {
  Query: {
    ...userResolvers.Query,
    ...classResolvers.Query,
    ...postResolvers.Query,
    ...messageResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...classResolvers.Mutation,
    ...postResolvers.Mutation,
    ...messageResolvers.Mutation,
    ...commentResolvers.Mutation,
  },
};
module.exports = rootResolver;
