const bcrypt = require("bcryptjs");
const generateToken = require("./../../util/generateToken");
const User = require("./../../models/user.js");
const getUserId = require("./../../util/getUserId");
module.exports = {
  Query: {
    getUsers: async (parent, args, context, info) => {
      const users = await User.find();
      return users;
    },
    getUser: async (_, args) => {
      const user = await User.findOne({ name: args.user });
      if (!user) throw new Error("Not Found");
      return user;
    },
    login: async (parant, args, context) => {
      try {
        const { email, password } = args;
        const user = await User.findOne({
          email,
        }).select("+password");
        if (!user) throw new Error("Email or Password Are Incorrect");
        const checkPassword = await user.correctPassword(
          password,
          user.password
        );
        if (!checkPassword || !user)
          throw new Error("Email or Password Are Incorrect");
        const token = generateToken(user.id);
        return { user, token };
      } catch (e) {
        throw new Error(e.message);
      }
    },
  },
  Mutation: {
    register: async (_, args) => {
      try {
        if (args.password !== args.confirmPassword)
          throw new Error("Password Doesn't match!");
        const user = await User.create({
          name: args.name,
          email: args.email,
          password: args.password,
        });

        const token = generateToken(user.id);
        return { user, token };
      } catch (e) {
        throw new Error(e.message);
      }
    },
    updateUser: async (parent, args, context) => {
      const userId = getUserId(context.req);
      if (!userId) throw new Error("Please Login!");
      const user = await User.findById(userId);
      user.email = args.email || user.email;
      user.name = args.name || user.name;

      user.bio = args.bio || user.bio;
      args.password ? (user.password = args.password) : "";
      await user.save();
      return {
        user,
        token: context.req.headers.authorization.split(" ")[1],
      };
    },
    deleteUser: async (parent, args, context, info) => {
      const userId = getUserId(context.req);
      if (!userId) throw new Error("Please Login!");
      const user = await User.findById(userId);
      console.log(userId);
      const deletedUser = await User.findByIdAndDelete(userId);

      return deletedUser;
    },
  },
};
