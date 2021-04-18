const express=require('express');
const router=express.Router()

const UserController=require("../Controller/User.controller")
const ProductsController=require("../Controller/Products.controller")

//products

router.get("/products",ProductsController.getAllProducts)


module.exports=router;