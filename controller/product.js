
const Product=require("../model/product");


// Get all products 
exports.getAllProducts=async (req,res)=>{
    try {
        const products=await Product.find();

        if(!products||products.length==0){
            return res.status(404).json({message:"Product not found"});
        }

        res.status(201).json({message:"success fully take all products",products:products});
    } catch (error) {
        res.status(500).json({message:"Server error is",error:error.message})
    }
}

// Get products By Id

exports.getProductById=async (req,res)=>{
    try {
        const {id}=req.params;

        const product=await Product.findById(id);

        if(!product){
            res.status(404).json({message:"Not found prodcut with this ID"})
        }

        res.status(201).json({message:"Successfully find the product",product:product});
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}