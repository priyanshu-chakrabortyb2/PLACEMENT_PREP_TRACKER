const jwt=require("jsonwebtoken");
require("dotenv").config();
function authmiddleware(req,res,next){
    const authHeader=req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({message:"No  token provided"});
    }
    const token=authHeader.split(" ")[1];
    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        console.log("token received",token);
        console.log("JWT_SECRET",process.env.JWT_SECRET);
        
        
        next();
    } catch (error) {
        return res.status(401).json({message:"Invalid or expired token"});        
    }
}

module.exports=authmiddleware;