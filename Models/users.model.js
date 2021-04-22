const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },email:{
        type:String,
        required:true,
        unique:true
    },password:{
        type:String,
        required:true
    },cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'cart'
    },wishlist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'wishlist'
    },address:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'address'
    }
})

const user=mongoose.model('user',UserSchema);
module.exports=user;