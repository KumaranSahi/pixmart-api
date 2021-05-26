const Address = require("../Models/addresses.model");
const User = require("../Models/users.model");
const Payment = require("../Models/payments.model");
const Order = require("../Models/orders.model");
const Cart = require("../Models/carts.model");

module.exports.getAllAddresses = async (req, res) => {
  const user = req.user;
  try {
    const data = await Address.findById(user.address);
    if (data) {
      return res.status(201).json({
        ok: true,
        data: [...data.addresses],
        message: "Have some stored addresses",
      });
    } else {
      return res.status(201).json({
        ok: true,
        data: [],
        message: "User doesn't have any stored addresses",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      message: "Internal server error",
    });
  }
};

module.exports.addAddress = async (req, res) => {
  const user = req.user;
  const { name, number, pin, address, landmark } = req.body;
  try {
    const userAddress = await Address.findById(user.address);
    if (userAddress) {
      await userAddress.addresses.push({
        name: name,
        number: number,
        pin: pin,
        address: address,
        landmark: landmark,
      });
      await userAddress.save();
    } else {
      const newAddress = await Address.create({
        by: user._id,
      });
      await user.update({
        address: newAddress._id,
      });
      await newAddress.addresses.push({
        name: name,
        number: number,
        pin: pin,
        address: address,
        landmark: landmark,
      });
      newAddress.save();
    }
    const newUser = await User.findById(id);
    const data = await Address.findById(newUser.address);
    return res.status(201).json({
      ok: true,
      data: [...data.addresses],
      message: "Address added to user",
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      message: "Internal server error",
    });
  }
};

module.exports.deleteAddress = async (req, res) => {
  const { addressId } = req.params;
  const user = req.user;
  try {
    const address = await Address.findById(user.address);
    await address.updateOne({
      addresses: address.addresses.filter(({ _id }) => _id != addressId),
    });
    const newAddress = await Address.findById(user.address);
    return res.status(201).json({
      ok: true,
      data: [...newAddress.addresses],
      message: "Address deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      message: "Internal server error",
    });
  }
};

module.exports.addPaymentDetail = async (req, res) => {
  const user = req.user;
  const { paymentType, nameOnCard, cardNumber, expirationDate, cvv } = req.body;
  try {
    const userPayment = await Payment.findById(user.payment);
    if (userPayment) {
      await userPayment.payments.push({
        paymentType: paymentType,
        nameOnCard: nameOnCard,
        cardNumber: cardNumber,
        expirationDate: expirationDate,
        cvv: cvv,
      });
      await userPayment.save();
    } else {
      const newPayment = await Payment.create({
        by: user._id,
      });
      await user.update({
        payment: newPayment._id,
      });
      await newPayment.payments.push({
        paymentType: paymentType,
        nameOnCard: nameOnCard,
        cardNumber: cardNumber,
        expirationDate: expirationDate,
        cvv: cvv,
      });
      newPayment.save();
    }
    const newUser = await User.findById(user._id);
    const data = await Payment.findById(newUser.payment);
    return res.status(201).json({
      ok: true,
      data: [...data.payments],
      message: "payment details added to user",
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      message: "Internal server error",
    });
  }
};

module.exports.getAllPaymentDetails = async (req, res) => {
  const user = req.user;
  try {
    const data = await Payment.findById(user.payment);
    if (data) {
      return res.status(201).json({
        ok: true,
        data: [...data.payments],
        message: "Have some stored payment details",
      });
    } else {
      return res.status(201).json({
        ok: true,
        data: [],
        message: "User doesn't have any stored addresses",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      message: "Internal server error",
    });
  }
};

module.exports.deletePaymentDetails = async (req, res) => {
  const { paymentId } = req.params;
  const user = req.user;
  try {
    const payment = await Payment.findById(user.payment);
    await payment.updateOne({
      payments: payment.payments.filter(({ _id }) => _id != paymentId),
    });
    const newPayment = await Payment.findById(user.payment);
    return res.status(201).json({
      ok: true,
      data: [...newPayment.payments],
      message: "Payment details deleted",
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      message: "Internal server error",
    });
  }
};

module.exports.addNewOrder = async (req, res) => {
  const user = req.user;
  const { products, totalCost } = req.body;
  try {
    const order = await Order.findById(user.order);
    if (order) {
      await order.updateOne({
        orders: [...order.orders, { products: products, totalCost: totalCost }],
      });
    } else {
      const newOrder = await Order.create({
        by: user._id,
      });
      await user.updateOne({ order: newOrder._id });
      await newOrder.updateOne({
        orders: [{ products: products, totalCost: totalCost }],
      });
    }
    const cart = await Cart.findById(user.cart);
    await cart.updateOne({ cartItems: [] });
    return res.status(201).json({
      ok: true,
      message: "Order placed successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      message: "Internal server error",
    });
  }
};
