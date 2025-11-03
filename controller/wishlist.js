
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

