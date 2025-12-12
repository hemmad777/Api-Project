const express=require("express");
const adminRoute=express.Router();
const {createAdmin,getAllUsers,userUpdateById,createCategory,getAllCategories}=require("../controller/admin");
const {verifyToken}=require("../middleware/auth");

const multer=require("multer");
const storage=require("../middleware/upload");
const uploadimage=(folder)=> multer({storage:storage(folder)})


adminRoute.post("/create/admin",verifyToken,createAdmin);
// adminRoute.post("/create/product",verifyToken,createProduct);
adminRoute.put("/user/edit/:id",verifyToken,userUpdateById);
adminRoute.post("/create/category",verifyToken,uploadimage("images/categories").single("image"),createCategory);
adminRoute.get("/categories",getAllCategories);
adminRoute.get("/users",verifyToken,getAllUsers);



module.exports=adminRoute;