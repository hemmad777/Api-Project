const slugify=require("slugify");
const Products=require("../model/product");
const { strict } = require("assert");
const { default: mongoose } = require("mongoose");
const Orders=require("../model/order");
const { format } = require("path");






// logic for post a product

exports.createProduct=async(req,res)=>{
    try {
        const {name,description,price,stock,category,imageUrl,isPublished}=req.body;

        if(!name||!description||!price||!stock||!category||!image){
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
            image,
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

// Logic for sales dashbord

exports.dashboardMetrics=async (req,res)=>{


    const allOrders=await Orders.find();

    if(allOrders.length==0){
        return res.status(404).json({message:"Entire sales all empty"})
    }

    const limit=req.body.limit

    const lastNDays= (n)=>{
        return Array.from({length:n},(s,i)=>{
            const thisDay=new Date();
            thisDay.setDate(thisDay.getDate()-i);

            return `${thisDay.getFullYear()}-${thisDay.getMonth()+1}-${thisDay.getDate()}`
        })
    }
    
    const lastNDates = lastNDays(limit);


    const Cod=await Orders.aggregate([
        {$unwind:"$items"},
        {$match:{status:"Delivered",method:"Cod"}},
        {
            $group:{
                _id:{
                    $dateToString:{format:"%Y-%m-%d",date:"$updatedAt"}
                },
                    totalOrders:{$sum:"$items.quantity"}
            }
        },
        {$sort:{_id:-1}},
        {$limit:limit}
    ]);

    const lastNDaysCod=lastNDates.map(date=>{
        const found=Cod.find(c=>c._id===date);
        return found?found.totalOrders:0
    });

    const Gpay=await Orders.aggregate([
        {$unwind:"$items"},
        {$match:{status:"Delivered",method:"Gpay"}},
        {
            $group:{
                _id:{
                    $dateToString:{format:"%Y-%m-%d",date:"$updatedAt"}
                },
                    totalOrders:{$sum:"$items.quantity"}
            }
        },
        {$sort:{_id:-1}},
        {$limit:limit}
    ]);

    
    const lastNDaysOnline=lastNDates.map(date=>{
        const found=Gpay.find(g=>g._id===date);
        return found?found.totalOrders:0
    })

   

    res.status(200).json({message:"Successfully taked your all dashboard data",
        lastNDates,
        lastNDaysCod,
        lastNDaysOnline
    });
}

// Logic for monthly dashboard

exports.monthlyDashboard=async (req,res)=>{
    try {
        const allOrders=await Orders.find();

        if(allOrders.length===0){
            return res.status(404).json({message:"Entire sales all empty"});
        }

        const limit=req.body.limit;


        const lastNMonths=(n)=>{
            return Array.from({length:n},(_,i)=>{
                const thisDay=new Date();
                thisDay.setMonth(thisDay.getMonth()-i);
                return `${thisDay.getFullYear()}-${String(thisDay.getMonth()+1).padStart(2,"0")}`
            })
        }

         const lastMonths=lastNMonths(limit);

        const monthSales=await Orders.aggregate([
            {$unwind:"$items"},
            {$match:{status:"Delivered"}},
            {
                $group:{
                    _id:{
                        $dateToString:{format:"%Y-%m",date:"$updatedAt"}
                    },
                    totalOrders:{$sum:"$items.quantity"}
                }
            },
            {$sort:{_id:-1}},
            {$limit:limit}
        ]);

        const Monthlysales=lastMonths.map(month=>{
            const sales=monthSales.find(s=>s._id==month);

            return sales?sales.totalOrders:0
        });

        res.status(200).json({message:"Your monthly dashboard is",
            lastMonths,
            Monthlysales
        });
        

    } catch (error) {
        res.status(500).json({message:error.message});
    }
}