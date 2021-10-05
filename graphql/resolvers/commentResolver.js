const Post = require("./../../models/post.js");
const Comment = require("./../../models/comment.js");
const getUserId = require("../../util/getUserId.js");

module.exports = {
  Mutation: {
    addComment: async (_, args, ctx) => {
      const userId = getUserId(ctx.req);
      const post = await Post.findById(args.post);
      if (!post) throw new Error("Post not found !");
      const comment = await Comment.create({
        content: args.content,
        post: args.post,
        author: userId,
      });
      return comment;
    },
    updateComment: async (_, args, ctx) => {
      const userId = getUserId(ctx.req);
      const comment = await Comment.findOne({ id: args.comment });
      if (comment.author !== userId) throw new Error("Not Authorized!");
      comment.content = args.content;
      await comment;
      return comment;
    },
    deleteComment: async (_, args, ctx) => {
      const userId = getUserId(ctx.req);
      const comment = await Comment.findOneAndDelete({
        id: args.comment,
        author: userId,
      });
      return comment;
    },
  },
};
