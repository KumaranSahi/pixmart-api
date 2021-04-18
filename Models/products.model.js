const mongoose=require('mongoose');

const productsSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide a name for your product"]
    },
    image:{
        type:String,
        required:[true,"Please provide a image URL for your product"],
        validate:{
            validator:text=>/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(text),
            message:"Please enter a valid URL"
        }
    },
    price: {
        type:Number,
        required:[true,"Please provide a price for your product"]
    },
    catagory:{
        type:String,
        required:[true,"Please provide a catagory for your product"]
    },
    rating:{
        type:Number
    },
    hasDiscount:{
        type:Boolean
    },
    discount:{
        type:Number
    },
    fastDelivery:{
        type:Boolean
    },
    inStock:{
        type:Boolean
    },
    pixmartChoice:{
        type:Boolean
    }

},{timestamps:true})

const product=mongoose.model("product",productsSchema)
module.exports=product;