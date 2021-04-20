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
                    quantity:1
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
                quantity:1
            })
            newCart.save();
        }
        const newUser=await usersdb.findById(id)
        const data=await (await cartsdb.findById(newUser.cart)).execPopulate({path:'cartItems',populate:({path:'product'})})
        return res.status(201).json({
            ok:true,
            data:[...data.cartItems],
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
    const {id,productId}=req.params
    try{
        const user=await usersdb.findById(id)
        const cart=await cartsdb.findById(user.cart);
        if(cart.cartItems.some(({product})=>product==productId)){
            await cart.update({$pull:{cartItems:{product:productId}}})
        }else{
            return res.status(400).json({
                ok:false,
                messafe:"Invalid request"
            })
        }
        const data=await (await cartsdb.findById(user.cart)).execPopulate({path:'cartItems',populate:({path:'product'})})
        return res.status(201).json({
            ok:true,
            data:[...data.cartItems],
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

module.exports.changeQuantity=async (req,res)=>{
    const {id,productId}=req.params;
    const {quantity}=req.body
    try{
        const user=await usersdb.findById(id)
        const cart=await cartsdb.findById(user.cart);
        if(cart.cartItems.some(({product})=>product==productId)&& quantity>0){
                await cart.updateOne({$pull:{cartItems:{product:productId}}});
                await cart.cartItems.push({
                    product:productId,
                    quantity:quantity
                })
                await cart.save();
                const data=await (await cartsdb.findById(user.cart)).execPopulate({path:'cartItems',populate:({path:'product'})})
                return res.status(201).json({
                ok:true,
                data:[...data.cartItems],
                message:"Product quantity updated"
            })
        }else{
            return res.status(400).json({
                ok:false,
                messafe:"Invalid request"
            })
        }
    }catch(error){
        console.log(error);
        return res.status(503).json({
            ok:false,
            message:"Internal error"
        })
    }
}

module.exports.getAllCartItems=async (req,res)=>{
    const {id}=req.params;
    try{
        const user=await usersdb.findById(id);
        const cart=await cartsdb.findById(user.cart);
        if(cart){
            const data=await (await cart.execPopulate({path:'cartItems',populate:({path:'product'})}))
            return res.status(200).json({
                ok:true,
                data:[...data.cartItems],
                message:"Have some cartitems"
            })
        }else{
            return res.status(200).json({
                ok:true,
                data:[],
                message:"Cart hasn't been created yet"
            })
        }
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
    const {id,productId}=req.params
    try{
        const user=await usersdb.findById(id)
        const wishlist=await wishlistsdb.findById(user.wishlist);
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