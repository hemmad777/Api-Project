const { match } = require("assert");
const mongoose=require("mongoose");
const { type } = require("os");

mongoose.model({
    id:{
        type:UUID,
        unique:true
    },
    name:{
        type:String
    },
    email:{
        type:String,
    },
    password:{
        type:String
    },
    role:{
        type:String
    },
    craetedAt:{
        type:Date
    }
})

