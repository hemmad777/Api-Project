const express=require("express");
const wishlistRoute=express.Router();
const {addProduct,getAllWishlists,getProductById}=require("../controller/wishlist");
const {verifyToken}=require("../middleware/auth");

wishlistRoute.post("/:productId",verifyToken,addProduct);
wishlistRoute.get("/me",verifyToken,getAllWishlists);
wishlistRoute.delete("/:productId",verifyToken,getProductById);

module.exports=wishlistRoute;
