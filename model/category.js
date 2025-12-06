const mongoose=require("mongoose");
const { type } = require("os");
const { categoryCreation } = require("../controller/admin");

const categorySchema=new mongoose.Schema({
    name:{type:String,required:true},

},{timestamps:true})

module.exports=mongoose.model("Category",categoryCreation);