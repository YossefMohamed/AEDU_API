const Message = require("./../../models/message.js");
const getUserId = require("../../util/getUserId.js");

module.exports = {
  Query: {
    getMessages: async (_, args, ctx) => {
      const userId = getUserId(ctx.req);
      const messages = await Message.find({
        $or: [
          {
            $and: [{ reciever: userId }, { author: args.to }],
          },
          {
            $and: [{ reciever: args.to }, { author: userId }],
          },
        ],
      }).sort("createdAt");
      return messages;
    },
  },
  Mutation: {
    sendMessage: async (_, args, ctx) => {
      const userId = getUserId(ctx.req);
      const message = await Message.create({
        from: userId,
        to: args.to,
        content: args.content,
      });

      return message;
    },
    deleteMessage: async (_, args, ctx) => {
      const userId = getUserId(ctx.req);
      const message = await Message.findOne({ id: args.message });
      if (!message) throw new Error("Message Not Found !");
      if (!message.from.equals(userId)) throw new Error("Not Authorized !");
      const deletedMessage = await Message.deleteOne({ id: args.message });

      return message;
    },
    updateMessage: async (_, args, ctx) => {
      const userId = getUserId(ctx.req);
      let message = await Message.findOne({ id: args.message });
      if (!message) throw new Error("Message Not Found !");
      if (!message.from.equals(userId)) throw new Error("Not Authorized !");
      message.content = args.content;
      await message.save();
      return message;
    },
  },
};
