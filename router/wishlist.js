const express=require("express");
const wishlistRoute=express.Router();
const {addProduct}=require("../controller/wishlist")

wishlistRoute.post("/:productId",addProduct);

module.exports=wishlistRoute;
