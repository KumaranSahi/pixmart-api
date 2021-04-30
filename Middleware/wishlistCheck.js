const wishlistsdb=require('../Models/wishlists.model');

const wishlistCheck=async (req,res,next)=>{
    const {wishlistid}=req.params
    try{
        if(await wishlistsdb.findById(wishlistid)){
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

module.exports=wishlistCheck;