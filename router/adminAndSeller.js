import express from "express";
const adminAndSellerRouter=express.Router();
import {verifyToken} from "../middleware/auth";
import {roleChecking} from "../middleware/role";
import {createProduct,getAllProducts,updateProducById,deleteProductById,getAllOrders,patchProductById} from "../controller/adminAndSeller";

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


adminAndSellerRouter.patch(
    "/order/status/:orderId",
    verifyToken,
    roleChecking("admin","seller"),
    patchProductById
);

module.exports=adminAndSellerRouter;