import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app=express();

app.use(express.json())

// Import all routers here

import userRouter from "./router/user";
import productRouter from "./router/product";
import cartRouter from "./router/cart";
import wishlistRouter from "./router/wishlist";
import adminRouter from "./router/admin";
import orderRouter from "./router/order";
import adminAndSellerRouter from "./router/adminAndSeller";


app.use("/auth", userRouter);
app.use("/products",productRouter);
app.use("/cart",cartRouter);
app.use("/wishlist",wishlistRouter);
app.use("/admin",adminRouter);
app.use("/order",orderRouter);
app.use("/main",adminAndSellerRouter);


mongoose.connect("mongodb://localhost:27017/Ecomerce")
.then(()=>{
    console.log("Mongodb connection successfully");
    
})
.catch((err)=>{
    console.log("Error is:"+err.message);
    
})

app.listen(3005,()=>{
    console.log("Server started for running at 3005 Port");
    
}
)
