const mongoose=require('mongoose');

const wishlistSchema=new mongoose.Schema({
    wishlistItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }],
    by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

const Wishlist=mongoose.model("Wishlist",wishlistSchema)
module.exports=Wishlist;