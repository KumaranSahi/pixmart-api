const express = require("express");
const router = express.Router();
const passport = require("passport");

const userController = require("../Controller/User.controller");
const productController = require("../Controller/Products.controller");
const cartWishlistController = require("../Controller/CartWishlist.controller");
const checkoutController = require("../Controller/Checkout.controller");

//middleware
const productCheck = require("../Middleware/product.middleware");

//users routes
router.post("/users/signin", userController.signinUser);
router.post("/users/signup", userController.signupUser);
router.post("/users/password", userController.changePassword);

//products routes

router.get("/products", productController.getAllProducts);
router.get("/products/:productId", productCheck, productController.getProduct);

//cart routes

router.post(
  "/carts/:id",
  passport.authenticate("jwt", { session: false }),
  productCheck,
  cartWishlistController.addToCart
);
router.delete(
  "/carts/:id/products/:productId",
  passport.authenticate("jwt", { session: false }),
  productCheck,
  cartWishlistController.removeFromCart
);
router.put(
  "/carts/:id/products/:productId",
  passport.authenticate("jwt", { session: false }),
  productCheck,
  cartWishlistController.changeQuantity
);
router.get(
  "/carts/:id",
  passport.authenticate("jwt", { session: false }),
  cartWishlistController.getAllCartItems
);

//wishlist routes

router.post(
  "/wishlists/:id",
  passport.authenticate("jwt", { session: false }),
  productCheck,
  cartWishlistController.addToWishlist
);
router.delete(
  "/wishlists/:id/products/:productId",
  passport.authenticate("jwt", { session: false }),
  productCheck,
  cartWishlistController.removeFromWishlist
);
router.get(
  "/wishlists/:id",
  passport.authenticate("jwt", { session: false }),
  cartWishlistController.getAllwishlistItems
);

//address routes

router.get(
  "/addresses/:id",
  passport.authenticate("jwt", { session: false }),
  checkoutController.getAllAddresses
);
router.post(
  "/addresses/:id",
  passport.authenticate("jwt", { session: false }),
  checkoutController.addAddress
);
router.delete(
  "/addresses/:addressId/users/:id",
  passport.authenticate("jwt", { session: false }),
  checkoutController.deleteAddress
);

//payment details routes

router.get(
  "/payments/:id",
  passport.authenticate("jwt", { session: false }),
  checkoutController.getAllPaymentDetails
);
router.post(
  "/payments/:id",
  passport.authenticate("jwt", { session: false }),
  checkoutController.addPaymentDetail
);
router.delete(
  "/payments/:paymentId/users/:id",
  passport.authenticate("jwt", { session: false }),
  checkoutController.deletePaymentDetails
);

//checkout routes

router.post(
  "/orders/:id",
  passport.authenticate("jwt", { session: false }),
  checkoutController.addNewOrder
);

module.exports = router;
