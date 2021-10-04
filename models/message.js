const mongoose = require("mongoose");
const messageSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Whats The Content Of Your Comment !"],
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: [true, "Which Post ?"],
    },
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Who Is The Author !"],
    },
    createdAt: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
