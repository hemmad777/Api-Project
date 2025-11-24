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

// Logic for get all order of logined user

exports.getAllOrder=async (req,res)=>{
    try {
        const Orders=await order.find({userId:req.user.userId});
        

        if(Orders.length==0){
            return res.status(404).json({message:"You have no orders"});
        }

        res.status(200).json({message:"Your orders are",Orders});
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

// logic for get a specific order

exports.getOrderById=async(req,res)=>{
    try {

        const {orderId}=req.params;

        const Order=await order.findOne({_id:orderId,userId:req.user.userId})

        if(!Order){
            return res.status(404).json({message:"Product not found"})
        }

        res.status(200).json({message:"You searched order is",Order});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}