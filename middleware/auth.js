const jwt =require("jsonwebtoken");


exports.verifyToken=(req,res,next)=>{
    try {
        const authHeader=req.headers["authorization"]||req.get("Authorization");

        if(!authHeader) return res.status(401).json({message:"Token not provided"});

        const tokenParts=authHeader.split(" ");

        const token=tokenParts.length==2&&tokenParts[0].toLowerCase()=="bearer"
        ?tokenParts[1]
        :authHeader.trim()

        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    } catch (error) {
        res.status(500).json({message:"Server error in token verify",error:error.message});
    }
}