const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
dotenv.config();
const app=express();

app.use(express.json())

// Import all routers here
const userRouter = require("./router/user")
const productRouter=require("./router/product");
const cartRouter=require("./router/cart");

app.use("/auth", userRouter);
app.use("/products",productRouter);
app.use("/cart",cartRouter);



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
