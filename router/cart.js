const express=require("express");
const cartRoute=express.Router();
const {postCart,getAllCart,deleteCart}=require("../controller/cart");

cartRoute.post("/add",postCart);
cartRoute.get("/all",getAllCart);
cartRoute.delete("/delete",deleteCart);

module.exports=cartRoute;