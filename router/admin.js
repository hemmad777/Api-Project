
import express from "express";
const adminRoute=express.Router();
import {createAdmin,getAllUsers,createProduct} from "../controller/admin";
import {verifyToken} from "../middleware/auth";


adminRoute.post("/create/admin",verifyToken,createAdmin);
adminRoute.get("/users",verifyToken,getAllUsers);
adminRoute.post("/create/product",verifyToken,createProduct);



module.exports=adminRoute;