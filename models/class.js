const mongoose = require("mongoose");
const classSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please write the name of the class"],
    },
    image: {
      type: String,
      default: "class_cover.png",
    },
    users: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref : "User",
          required: [true, "Enter the Users"],
        },
        role: {
          type: String,
          enum: ["student", "teacher"],
          default: "student",
        },
      },
    ],
    materials: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Class = mongoose.model("Class", classSchema);

module.exports = Class;
