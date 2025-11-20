
import express from "express";
const cartRoute=express.Router();
import {poatCart,getAllCart,deleteCart,deleteOne} from "../controller/cart";
import {verifyToken} from '../middleware/auth';


cartRoute.post("/add",verifyToken,postCart);
cartRoute.get("/all",verifyToken,getAllCart);
cartRoute.delete("/delete",verifyToken,deleteCart);
cartRoute.delete("/:productId",verifyToken,deleteOne);

module.exports=cartRoute;