const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const Users=require("../model/user");
const dotEnv=require("dotenv").config();



// Created userRegister section
exports.register = async (req,res)=>{
    try {
        const {name,email,password,role}=req.body;

    if(!name||!email||!password||!role){
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
        role
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
            res.status(400).json({message:"You entered incorrect password"});
        }

        const token=jwt.sign(
            {email},
            process.env.JWT_SECRET,
            {expiresIn:process.env.JWT_EXP}
        )

        if(!token){
            res.status(401).json({message:"Invalid candidates"});
        }

        res.status(201).json({message:"registration succesfully the user",user:token,user});
    } catch (error) {
        return res.status(500).json({message:"Error happened when run is: "+error.message});
    }
}

// Logic for Get user by Id

exports.userGetById=async (req,res)=>{
    try {
        const {id}=req.params;

        const user=await Users.findById(id);

        if(!user){
            return res.status(404).json({message:"can't find user with this Id"});
        }

        res.status(201).json({message:`User with this id ${id} is :`,user:user});
    } catch (error) {
        return res.status(500).json({message:"Error happened whe run is :"+error.message})
    }
}

// Logic for Update by Id

exports.userUpdateById=async (req,res)=>{
    try {
        const {id}=req.params;
        const {name,email,password,role,createdAt}=req.body;
        const user={
            name,
            email,
            password,
            role,
            createdAt
        }

        if(!name&&!email&&!password&&!role&&!createdAt){
            return res.status(401).json({message:"Enter atleaste one field for update"})
        }
    
        const userUpdate=await Users.findByIdAndUpdate(id,user);

        if(!userUpdate){
            return res.status(401).json({message:"Not found the user with this Id"});
        }

        const updatedUser=await Users.findById(id);

        res.status(201).json({message:"Successfully ubdated this user",user:updatedUser});
    
    } catch (error) {
        return res.status(500).json({message:"Error happened when run is "+error.message})
    }
}

// Logic for delete by Id

exports.userDeleteById=async (req,res)=>{
    try {
        const{id}=req.params;

    const deleteUser=await Users.findByIdAndDelete(id);

    if(!deleteUser){
        return res.status(404).json({message:"Not found the user with this Id"});
    }

    res.status(201).json({message:"Deleted this user",user:deleteUser});
    } catch (error) {
        return res.status(500).json({message:"Error happened when run"+error.message});
    }
}