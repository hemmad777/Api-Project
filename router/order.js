
import express from "express";
const orderRouter = express.Router();
import {createOrder,getAllOrder,getOrderById} from "../controller/order";
import {verifyToken} from "../middleware/auth";

orderRouter.post("/create",verifyToken,createOrder);
orderRouter.get("/my-orders",verifyToken,getAllOrder);
orderRouter.get("/:orderId",verifyToken,getOrderById);

module.exports=orderRouter;
