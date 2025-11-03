const express=require("express");
const cartRoute=express.Router();
const {postCart,getAllCart}=require("../controller/cart");

cartRoute.post("/cart",postCart);
cartRoute.get("/cart",getAllCart);

module.exports=cartRoute;