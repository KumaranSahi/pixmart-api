const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    addresses: [
      {
        name: {
          type: String,
        },
        number: {
          type: String,
        },
        pin: {
          type: String,
        },
        address: {
          type: String,
        },
        landmark: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

const Address = mongoose.model("Address", addressSchema);
module.exports = Address;
