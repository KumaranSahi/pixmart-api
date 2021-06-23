const { User, Cart, Wishlist } = require("../models");

module.exports.addToCart = async (req, res) => {
  const user = req.user;
  const { productId, quantity } = req.body;
  try {
    const cart = await Cart.findById(user.cart);
    if (cart) {
      if (!cart.cartItems.some(({ product }) => product == productId)) {
        cart.cartItems.push({
          product: productId,
          quantity: quantity,
        });
        await cart.save();
      }
    } else {
      const newCart = await Cart.create({
        by: user._id,
      });
      await user.update({
        cart: newCart._id,
      });
      await newCart.cartItems.push({
        product: productId,
        quantity: quantity,
      });
      await newCart.save();
    }
    const newUser = await User.findById(user._id);
    const data = await (
      await Cart.findById(newUser.cart)
    ).execPopulate({ path: "cartItems", populate: { path: "product" } });
    return res.status(201).json({
      ok: true,
      data: [...data.cartItems],
      message: "Product added to cart",
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      message: "Internal error",
    });
  }
};

module.exports.removeFromCart = async (req, res) => {
  const { productId } = req.params;
  const user = req.user;
  try {
    const cart = await Cart.findById(user.cart);
    if (cart.cartItems.some(({ product }) => product == productId)) {
      await cart.update({ $pull: { cartItems: { product: productId } } });
    } else {
      return res.status(400).json({
        ok: false,
        message: "Invalid request",
      });
    }
    const data = await (
      await Cart.findById(user.cart)
    ).execPopulate({ path: "cartItems", populate: { path: "product" } });
    return res.status(201).json({
      ok: true,
      data: [...data.cartItems],
      message: "Product removed from cart",
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      message: "Internal error",
    });
  }
};

module.exports.changeQuantity = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const user = req.user;
  try {
    const cart = await Cart.findById(user.cart);
    if (
      cart.cartItems.some(({ product }) => product == productId) &&
      quantity > 0
    ) {
      await cart.updateOne({ $pull: { cartItems: { product: productId } } });
      await cart.cartItems.push({
        product: productId,
        quantity: quantity,
      });
      await cart.save();
      const data = await (
        await Cart.findById(user.cart)
      ).execPopulate({ path: "cartItems", populate: { path: "product" } });
      return res.status(201).json({
        ok: true,
        data: [...data.cartItems],
        message: "Product quantity updated",
      });
    } else {
      return res.status(400).json({
        ok: false,
        message: "Invalid request",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      message: "Internal error",
    });
  }
};

module.exports.getAllCartItems = async (req, res) => {
  const user = req.user;
  try {
    const cart = await Cart.findById(user.cart);
    if (cart) {
      const data = await await cart.execPopulate({
        path: "cartItems",
        populate: { path: "product" },
      });
      return res.status(200).json({
        ok: true,
        data: [...data.cartItems],
        message: "Have some cartitems",
      });
    } else {
      return res.status(200).json({
        ok: true,
        data: [],
        message: "Cart hasn't been created yet",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      message: "Internal error",
    });
  }
};

module.exports.addToWishlist = async (req, res) => {
  const user = req.user;
  const { productId } = req.body;
  try {
    const wishlist = await Wishlist.findById(user.wishlist);
    if (wishlist) {
      if (!wishlist.wishlistItems.some((product) => product == productId)) {
        wishlist.wishlistItems.push(productId);
        await wishlist.save();
      }
    } else {
      const newWishlist = await Wishlist.create({
        by: user._id,
      });
      await user.update({
        wishlist: newWishlist._id,
      });
      await newWishlist.wishlistItems.push(productId);
      await newWishlist.save();
    }
    const newUser = await User.findById(user._id);
    const data = await (
      await Wishlist.findById(newUser.wishlist)
    ).execPopulate({ path: "wishlistItems", populate: { path: "product" } });

    return res.status(201).json({
      ok: true,
      data: [...data.wishlistItems],
      message: "Product added to wishlist",
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      message: "Internal error",
    });
  }
};

module.exports.removeFromWishlist = async (req, res) => {
  const { productId } = req.params;
  const user = req.user;
  try {
    const wishlist = await Wishlist.findById(user.wishlist);
    if (wishlist.wishlistItems.some((product) => product == productId)) {
      await wishlist.update({ $pull: { wishlistItems: productId } });
    } else {
      return res.status(400).json({
        ok: false,
        message: "Invalid request",
      });
    }
    const newUser = await User.findById(user._id);
    const data = await (
      await Wishlist.findById(newUser.wishlist)
    ).execPopulate({ path: "wishlistItems", populate: { path: "product" } });

    return res.status(201).json({
      ok: true,
      data: [...data.wishlistItems],
      message: "Product removed from wishlist",
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      message: "Internal error",
    });
  }
};

module.exports.getAllwishlistItems = async (req, res) => {
  const user = req.user;
  try {
    const wishlist = await Wishlist.findById(user.wishlist);
    if (wishlist) {
      const data = await (
        await Wishlist.findById(user.wishlist)
      ).execPopulate({ path: "wishlistItems", populate: { path: "product" } });
      return res.status(201).json({
        ok: true,
        data: [...data.wishlistItems],
        message: "Product added to wishlist",
      });
    } else {
      return res.status(200).json({
        ok: true,
        data: [],
        message: "Wishlist hasn't been created yet",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      ok: false,
      message: "Internal error",
    });
  }
};
