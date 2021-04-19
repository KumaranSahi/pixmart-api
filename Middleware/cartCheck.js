const cartsdb=require('../Models/carts.model');

const cartCheck=async (req,res,next)=>{
    const {cartId}=req.params
    try{
        if(await cartsdb.findById(cartId)){
            next()
        }else{
            return res.status(404).json({
                ok:false,
                message:"Data not found"
            })
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