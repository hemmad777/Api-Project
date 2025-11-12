const express=require("express");
const adminRoute=express.Router();
const {createAdmin,getAllUsers}=require("../controller/admin");
const {verifyToken}=require("../middleware/auth");


adminRoute.post("/create",verifyToken,createAdmin);
adminRoute.get("/users",verifyToken,getAllUsers);


module.exports=adminRoute;