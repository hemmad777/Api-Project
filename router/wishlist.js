const express=require("express");
const wishlistRoute=express.Router();
const {addProduct,getAllWishlists,getProductById}=require("../controller/wishlist");
const {verifyToken}=require("../middleware/auth");

wishlistRoute.post("/:productId",verifyToken,addProduct);
wishlistRoute.get("/all",verifyToken,getAllWishlists);
wishlistRoute.get("/:productId",verifyToken,getProductById);

module.exports=wishlistRoute;
