import mongoose from "mongoose";

const orderSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:[true,"UserId not provided"],
    },
    items:{
        type:Object,
        required:[true,"Cart is also empty"],
    },
    totalAmount:{
        type:Number,
        required:[true,"Provide total amount"],
        min:[0,"provde greater than 0"],
    },
    status:{
        type:String,
        required:[true,"provide the status"],
    },
    rozorpayOrderId:{
        type:String,
        // required:[true,"rozorpayOrderId not provided"],
    },
    rozorpayPaymentId:{
        type:String,
        // required:[true,"provide rozorpay Id"],
    },
    shippingAddress:{
        type:Object,
        required:[true,"shipping address not provided"]
    }
},{timestamps:true});

module.exports=mongoose.model("Order",orderSchema);