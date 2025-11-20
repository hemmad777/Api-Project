import mongoose from "mongoose";

const wishlistModel=new mongoose.Schema({
    productId:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model("Wishlist",wishlistModel);