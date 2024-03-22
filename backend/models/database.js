const mongoose = require("mongoose");
const { Schema } = mongoose;

const userRoles = ["viewOnly", "teamLeader", "admin", "owner"];

const databaseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    media: {
      type: Boolean,
      default: false,
    },
    totalHeaders: {
      type: Number,
      default: 0,
    },
    tHeaders: [
      Schema.Types.Mixed,
    ],
    users: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        role: {
          type: String,
          enum: userRoles,
          default: "viewOnly",
        },
        name: {
          type: String,
        },
        email: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Database", databaseSchema);
