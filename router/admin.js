const express=require("express");
const adminRoute=express.Router();
const {createAdmin,getAllUsers,createProduct}=require("../controller/admin");
const {verifyToken}=require("../middleware/auth");


adminRoute.post("/create/admin",verifyToken,createAdmin);
adminRoute.get("/users",verifyToken,getAllUsers);



module.exports=adminRoute;