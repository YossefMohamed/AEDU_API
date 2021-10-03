const getUserId = require("../../util/getUserId.js");
const Post = require("./../../models/post.js");
const User = require("./../../models/user.js");

module.exports = {
  Query: {
    getPosts: async (parent, args, context, info) => {
      let posts = await Post.find({});
      return posts;
    },
  },
  Mutation: {
    updatePost: async (_, args, context) => {
      const userId = getUserId(context.req);
      let post = await Post.findById(args.post);
      if (!post.author.equals(userId)) throw new Error("Not Authorized !");
      post.content = args.content || post.content;
      post.image = args.image || post.image;
      await post.save();
      return post;
    },

    deletePost: async (_, args, context) => {
      const userId = getUserId(context.req);
      let post = await Post.findById(args.post);
      if (!post.author.equals(userId)) throw new Error("Not Authorized !");
      await Post.findByIdAndDelete(args.post);
      return post;
    },

    addPost: async (_, args, context) => {
      const userId = getUserId(context.req);
      const user = await User.findById(userId);
      if (!user.classes.includes(args.class))
        throw new Error("Not Autorized !");
      const post = await Post.create({
        class: args.class,
        content: args.content,
        author: userId,
      });
      return post;
    },
  },
};
