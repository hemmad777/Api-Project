const slugify=require("slugify");
const Products=require("../model/product");
const { strict } = require("assert");
const { default: mongoose } = require("mongoose");
const Orders=require("../model/order");





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

// logic for delete product by Id

exports.deleteProductById=async (req,res)=>{
    try {
        const {productId}=req.params;

        if(!mongoose.isValidObjectId(productId)){
            return res.status(400).json({message:"Please provide Id correctly"})
        }

        const deleteProduct=await Products.findByIdAndDelete(productId);

        if(!deleteProduct){
            return res.status(404).json({message:"Not found product with this Id"});
        }

        res.status(200).json({message:"Successfully deleted this product",product:deleteProduct});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

// Logic for Get all orders

exports.getAllOrders=async (req,res)=>{
    try {
        const orders=await Orders.find();
    
        
        if(!orders){
            return res.status(404).json({message:"Orders all not found"});
        }

        res.status(200).json({message:"All orders are",orders:orders})
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

// Logic for patch order status

exports.patchProductById=async(req,res)=>{
    try {
        const {orderId}=req.params;
        const {status}=req.body

        if(!mongoose.isValidObjectId(orderId)){
            return res.status(400).json({message:"Please provide Id correctly"});
        }

        const patchOrder=await Orders.findByIdAndUpdate(orderId,{status:status},{new:true,runValidators:true});

        if(!patchOrder){
            return res.status(404).json({message:"Not found order with this Id"})
        }

        res.status(200).json({message:"Successfully changed the order status",order:patchOrder});


    } catch (error) {
        res.status(500).json({message:error.message});
    }
}