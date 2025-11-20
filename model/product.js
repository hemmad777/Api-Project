import mongoose from "mongoose";

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
    },imageUrl:{
        type:String,
        required:[true,"please provide image url"]
    },isPublished:{
        type:Boolean,
        default:false
    },
},{timestamps:true} 
)

module.exports=mongoose.model("product",productModel);