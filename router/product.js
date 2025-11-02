const express=require("express");
const productRoute=express.Router();

const {getAllProducts,getProductById}=require("../controller/product");

productRoute.get("/all",getAllProducts);
productRoute.get("/:id",getProductById);

module.exports=productRoute;