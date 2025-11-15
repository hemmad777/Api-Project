const { strict } = require("assert");
const Users=require("../model/user");
const bcrypt=require("bcrypt");
const slugify=require("slugify");
const Products=require("../model/product")

// Logic for created Admin
exports.createAdmin=async (req,res)=>{
    try {
        const {name,email,password,role} =req.body;
        const userId=req.user.userId;

        const LogAdmin=await Users.findById(userId);

        if(LogAdmin.role!="Admin"){
            return res.status(404).json({message:"Only admins can create Admin"})
        }

        if (!name||!email||!password||!role){
            return res.status(401).json({message:"This fields are required"});
        }

        if(role!="Admin"){
            return res.status(401).json({message:"Role must be Admin"});
        }

        const Admin=await Users.findOne({email:email});

        if(Admin){
            return res.status(401).json({message:"this user already exist"});
        }

        const bcryptPass=await bcrypt.hash(password,10);

        const user=new Users({
            name,
            email,
            password:bcryptPass,
            role
        });

        await user.save();

        res.status(201).json({message:"Successfully created the Admin with this details ",Admin:user});
    } catch (error) {
        res.status(500).json({message:"Error happened when running "+error.message})
    }
}

// logic for get all users

exports.getAllUsers=async (req,res)=>{
    try {
        const users=await Users.find();

        if(!users){
            return res.status(400).json({message:"Products also empty"})
        }
        
        res.status(200).json({message:"Successfully take all user details",users:users});
    } catch (error) {
        res.status(500).json({error:error.message});
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

        

        const updateData={}

        if(name) updateData.name=name
        if(email) updateData.email=email
        if(password){
            const hashed=await bcrypt.hash(password,10)
            updateData.password=hashed
        }
        if(role) updateData.role=role
        if(createdAt) updateData.createdAt=createdAt
    
        const userUpdate=await Users.findByIdAndUpdate(id,updateData, {new:true});

        if(!userUpdate){
            return res.status(404).json({message:"Not found the user with this Id"});
        }


        res.status(200).json({message:"Successfully ubdated this user",user:userUpdate});
    
    } catch (error) {
        return res.status(500).json({message:"Error happened when run is "+error.message})
    }
}

