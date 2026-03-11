const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register=async(req,res)=>{
   const {name,email,password}=req.body;

   const existUser=await User.findOne({email});

   if(existUser){
      return res.json({message:"User already exists"});
   }

   const hashedPassword=await bcrypt.hash(password,10);

   const user=new User({
      name,
      email,
      password:hashedPassword
   });

   await user.save();

   res.json({message:"User registered successfully"});
};

exports.login=async(req,res)=>{
   const {email,password}=req.body;

   const user=await User.findOne({email});

   if(!user){
      return res.json({message:"User not found"});
   }

   const isMatch=await bcrypt.compare(password,user.password);

   if(!isMatch){
      return res.json({message:"Invalid password"});
   }

   const token=jwt.sign(
      {userId:user._id},
      process.env.JWT_SECRET,
      {expiresIn:"1h"}
   );

   res.json({
      message:"Login successful",
      token
   });
};