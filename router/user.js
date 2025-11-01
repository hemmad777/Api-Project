const express = require("express");
const userRoute = express.Router();

const { register,login,userDeleteById,userGetById,userUpdateById } = require("../controller/user");


userRoute.post("/register", register);
userRoute.post("/login",login);
userRoute.get("/:id",userGetById);
userRoute.put("/:id",userUpdateById);
userRoute.delete("/:id",userDeleteById);


// Define other routes here

module.exports = userRoute;
