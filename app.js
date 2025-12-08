const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const cors=require("cors")
dotenv.config();
const app=express();

app.use(cors());
app.use(express.json())

// Import all routers here
const userRouter = require("./router/user")
const productRouter=require("./router/product");
const cartRouter=require("./router/cart");
const wishlistRouter=require("./router/wishlist");
const adminRouter=require("./router/admin");
const orderRouter=require("./router/order");
const adminAndSellerRouter=require("./router/adminAndSeller");

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
