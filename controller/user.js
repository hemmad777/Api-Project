const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const Users=require("../model/user");
const dotEnv=require("dotenv").config();



// Created userRegister section
exports.register = async (req,res)=>{
    try {
        const {name,email,password}=req.body;

    if(!name||!email||!password){
        return res.status(401).json({message:"All fields required"});
    }

    const existUser=await Users.findOne({email:email});

    if(existUser){
       return res.status(401).json({message:"This user allready exist"});
    }

    const bcryptPass=await bcrypt.hash(password,10);

    const user=new Users({
        name,
        email,
        password:bcryptPass,
        role:"Customer"
    })

    await user.save();
    res.status(201).json({message:"Registration succesfully",user:user});

    } catch (error) {
        return res.status(500).json({message:"Error happened when running :"+error})
    }
}

// Logic for user login

exports.login= async (req,res)=>{
    try {
        const {email,password}=req.body;

        const user=await Users.findOne({email:email});

        if(!user){
            return res.status(404).json({message:"Not found user with this email"})
        }

        const isMatch=await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res.status(400).json({message:"You entered incorrect password"});
        }

        console.log(user);
        

        const token=jwt.sign(
            {userId:user._id},
            process.env.JWT_SECRET,
            {expiresIn:process.env.JWT_EXP}
        )

        if(!token){
            return res.status(401).json({message:"Invalid candidates"});
        }

        res.status(201).json({message:"registration succesfully the user",user:user,token:token});
    } catch (error) {
        return res.status(500).json({message:"Error happened when run is: "+error.message});
    }
}

// Logic for Get current logined details

exports.userGetMe=async (req,res)=>{
    try {
        const {userId}=req.user;

        const user=await Users.findById(userId);

        if(!user){
            return res.status(404).json({message:"You are not logged"});
        }

        res.status(201).json({message:`Your details are :`,user:user});
    } catch (error) {
        return res.status(500).json({message:"Error happened whe run is :"+error.message})
    }
}


