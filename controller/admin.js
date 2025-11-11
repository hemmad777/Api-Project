const Users=require("../model/user");
const bcrypt=require("bcrypt")

// Logic for created Admin
exports.createAdmin=async (req,res)=>{
    try {
        const {name,email,password,role} =req.body;

        if (!name||!email||!password||!role){
            res.status(401).json({message:"This fields are required"});
        }

        if(role!="Admin"){
            res.status(401).json({message:"Role must be Admin"});
        }

        const Admin=await Users.findOne({email:email});

        if(Admin){
            res.status(401).json({message:"this user already exist"});
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



