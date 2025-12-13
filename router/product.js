const express=require("express");
const productRoute=express.Router();

const {getAllProducts,getProductById,productSearch,featuredProducts}=require("../controller/product");
const {verifyToken}=require("../middleware/auth");

productRoute.get("/all",verifyToken,getAllProducts);
productRoute.get("/search",verifyToken,productSearch);
productRoute.get("/:id",verifyToken,getProductById);
productRoute.get("/featured",verifyToken,featuredProducts);


module.exports=productRoute;