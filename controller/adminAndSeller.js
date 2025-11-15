// logic for post a product

exports.createProduct=async(req,res)=>{
    try {
        const {name,description,price,stock,category,imageUrl,isPublished}=req.body;
        const Admin=await Users.findById(req.user.userId);

        if(!name||!description||!price||!stock||!category||!imageUrl){
            return res.status(400).json({message:"Not provided all required field"});
        }


        if(!Admin){
            return res.status(404).json({message:"Not found admin with this id"});
        }

        if(Admin.role!="Admin"){
            return res.status(401).json({message:"Admins and sellers only can add product"});
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