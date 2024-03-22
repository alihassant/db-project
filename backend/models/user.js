const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      url: {
        type: String,
        default:
          "https://t4.ftcdn.net/jpg/00/64/67/27/360_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg",
      },
      publicId: {
        type: String,
        default: "user",
      },
    },
    about: {
      type: String,
    },
    defaultRole: {
      type: String,
      required: true,
      default: "user",
    },
    extraRole: {
      type: String,
      required: true,
      default: "user",
      emun: ["user", "teamLeader", "admin", "superAdmin"],
    },
    entries: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    databases: [
      {
        dbId: {
          type: Schema.Types.ObjectId,
          ref: "Database",
        },
        dbRole: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
