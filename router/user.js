const express = require("express");
const userRoute = express.Router();

const { register,login,userGetMe } = require("../controller/user");
const {verifyToken}=require("../middleware/auth")


userRoute.post("/register", register);
userRoute.post("/login",login);
userRoute.get("/me",verifyToken,userGetMe);





module.exports = userRoute;
