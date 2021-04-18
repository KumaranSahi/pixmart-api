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