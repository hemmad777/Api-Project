const express=require("express");
const adminAndSellerRouter=express.Router();
const {verifyToken}=require("../middleware/auth");
const {roleChecking}=require("../middleware/role");
const {createProduct,getAllProducts,updateProducById,deleteProductById,getAllOrders}=require("../controller/adminAndSeller");

adminAndSellerRouter.post(
    "/create-product",
    verifyToken,
    roleChecking("admin","seller"),
    createProduct
);

adminAndSellerRouter.get(
    "/products",
    verifyToken,
    roleChecking("admin","seller"),
    getAllProducts
);

adminAndSellerRouter.put(
    "/products/:productId",
    verifyToken,
    roleChecking("admin","seller"),
    updateProducById
);

adminAndSellerRouter.delete(
    "/products/delete/:productId",
    verifyToken,
    roleChecking("admin","seller"),
    deleteProductById
);

adminAndSellerRouter.get(
    "/orders",
    verifyToken,
    roleChecking("admin","seller"),
    getAllOrders
);

module.exports=adminAndSellerRouter;