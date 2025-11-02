const express=require("express");
const productRoute=express.Router();

const {getAllProducts,getProductById,productSearch}=require("../controller/product");

productRoute.get("/all",getAllProducts);
productRoute.get("/search",productSearch);
productRoute.get("/:id",getProductById);


module.exports=productRoute;