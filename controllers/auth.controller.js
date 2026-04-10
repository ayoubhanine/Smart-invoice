import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const generateToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn:"7d",
    });
}


export const registerUser=async(req,res)=>{
    try{
        const{name,email,password,role}=req.body

        const userExists=await User.findOne({email});
        if(userExists){
            return res.status(400).json({message:"user already exists"})
        }
        //hashPassword
        const salts=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salts);

        //create user
        const user=await User.create({
            name,
            email,
            password:hashedPassword,
            role,
        })
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            token:generateToken(user._id),
        })
        
    }catch(err){
            res.status(500).json({message:err.message})
        }
};

export const loginUser=async(req,res)=>{
    try{
        const{email,password}=req.body;

        
        const user=await User.findOne({email});
        if(!user){
           return  res.status(400).json({message:"invalid email"})
        }
         
         const isMatch=await bcrypt.compare(password,user.password);
         if(!isMatch){
            return res.status(400).json({message:"invalid password"})
         }
         res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
            token:generateToken(user._id),
         })
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}