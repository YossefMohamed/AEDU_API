const userResolvers = require("./userResolvers");
const classResolvers = require("./classResolver");
const rootResolver = {
  Query: {
    ...userResolvers.Query,
    ...classResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...classResolvers.Mutation,
  },
};
module.exports = rootResolver;
