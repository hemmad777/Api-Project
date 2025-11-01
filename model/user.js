const { match } = require("assert");
const mongoose=require("mongoose");
const { type } = require("os");

const userSchema=mongoose.model({
    id:{
        type:String,
        default:uuidv4,
        unique:true,
        required:true
    },
    name:{
        type:String,
        required:[true,"Please enter name"],
        
    },
    email:{
        type:String,
        required:[true,"please enter email"],
        match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"]
    },
    password:{
        type:String,
        required:[true,"Please enter password"],
        minLength:[8,"Enter atleast 8 characters"]
    },
    role:{
        type:String,
        required:[true,"Please provide your role"]
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
}
)

module.exports=mongoose.model("user",userSchema);