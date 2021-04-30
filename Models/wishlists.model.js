const mongoose=require('mongoose');

const wishlistSchema=new mongoose.Schema({
    wishlistItems:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    }],
    by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
},{timestamps:true})

const wishlist=mongoose.model("wishlist",wishlistSchema)
module.exports=wishlist;