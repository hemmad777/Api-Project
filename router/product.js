
import express from "express";
const productRoute=express.Router();
import {getAllProducts,getProductById,productSearch} from "../controller/product";
import {verifyToken} from "../middleware/auth";

productRoute.get("/all",verifyToken,getAllProducts);
productRoute.get("/search",verifyToken,productSearch);
productRoute.get("/:id",verifyToken,getProductById);


module.exports=productRoute;