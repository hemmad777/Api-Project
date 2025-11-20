
import Cart from "../model/cart";
import Product from "../model/product";
import mongoose from "mongoose";

// Logic for Post cart
exports.postCart=async (req,res)=>{
    try {
        const {productId,quantity}=req.body;

        if(!productId||!quantity){
            return res.status(401).json({message:"provide all details"})
        }

        const product=await Product.findById(productId)

        if(!product){
            return res.status(404).json({message:"You added product not found"});
        }

        const exist=await Cart.findOne({userId:req.user.userId,productId});

        if(exist){
            exist.quantity+=quantity,
            exist.price=product.price*exist.quantity,
            await exist.save();
            return res.status(200).json({message:"cart Updated",cart:exist})
        }

        const cart= new Cart({
            userId:req.user.userId,
            productId,
            quantity,
            price:product.price*quantity
        });

        await cart.save();

        res.status(201).json({message:"Successfully added the product",cart:cart})
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

// Logic for Get all cart

exports.getAllCart=async (req,res)=>{
    try {
        const userCart=await Cart.find({userId:req.user.userId});

        if(!userCart||userCart.length==0){
            return res.status(404).json({message:"Not found Cart is also empty"})
        }

        res.status(200).json({message:"This is your cart",cart:userCart})
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

// Logic for Delete entire cart

exports.deleteCart=async (req,res)=>{
    try {
        const deleteCart=await Cart.deleteMany({userId:req.user.userId});

        if(deleteCart.deletedCount===0){
            return res.status(401).json({message:"Cart also empty"});
        }

        res.status(200).json({message:"Successfully deleted the cart",cart:deleteCart});

        
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

// Logic for delete One from cart

exports.deleteOne=async (req,res)=>{
    try {
        const {productId}=req.params;

        const existProduct=await Cart.findOneAndDelete({
            productId:new mongoose.Types.ObjectId(productId),
            userId:req.user.userId
        });

        if(!existProduct){
            return res.status(404).json({message:"this product not in your cart"});
        }

        res.status(200).json({message:"successfully deleted this product from cart",product:existProduct});
        
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}