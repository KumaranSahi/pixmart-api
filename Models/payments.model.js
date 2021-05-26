const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    payments: [
      {
        paymentType: {
          type: String,
          enum: ["CREDITCARD", "DEBITCARD"],
        },
        nameOnCard: {
          type: String,
        },
        cardNumber: {
          type: String,
        },
        expirationDate: {
          type: String,
        },
        cvv: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
