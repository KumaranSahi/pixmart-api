const mongoose=require('mongoose')

const cartSchema=new mongoose.Schema({
    cartItems:[{
        product:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"product"
        },quantity:{
            type:Number
        }    
    }],by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
},{timestamps:true})

const cart=mongoose.model("cart",cartSchema);
module.exports=cart;