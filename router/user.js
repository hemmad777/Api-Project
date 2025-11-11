const express = require("express");
const userRoute = express.Router();

const { register,login,userDeleteById,userGetById,userUpdateById } = require("../controller/user");
const {verifyToken}=require("../middleware/auth")


userRoute.post("/register", register);
userRoute.post("/login",login);
userRoute.get("/:id",verifyToken,userGetById);



// Define other routes here

module.exports = userRoute;
