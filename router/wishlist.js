
import express from "express";
const wishlistRoute=express.Router();
import {addProduct,getAllWishlists,getProductById} from "../controller/wishlist";
import {verifyToken} from "../middleware/auth";

wishlistRoute.post("/:productId",verifyToken,addProduct);
wishlistRoute.get("/me",verifyToken,getAllWishlists);
wishlistRoute.delete("/:productId",verifyToken,getProductById);

module.exports=wishlistRoute;
