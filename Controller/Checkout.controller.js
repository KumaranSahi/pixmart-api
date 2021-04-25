const addressesdb=require('../Models/addresses.model');
const usersdb=require('../Models/users.model');
const paymentsdb=require('../Models/payments.model')

module.exports.getAllAddresses=async (req,res)=>{
    const {id}=req.params;
    try{
        const user=await usersdb.findById(id);
        const data=await addressesdb.findById(user.address);
        if(data){
            return res.status(201).json({
                ok:true,
                data:[...data.addresses],
                message:"Have some stored addresses"
            })
        }else{
            return res.status(201).json({
                ok:true,
                data:[],
                message:"User doesn't have any stored addresses"
            })
        }
    }catch(error){
        console.log(error)
        return res.status(503).json({
            ok:false,
            message:"Internal server error"
        })
    } 
}

module.exports.addAddress=async (req,res)=>{
    const {id}=req.params;
    const {name,number,pin,address,landmark}=req.body
    try{
        const user=await usersdb.findById(id);
        const userAddress=await addressesdb.findById(user.address);
        if(userAddress){
            await userAddress.addresses.push({
                name:name,
                number:number,
                pin:pin,
                address:address,
                landmark:landmark
            })
            await userAddress.save();
        }else{
            const newAddress=await addressesdb.create({
                by:id
            })
            await user.update({
                address:newAddress._id
            })
            await newAddress.addresses.push({
                name:name,
                number:number,
                pin:pin,
                address:address,
                landmark:landmark
            })
            newAddress.save();
        }
        const newUser=await usersdb.findById(id)
        const data=await addressesdb.findById(newUser.address)
        return res.status(201).json({
            ok:true,
            data:[...data.addresses],
            message:"Address added to user"
        })
    }catch(error){
        console.log(error)
        return res.status(503).json({
            ok:false,
            message:"Internal server error"
        })
    }
}

module.exports.deleteAddress=async (req,res)=>{
    const {id,addressId}=req.params;
    try{
        const user=await usersdb.findById(id);
        const address=await addressesdb.findById(user.address)
        await address.updateOne({addresses:address.addresses.filter(({_id})=>_id!=addressId)})
        const newAddress=await addressesdb.findById(user.address)
        return res.status(201).json({
            ok:true,
            data:[...newAddress.addresses],
            message:"Address deleted"
        })
    }catch(error){
        console.log(error)
        return res.status(503).json({
            ok:false,
            message:"Internal server error"
        })
    }
}

module.exports.addPaymentDetail=async (req,res)=>{
    const {id}=req.params;
    const {paymentType,nameOnCard,cardNumber,expirationDate,cvv}=req.body;
    try{
        const user=await usersdb.findById(id);
        const userPayment=await paymentsdb.findById(user.payment);
        if(userPayment){
            await userPayment.payments.push({
                paymentType:paymentType,
                nameOnCard:nameOnCard,
                cardNumber:cardNumber,
                expirationDate:expirationDate,
                cvv:cvv
            })
            await userPayment.save();
        }else{
            const newPayment=await paymentsdb.create({
                by:id
            })
            await user.update({
                payment:newPayment._id
            })
            await newPayment.payments.push({
                paymentType:paymentType,
                nameOnCard:nameOnCard,
                cardNumber:cardNumber,
                expirationDate:expirationDate,
                cvv:cvv
            })
            newPayment.save();
        }
        const newUser=await usersdb.findById(id)
        const data=await paymentsdb.findById(newUser.payment)
        return res.status(201).json({
            ok:true,
            data:[...data.payments],
            message:"payment details added to user"
        })
    }catch(error){
        console.log(error)
        return res.status(503).json({
            ok:false,
            message:"Internal server error"
        })
    }
}

module.exports.getAllPaymentDetails=async (req,res)=>{
    const {id}=req.params;
    try{
        const user=await usersdb.findById(id);
        const data=await paymentsdb.findById(user.payment);
        if(data){
            return res.status(201).json({
                ok:true,
                data:[...data.payments],
                message:"Have some stored payment details"
            })
        }else{
            return res.status(201).json({
                ok:true,
                data:[],
                message:"User doesn't have any stored addresses"
            })
        }
    }catch(error){
        console.log(error)
        return res.status(503).json({
            ok:false,
            message:"Internal server error"
        })
    } 
}

module.exports.deletePaymentDetails=async (req,res)=>{
    const {id,paymentId}=req.params;
    try{
        const user=await usersdb.findById(id);
        const payment=await paymentsdb.findById(user.payment)
        await payment.updateOne({payments:payment.payments.filter(({_id})=>_id!=paymentId)})
        const newPayment=await paymentsdb.findById(user.payment)
        return res.status(201).json({
            ok:true,
            data:[...newPayment.payments],
            message:"Payment details deleted"
        })
    }catch(error){
        console.log(error)
        return res.status(503).json({
            ok:false,
            message:"Internal server error"
        })
    }
}