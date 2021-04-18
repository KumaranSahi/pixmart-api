const mongoose=require('mongoose');

const intrestedItemSchema=new mongoose.Schema({
    intrestedItems:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                required:true
            },wasInCart:{
                type:Boolean
            },wasInWishlist:{
                type:Boolean
            },ordered:{
                type:Boolean
            }
        }
    ],by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
},{
    timestamps:true
})

const intrestedItem=mongoose.model("intrestedItem",intrestedItemSchema);
module.exports=intrestedItem;