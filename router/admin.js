const express=require("express");
const adminRoute=express.Router();
const {createAdmin,getAllUsers,userUpdateById,createCategory,getAllCategories}=require("../controller/admin");
const {verifyToken}=require("../middleware/auth");

const multer=require("multer");
const storage=require("../middleware/upload");
const uploadimage=multer({ storage });


adminRoute.post("/create/admin",verifyToken,createAdmin);
// adminRoute.post("/create/product",verifyToken,createProduct);
adminRoute.put("/user/edit/:id",verifyToken,userUpdateById);
adminRoute.post("/create/category",verifyToken,uploadimage.single("image"),createCategory);
adminRoute.get("/categories",verifyToken,getAllCategories);
adminRoute.get("/users",verifyToken,getAllUsers);



module.exports=adminRoute;