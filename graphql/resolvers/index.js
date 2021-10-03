const userResolvers = require("./userResolvers");
const classResolvers = require("./classResolver");
const postResolvers = require("./postResolver");
const rootResolver = {
  Query: {
    ...userResolvers.Query,
    ...classResolvers.Query,
    ...postResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...classResolvers.Mutation,
    ...postResolvers.Mutation,
  },
};
module.exports = rootResolver;
