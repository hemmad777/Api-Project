const express=require("express");
const cartRoute=express.Router();
const {postCart}=require("../controller/cart");

cartRoute.post("/cart",postCart);

module.exports=cartRoute;