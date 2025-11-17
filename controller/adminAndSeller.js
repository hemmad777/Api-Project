const slugify=require("slugify");
const Products=require("../model/product");
const { strict } = require("assert");
const { default: mongoose } = require("mongoose");



// logic for post a product

exports.createProduct=async(req,res)=>{
    try {
        const {name,description,price,stock,category,imageUrl,isPublished}=req.body;

        if(!name||!description||!price||!stock||!category||!imageUrl){
            return res.status(400).json({message:"Not provided all required field"});
        }

        const slug=slugify(name,{lower:true,strict:true});

        const product=new Products({
            name,
            slug,
            description,
            price,
            stock,
            category,
            imageUrl,
            isPublished:isPublished||false
        })

        await product.save();

        res.status(200).json({message:"Successfully added the product",product:product});
        
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

// Logic for list all products

exports.getAllProducts=async (req,res)=>{
    try {
        const products=await Products.find();
        
        if(!products){
            res.status(404).json({message:"Products also empty"});
        }

        res.status(200).json({message:"Thease are your products",products:products});

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

// Logic for update product by Id

exports.updateProducById=async (req,res)=>{
    try {
        const {productId}=req.params;
        const {name,description,price,stock,category,imageUrl,isPublished}=req.body;

        const updateProduct={};

        if(!mongoose.isValidObjectId(productId)){
            return res.status(400).json({message:"Please provide Id correctly"})
        }

        if(name) {
            updateProduct.name=name;
            
            updateProduct.slug=slugify(name,{lower:true,strict:true});
        };
        if(description) updateProduct.description=description;
        if(price) updateProduct.price=price;
        if(stock) updateProduct.stock=stock;
        if(category) updateProduct.category=category;
        if(imageUrl) updateProduct.imageUrl=imageUrl;
        if(isPublished !== undefined) updateProduct.isPublished=isPublished;
        

        if(Object.keys(updateProduct).length==0){
            return res.status(400).json({message:"Please provide any item of if you want update"});
        }

        const product = await Products.findByIdAndUpdate(productId,updateProduct,{new:true,runValidators:true});

        if(!product){
            return res.status(404).json({message:"Product not found with given Id"});
        }

        res.status(200).json({message:"Successfully updated the product like this",product:product});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

