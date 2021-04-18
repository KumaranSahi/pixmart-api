const usersdb=require('../Models/users.model');
const cartsdb=require('../Models/carts.model');
const wishlistsdb=require('../Models/wishlists.model');
const productsdb=require('../Models/products.model');

module.exports.addToCart=async (req,res)=>{
    const {id}=req.params;
    const {productId}=req.body;
    try{
        const user=await usersdb.findById(id);
        const cart=await cartsdb.findById(user.cart);
        if(cart){
            if(!cart.cartItems.some(({product})=>product==productId)){
                cart.cartItems.push({
                    product:productId,
                    quantity:0
                })
                cart.save();
            }
        }else{
            const newCart=await cartsdb.create({
                by:id
            })
            await user.update({
                cart:newCart._id
            })
            await newCart.cartItems.push({
                product:productId,
                quantity:0
            })
            newCart.save();
        }
        return res.status(201).json({
            ok:true,
            message:"Product added to cart"
        })
    }catch(error){
        console.log(error);
        return res.status(503).json({
            ok:false,
            message:"Internal error"
        })
    }
}

module.exports.removeFromCart=async (req,res)=>{
    const {cartid,productId}=req.params
    try{
        const cart=await cartsdb.findById(cartid);
        if(cart.cartItems.some(({product})=>product==productId)){
            await cart.update({$pull:{cartItems:{product:productId}}})
        }else{
            return res.status(400).json({
                ok:false,
                messafe:"Invalid request"
            })
        }
        return res.status(201).json({
            ok:true,
            message:"Product removed from cart"
        })
    }catch(error){
        console.log(error);
        return res.status(503).json({
            ok:false,
            message:"Internal error"
        })
    }
}

module.exports.addToWishlist=async (req,res)=>{
    const {id}=req.params;
    const {productId}=req.body;
    try{
        const user=await usersdb.findById(id);
        const wishlist=await wishlistsdb.findById(user.wishlist);
        if(wishlist){
            if(!wishlist.wishlistItems.some(product=>product==productId)){
                wishlist.wishlistItems.push(productId)
                wishlist.save();
            }
        }else{
            const newWishlist=await wishlistsdb.create({
                by:id
            })
            await user.update({
                wishlist:newWishlist._id
            })
            await newWishlist.wishlistItems.push(productId)
            newWishlist.save();
        }
        return res.status(201).json({
            ok:true,
            message:"Product added to wishlist"
        })
    }catch(error){
        console.log(error);
        return res.status(503).json({
            ok:false,
            message:"Internal error"
        })
    }
}

module.exports.removeFromWishlist=async (req,res)=>{
    const {wishlistid,productId}=req.params
    try{
        const wishlist=await wishlistsdb.findById(wishlistid);
        if(wishlist.wishlistItems.some(product=>product==productId)){
            await wishlist.update({$pull:{wishlistItems:productId}})
        }else{
            return res.status(400).json({
                ok:false,
                messafe:"Invalid request"
            })
        }
        return res.status(201).json({
            ok:true,
            message:"Product removed from wishlist"
        })
    }catch(error){
        console.log(error);
        return res.status(503).json({
            ok:false,
            message:"Internal error"
        })
    }
}