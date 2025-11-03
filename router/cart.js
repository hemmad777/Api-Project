const express=require("express");
const cartRoute=express.Router();
const {postCart,getAllCart,deleteCart,deleteOne}=require("../controller/cart");

cartRoute.post("/add",postCart);
cartRoute.get("/all",getAllCart);
cartRoute.delete("/delete",deleteCart);
cartRoute.delete("/:productId",deleteOne);

module.exports=cartRoute;