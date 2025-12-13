const mongoose =require("mongoose");
const slugify=require("slugify");
const { applyTimestamps } = require("./user");

const productModel=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name not entered"]
    },slug:{
        type:String,
        unique:[true,"this all ready taked"]
    },description:{
        type:String,
        required:[true,"enter description"]
    },
    price:{
        type:String,
        required:[true,"Price not entered"]
    },stock:{
        type:Number,
        required:[true,"Enter stock details"],
        min:[0,"Enter possitive number"]
    },category:{
        type:String,
        required:[true,"choose category"]
    },image:{
        type:String,
        required:[true,"please provide image url"]
    },isPublished:{
        type:Boolean,
        default:false
    },
    isFeatured:{
        type:Boolean,
        default:false
    },
},{timestamps:true} 
)

module.exports=mongoose.model("product",productModel);