const express=require("express");
const adminAndSellerRouter=express.Router();
const {verifyToken}=require("../middleware/auth");
const {roleChecking}=require("../middleware/role");
const {createProduct}=require("../controller/adminAndSeller");

adminAndSellerRouter.post(
    "/create-product",
    verifyToken,
    roleChecking("Admin,Seller"),
    createProduct);

module.exports=adminAndSellerRouter;