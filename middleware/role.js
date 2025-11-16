const User=require("../model/user")

exports.roleChecking=(...roles)=>{
    return async (req,res,next)=>{
        try {
            const user=await User.findById(req.user.userId);
            

            if(!user||user.role.includes(roles)){
            return res.status(403).json({message:"You not access for do this"});
            }
            next();
        } catch (error) {
            res.status(500).json({message:error.message});
        }   
    }
}