const express=require("express");
const wishlistRoute=express.Router();
const {addProduct,getAllWishlists}=require("../controller/wishlist")

wishlistRoute.post("/:productId",addProduct);
wishlistRoute.get("/all",getAllWishlists);

module.exports=wishlistRoute;
