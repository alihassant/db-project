const mongoose = require("mongoose");
const { Schema } = mongoose;

const toDoSchema = new Schema(
  {
    todo: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      default: "low",
    },
    // dueDate: {
    //   type: Date,
    //   required: true,
    // },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ToDo", toDoSchema);
