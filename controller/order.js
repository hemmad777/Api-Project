const cartCollection=require("../model/cart");
const order = require("../model/order");



// Logic for create order

exports.createOrder=async (req,res)=>{
    try {
        const userId=req.user.userId;
        const items=await cartCollection.find({userId:userId});
        const {shippingAddress}=req.body;

        if(!shippingAddress){
            return res.status(401).json({message:"Shipping address not provided"});
        }
        
        if(!items||items.length==0){
            return res.status(404).json({message:"Your cart is empty"});
        }

        const totalAmount=items.reduce((Sum,item)=>Sum+item.price,0);

        const Order=new order({
            userId,
            items,
            totalAmount,
            status:"Ready to ship",
            shippingAddress,
        })

        await Order.save();

        res.status(200).json({message:"Order successfully",Order:Order})

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

