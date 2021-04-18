const productsdb=require('../Models/products.model');

const productCheck=async (req,res,next)=>{
    const {productId}=req.body;
    try{
        if(await productsdb.findById(productId)){
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

module.exports=productCheck;