const express = require("express");
const router = express.Router();
const passport = require("passport");

const productController = require("../Controller/product.controller");
// const userController = require("../Controller/user.controller");
const cartWishlistController = require("../Controller/cartWishlist.controller");
const checkoutController = require("../Controller/checkout.controller");

//middleware
const productCheck = require("../Middleware/product.middleware");

//users routes
// router.post("/users/signin", userController.signinUser);
// router.post("/users/signup", userController.signupUser);
// router.post("/users/password", userController.changePassword);

//products routes

router.get("/products", productController.getAllProducts);
router.get("/products/:productId", productCheck, productController.getProduct);

//cart routes

router.post(
  "/carts",
  passport.authenticate("jwt", { session: false }),
  productCheck,
  cartWishlistController.addToCart
);
router.delete(
  "/carts/:productId",
  passport.authenticate("jwt", { session: false }),
  productCheck,
  cartWishlistController.removeFromCart
);
router.put(
  "/carts/:productId",
  passport.authenticate("jwt", { session: false }),
  productCheck,
  cartWishlistController.changeQuantity
);
router.get(
  "/carts",
  passport.authenticate("jwt", { session: false }),
  cartWishlistController.getAllCartItems
);

//wishlist routes

router.post(
  "/wishlists",
  passport.authenticate("jwt", { session: false }),
  productCheck,
  cartWishlistController.addToWishlist
);
router.delete(
  "/wishlists/:productId",
  passport.authenticate("jwt", { session: false }),
  productCheck,
  cartWishlistController.removeFromWishlist
);
router.get(
  "/wishlists",
  passport.authenticate("jwt", { session: false }),
  cartWishlistController.getAllwishlistItems
);

//address routes

router.get(
  "/addresses",
  passport.authenticate("jwt", { session: false }),
  checkoutController.getAllAddresses
);
router.post(
  "/addresses",
  passport.authenticate("jwt", { session: false }),
  checkoutController.addAddress
);
router.delete(
  "/addresses/:addressId",
  passport.authenticate("jwt", { session: false }),
  checkoutController.deleteAddress
);

//payment details routes

router.get(
  "/payments",
  passport.authenticate("jwt", { session: false }),
  checkoutController.getAllPaymentDetails
);
router.post(
  "/payments",
  passport.authenticate("jwt", { session: false }),
  checkoutController.addPaymentDetail
);
router.delete(
  "/payments/:paymentId",
  passport.authenticate("jwt", { session: false }),
  checkoutController.deletePaymentDetails
);

//checkout routes

router.post(
  "/orders",
  passport.authenticate("jwt", { session: false }),
  checkoutController.addNewOrder
);

module.exports = router;
