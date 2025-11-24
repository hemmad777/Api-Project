const express=require("express");
const cartRoute=express.Router();
const {postCart,getAllCart,deleteCart,deleteOne}=require("../controller/cart");
const {verifyToken}=require("../middleware/auth")

cartRoute.post("/add",verifyToken,postCart);
cartRoute.get("/all",verifyToken,getAllCart);
cartRoute.delete("/delete",verifyToken,deleteCart);
cartRoute.delete("/:productId",verifyToken,deleteOne);

module.exports=cartRoute;