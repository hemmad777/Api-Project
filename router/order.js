const express=require("express");
const orderRouter=express.Router();
const {createOrder}=require("../controller/order");
const {verifyToken}=require("../middleware/auth");


orderRouter.post("/create",verifyToken,createOrder);

module.exports=orderRouter;
