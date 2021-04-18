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
    },intrestedItem:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'intrestedItem'
    }
})

const user=mongoose.model('user',UserSchema);
module.exports=user;