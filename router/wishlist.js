const express=require("express");
const wishlistRoute=express.Router();
const {addProduct,getAllWishlists,getProductById}=require("../controller/wishlist")

wishlistRoute.post("/:productId",addProduct);
wishlistRoute.get("/all",getAllWishlists);
wishlistRoute.get("/:productId",getProductById);

module.exports=wishlistRoute;
