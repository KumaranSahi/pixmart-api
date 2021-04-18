const express=require('express');
const router=express.Router()
const passport=require('passport')

const userController=require("../Controller/User.controller")
const productController=require("../Controller/Products.controller")
const cartWishlistController=require("../Controller/CartWishlist.controller")

//middleware
const userCheck=require("../Middleware/userCheck")
const productCheck=require("../Middleware/productCheck")
const cartCheck=require("../Middleware/cartCheck")
const wishlistCheck=require("../Middleware/wishlistCheck")

//users routes
router.post('/users/signin',userController.signinUser)
router.post('/users/signup',userController.signupUser)
router.post('/users/password',userController.changePassword)

//products routes

router.get("/products",productController.getAllProducts)

//cart routes

router.post("/carts/:id",passport.authenticate('jwt',{session:false}),userCheck,productCheck,cartWishlistController.addToCart)
router.delete("/carts/:cartid/products/:productId",passport.authenticate('jwt',{session:false}),cartCheck,productCheck,cartWishlistController.removeFromCart)

//wishlist routes

router.post("/wishlists/:id",passport.authenticate('jwt',{session:false}),userCheck,productCheck,cartWishlistController.addToWishlist)
router.delete("/wishlists/:wishlistid/products/:productId",passport.authenticate('jwt',{session:false}),wishlistCheck,productCheck,cartWishlistController.removeFromWishlist)

module.exports=router;