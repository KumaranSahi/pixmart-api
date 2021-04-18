const cartsdb=require('../Models/carts.model');

const cartCheck=async (req,res,next)=>{
    const {cartid}=req.params
    try{
        if(await cartsdb.findById(cartid)){
            next()
        }
    }catch(error){
        console.log(error);
        return res.status(404).json({
            ok:false,
            message:"Data not found"
        })
    }
}

module.exports=cartCheck;