
const { default: mongoose } = require("mongoose");
const Product =require("../model/product");
const Wishlist=require("../model/wishlist");

exports.addProduct=async (req,res)=>{
    try {
        const {productId}=req.params;
        const product=await Product.findById(productId);

        if(!product){
            return res.status(401).json({message:"Not found the product"});
        }

        const exist=await Wishlist.findOne({productId});

        if(exist){
            res.status(401).json({message:"This product allready added"});
        }

        const wishlist=new Wishlist ({productId});

        await wishlist.save();

        res.status(201).json({message:"Successfully add this product to wishlist",product:product})
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}

// Get all wishlist products

exports.getAllWishlists=async (req,res)=>{
    try {
        const wishlist=await Wishlist.find()

        console.log(wishlist);
        

        if(!wishlist){
            res.status(401).json({message:"Wishlist also empty"})
        }

        res.status(201).json({message:"Your all wishlist",wishlist:wishlist});
    } catch (error) {
        res.status(500).json({message:'knfo'+error.message})
    }
}

// Get product by Id from wishlist

exports.getProductById=async(req,res)=>{
    try {
        const {productId}=req.params;
        const prodcut=await Wishlist.findOne({
            productId:new mongoose.Types.ObjectId(productId)
        });

        if(!prodcut){
            res.status(404).json({message:"Nor found this product"});
        }

        res.status(201).json({message:"You finded prodct is this",prodcut:prodcut});


    } catch (error) {
        res.status(500).json({message:error.message});
    }
}