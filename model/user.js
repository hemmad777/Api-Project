
const mongoose=require("mongoose");


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter name"],
        
    },
    email:{
        type:String,
        unique:true,
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
    }
}
)

module.exports=mongoose.model("user",userSchema);