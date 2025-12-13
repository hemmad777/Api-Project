const express=require("express");
const productRoute=express.Router();

const {getAllProducts,getProductById,productSearch,featuredProducts}=require("../controller/product");
const {verifyToken}=require("../middleware/auth");

productRoute.get("/featured",verifyToken,featuredProducts);
productRoute.get("/all",verifyToken,getAllProducts);
productRoute.get("/search",verifyToken,productSearch);
productRoute.get("/:id",verifyToken,getProductById);


module.exports=productRoute;