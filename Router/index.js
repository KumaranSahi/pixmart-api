const express=require('express');
const router=express.Router()

const userController=require("../Controller/User.controller")
const productController=require("../Controller/Products.controller")

//users routes
router.post('/users/signin',userController.signinUser)
router.post('/users/signup',userController.signupUser)
router.post('/users/password',userController.changePassword)

//products routes

router.get("/products",productController.getAllProducts)


module.exports=router;