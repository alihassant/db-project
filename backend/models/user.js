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
    resetToken: String,
    resetTokenExpiration: Date,
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
      emun: ["user", "moderator", "admin", "superAdmin"],
    },
    currentPlan: {
      type: String,
      default: "free",
    },
    features: {
      dbs: {
        type: Number,
        default: 3,
      },
      entries: {
        type: Number,
        default: 10,
      },
      members: {
        type: Number,
        default: 5,
      },
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
    payments: {
      subscription: {
        subscriptionId: {
          type: String,
          default: "",
        },
        validTill: Number,
        startedOn: Number,
        productId: String,
        priceId: String,
        status: String,
      },

      paymentMethod: {
        fullName: {
          type: String,
          default: "",
        },
        methodId: {
          type: String,
          default: "",
        },
        addedOn: {
          type: Date,
          default: Date.now,
        },
        hasCard: {
          type: Boolean,
          default: false,
        },
        card: {
          last4: String,
          brand: String,
          country: String,
          exp_month: String,
          exp_year: String,
          funding: String,
        },

        address: {
          postalCode: String,
        },
      },
    },
    subscription: {
      subscriptionId: {
        type: String,
        default: "",
      },
      validTill: Number,
      startedOn: Number,
      productId: String,
      priceId: String,
    },
    customerId: {
      type: String,
      default: "",
    },
    toDos: [
      {
        type: Schema.Types.ObjectId,
        ref: "ToDo",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
