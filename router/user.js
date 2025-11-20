
import express from "express";
const userRoute=express.Router();
import { register,login,userGetMe } from "module";
import {verifyToken} from "../middleware/auth";


userRoute.post("/register", register);
userRoute.post("/login",login);
userRoute.get("/me",verifyToken,userGetMe);





module.exports = userRoute;
