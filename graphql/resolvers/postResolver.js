const Comment = require("../../models/comment.js");
const getUserId = require("../../util/getUserId.js");
const Post = require("./../../models/post.js");
const User = require("./../../models/user.js");

module.exports = {
  Query: {
    getPosts: async (parent, args, context, info) => {
      let posts = await Post.find({}).populate("comments");
      return posts;
    },
    getPost: async (parent, args, context, info) => {
      let post = await Post.findOne({
        id: args.post,
      }).populate("comments");
      return post;
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
      const comments = await Comment.remove({
        post: post.id,
      });
      if (!post.author.equals(userId)) throw new Error("Not Authorized !");
      await Post.findByIdAndDelete(args.post);
      return post;
    },
    likePost: async (_, args, context) => {
      const userId = getUserId(context.req);
      let post = await Post.findById(args.post);
      if (!post) throw new Error("Not Found!");
      post.likes.includes(userId) && post.likes.push(userId);
      post.likes = post.likes.filter((like) => like !== userId);
      await post.save();
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
