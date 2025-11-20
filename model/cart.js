
import mongoose from "mongoose";

const cartModel=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    productId:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        min:[0,"choose quantity above zero"]
    },
    price:{
        type:Number,
        required:true
    }
})

module.exports=mongoose.model("Cart",cartModel);