const express=require("express");
const adminAndSellerRouter=express.Router();
const {verifyToken}=require("../middleware/auth");
const {roleChecking}=require("../middleware/role");
const {createProduct,getAllProducts,updateProducById,deleteProductById,getAllOrders,patchProductById,dashboardMetrics,monthlyDashboard}=require("../controller/adminAndSeller");

const multer=require("multer")
const storage=require("../middleware/upload")
const uploadimage= (folder)=> multer({storage:storage(folder)})

adminAndSellerRouter.post(
    "/create-product",
    verifyToken,
    roleChecking("admin","seller"),
    uploadimage("images/products").single("image"),
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

adminAndSellerRouter.get(
    "/metrics",
    verifyToken,
    roleChecking("admin","seller"),
    dashboardMetrics
);

adminAndSellerRouter.get(
    "/monthly/sales",
    verifyToken,
    roleChecking("admin","seller"),
    monthlyDashboard
);

module.exports=adminAndSellerRouter;