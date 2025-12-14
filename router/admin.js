const express=require("express");
const adminRoute=express.Router();
const {createAdmin,getAllUsers,userUpdateById,createCategory,getAllCategories}=require("../controller/admin");
const {verifyToken}=require("../middleware/auth");

const multer=require("multer");
const storage=require("../middleware/upload");
const { roleChecking } = require("../middleware/role");
const uploadimage=(folder)=> multer({storage:storage(folder)})


adminRoute.post(
    "/create/admin",
    verifyToken,
    roleChecking("admin"),
    createAdmin
);
// adminRoute.post("/create/product",verifyToken,createProduct);
adminRoute.put(
    "/user/edit/:id",
    verifyToken,
    roleChecking("admin"),
    userUpdateById
);
adminRoute.post(
    "/create/category",
    // verifyToken,
    // roleChecking("admin"),
    uploadimage("images/categories").single("image"),
    createCategory
);
adminRoute.get(
    "/categories",
    // verifyToken,
    // roleChecking("admin"),
    getAllCategories
);
adminRoute.get(
    "/users",
    verifyToken,
    roleChecking("admin"),
    getAllUsers
);



module.exports=adminRoute;