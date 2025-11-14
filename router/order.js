const express=require("express");
const orderRouter=express.Router();
const {createOrder,getAllOrder}=require("../controller/order");
const {verifyToken}=require("../middleware/auth");


orderRouter.post("/create",verifyToken,createOrder);
orderRouter.get("/my-orders",verifyToken,getAllOrder);

module.exports=orderRouter;
