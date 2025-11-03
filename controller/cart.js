const Cart=require("../model/cart");
const Product=require("../model/product");

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

        res.status(201).json({message:"Successfully added the product", cart })
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}