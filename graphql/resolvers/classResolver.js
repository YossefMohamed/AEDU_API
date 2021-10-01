const {
  throwHttpGraphQLError,
} = require("apollo-server-core/dist/runHttpQuery");
const Class = require("../../models/class.js");
const User = require("../../models/user.js");
const getUserId = require("../../util/getUserId.js");

const classResolvers = {
  Query: {
    getClasses: async (_, args, context) => {
      const userId = getUserId(context.req);
      const classes = await Class.find({
        "users.user": userId,
      });

      return classes;
    },
    getInvitations: async (_, args, context) => {
      const userId = getUserId(context.req);
      const user = await User.findById(userId).populate(
        "invitations",
        "-users"
      );
      if (!user) throw new Error("User not found");
      return user.invitations;
    },
  },
  Mutation: {
    acceptInvitations: async (_, args, context) => {
      const userId = getUserId(context.req);
      const user = await User.findById(userId);
      if (!user) throw new Error("User not found");
      user.invitations = user.invitations.filter(
        (item) => !item.equals(args.class)
      );
      if (user.classes.includes(args.class)) throw new Error("Already Added");
      user.classes.push(args.class);
      await user.save();
      return user;
    },
    rejectInvitations: async (_, args, context) => {
      const userId = getUserId(context.req);
      const user = await User.findById(userId);
      if (!user) throw new Error("User not found");

      user.invitations = user.invitations.filter(
        (item) => !item.equals(args.class)
      );
      await user.save();
      return user;
    },
    getOutFromClass: async (_, args, context) => {
      const userId = getUserId(context.req);
      const user = await User.findById(userId);
      if (!user) throw new Error("User not found");
      user.classes = user.classes.filter((item) => !item.equals(args.class));
      await user.save();
      return user;
    },
    createClass: async (_, args, context) => {
      try {
        const userId = getUserId(context.req);
        if (!userId) throw new Error("Please Login");
        const createdClass = await Class.create({
          name: args.name,
          users: [
            {
              user: userId,
              role: "teacher",
            },
          ],
        });

        return createdClass;
      } catch (error) {
        console.log(error.message);
        throw new Error(error.message);
      }
    },
    addUserToClass: async (_, args, context) => {
      const userId = getUserId(context.req);

      const classToAdd = await Class.findById(args.class);
      let teacher = false;
      if (!classToAdd) throw new Error("Class not Found!");
      classToAdd.users.map((u) => {
        if (u.user.equals(args.user)) {
          throw new Error("Already Added");
        }
        if (u.user.equals(userId) && u.role === "teacher") {
          teacher = true;
        }
      });
      console.log(teacher);
      if (!teacher) {
        throw new Error("Unauthorized");
      }
      if (userId === args.user) throw new Error("Already added");
      const user = await User.findById(args.user);
      user.invitations.push(classToAdd.id);

      classToAdd.users.push({
        user: args.user,
        role: args.role || "student",
      });
      const myPromise = new Promise((resolve, reject) => {
        classToAdd.save();
        user.save();
      });
      return classToAdd;
    },
  },
};

module.exports = classResolvers;
