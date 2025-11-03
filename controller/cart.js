const Cart=require("../model/cart");
const Product=require("../model/product");


// Logic for Post cart
exports.postCart=async (req,res)=>{
    try {
        const {productId,quantity,price}=req.body;

        if(!productId||!quantity||!price){
            return res.status(401).json({message:"provide all details"})
        }

        const product=await Product.findById(productId)

        if(!product){
            return res.status(404).json({message:"You added product not found"});
        }

        const cart= new Cart({
            productId,
            quantity,
            price
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
        const cart=await Cart.find();

        if(!cart){
            res.status(404).json({message:"Not found in your cart"})
        }

        res.status(200).json({message:"This is your cart",cart:cart})
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

// Logic for Delete entire cart

exports.deleteCart=async (req,res)=>{
    try {
        const deleteCart=await Cart.deleteMany();

        if(deleteCart.deletedCount===0){
            res.status(401).json({message:"Cart also empty"});
        }

        res.status(200).json({message:"Successfully deleted the cart",cart:deleteCart});

        
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}