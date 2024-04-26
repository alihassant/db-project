const mongoose = require("mongoose");

export const PaymentsSchema = new mongoose.Schema(
  {
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
  { timestamps: true }
);
