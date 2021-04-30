const mongoose=require('mongoose')

const orderSchema=new mongoose.Schema({
    by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },orders:[
        {
            products:[{
                product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"product"
                },
                quantity:{
                    type:String
                }
            }],
            totalCost:{
                type:String
            }
        }    
    ]
},{timestamps:true})

const order=mongoose.model('order',orderSchema)
module.exports=order