const express=require("express");
const productRoute=express.Router();

const {getAllProducts}=require("../controller/product");

productRoute.get("/products",getAllProducts);

module.exports=productRoute;