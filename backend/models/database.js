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
      // {
      //   tH1: {
      //     type: String,
      //   },
      //   tH2: {
      //     type: String,
      //   },
      //   tH3: {
      //     type: String,
      //   },
      //   tH4: {
      //     type: String,
      //   },
      //   tH5: {
      //     type: String,
      //   },
      //   tH6: {
      //     type: String,
      //   },
      // },
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
