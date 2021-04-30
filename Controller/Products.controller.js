const productsdb=require("../Models/products.model");

module.exports.getAllProducts=async (req,res)=>{
    try{
        const data=await productsdb.find();
        if(data)
            return res.status(200).json({
                ok:true,
                data:[...data],
                message:"Products loaded successfully"
            })
        else
            return res.status(404).json({
                ok:false,
                message:"Data not found"
            })
    }catch(error){
        console.log(error);
        return res.status(503).json({
            ok:false,
            message:"Could not load products"
        })
    }
}

module.exports.getProduct=async (req,res)=>{
    const {productId}=req.params;
    try{
        const data=await productsdb.findById(productId);
        if(data)
            return res.status(200).json({
                ok:true,
                data:data,
                message:"Products loaded successfully"
            })
        else
            return res.status(404).json({
                ok:false,
                message:"Data not found"
            })
    }catch(error){
        console.log(error);
        return res.status(503).json({
            ok:false,
            message:"Could not load products"
        })
    }
}