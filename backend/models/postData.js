const mongoose = require("mongoose");
const { Schema } = mongoose;

const postDataSchema = new Schema(
  {
    tData: Schema.Types.Mixed,
    modified: {
      type: Boolean,
      default: false,
    },
    images: [Schema.Types.Mixed],
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    dbId: {
      type: Schema.Types.ObjectId,
      ref: "Database",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postDataSchema);
